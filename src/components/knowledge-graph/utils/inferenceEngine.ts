import { Triple } from '../types';

// Basic inference rules
interface InferenceRule {
  id: string;
  name: string;
  description: string;
  apply: (triples: Triple[]) => Triple[];
}

const inferenceRules: InferenceRule[] = [
  {
    id: 'rdfs_subclass_transitivity',
    name: 'Subclass Transitivity',
    description: 'If A subClassOf B and B subClassOf C, then A subClassOf C',
    apply: (triples: Triple[]): Triple[] => {
      const inferred: Triple[] = [];
      const subClassRelations = triples.filter(t => t.predicate === 'subClassOf' || t.predicate === ':subClassOf');
      
      // Find transitive subclass relationships
      for (const t1 of subClassRelations) {
        for (const t2 of subClassRelations) {
          if (t1.object === t2.subject && t1.subject !== t2.object) {
            const inferredTriple: Triple = {
              subject: t1.subject,
              predicate: t1.predicate,
              object: t2.object,
              isInferred: true
            };
            
            // Check if this triple already exists
            const exists = triples.some(t => 
              t.subject === inferredTriple.subject && 
              t.predicate === inferredTriple.predicate && 
              t.object === inferredTriple.object
            ) || inferred.some(t => 
              t.subject === inferredTriple.subject && 
              t.predicate === inferredTriple.predicate && 
              t.object === inferredTriple.object
            );
            
            if (!exists) {
              inferred.push(inferredTriple);
            }
          }
        }
      }
      
      return inferred;
    }
  },
  
  {
    id: 'rdfs_type_inheritance',
    name: 'Type Inheritance',
    description: 'If A type B and B subClassOf C, then A type C',
    apply: (triples: Triple[]): Triple[] => {
      const inferred: Triple[] = [];
      const typeRelations = triples.filter(t => t.predicate === 'type' || t.predicate === ':type');
      const subClassRelations = triples.filter(t => t.predicate === 'subClassOf' || t.predicate === ':subClassOf');
      
      for (const typeRel of typeRelations) {
        for (const subClassRel of subClassRelations) {
          if (typeRel.object === subClassRel.subject) {
            const inferredTriple: Triple = {
              subject: typeRel.subject,
              predicate: typeRel.predicate,
              object: subClassRel.object,
              isInferred: true
            };
            
            const exists = triples.some(t => 
              t.subject === inferredTriple.subject && 
              t.predicate === inferredTriple.predicate && 
              t.object === inferredTriple.object
            ) || inferred.some(t => 
              t.subject === inferredTriple.subject && 
              t.predicate === inferredTriple.predicate && 
              t.object === inferredTriple.object
            );
            
            if (!exists) {
              inferred.push(inferredTriple);
            }
          }
        }
      }
      
      return inferred;
    }
  },
  
  {
    id: 'symmetric_property',
    name: 'Symmetric Property',
    description: 'If A relatedTo B and relatedTo is symmetric, then B relatedTo A',
    apply: (triples: Triple[]): Triple[] => {
      const inferred: Triple[] = [];
      const symmetricPredicates = ['relatedTo', ':relatedTo', 'sameAs', ':sameAs', 'connectedTo', ':connectedTo'];
      
      const symmetricTriples = triples.filter(t => 
        symmetricPredicates.includes(t.predicate) && t.subject !== t.object
      );
      
      for (const triple of symmetricTriples) {
        const inverseTriple: Triple = {
          subject: triple.object,
          predicate: triple.predicate,
          object: triple.subject,
          isInferred: true
        };
        
        const exists = triples.some(t => 
          t.subject === inverseTriple.subject && 
          t.predicate === inverseTriple.predicate && 
          t.object === inverseTriple.object
        ) || inferred.some(t => 
          t.subject === inverseTriple.subject && 
          t.predicate === inverseTriple.predicate && 
          t.object === inverseTriple.object
        );
        
        if (!exists) {
          inferred.push(inverseTriple);
        }
      }
      
      return inferred;
    }
  },
  
  {
    id: 'transitive_property',
    name: 'Transitive Property',
    description: 'If A partOf B and B partOf C, then A partOf C',
    apply: (triples: Triple[]): Triple[] => {
      const inferred: Triple[] = [];
      const transitivePredicates = ['partOf', ':partOf', 'hasComponent', ':hasComponent', 'locatedIn', ':locatedIn'];
      
      for (const predicate of transitivePredicates) {
        const relevantTriples = triples.filter(t => t.predicate === predicate);
        
        for (const t1 of relevantTriples) {
          for (const t2 of relevantTriples) {
            if (t1.object === t2.subject && t1.subject !== t2.object) {
              const inferredTriple: Triple = {
                subject: t1.subject,
                predicate: predicate,
                object: t2.object,
                isInferred: true
              };
              
              const exists = triples.some(t => 
                t.subject === inferredTriple.subject && 
                t.predicate === inferredTriple.predicate && 
                t.object === inferredTriple.object
              ) || inferred.some(t => 
                t.subject === inferredTriple.subject && 
                t.predicate === inferredTriple.predicate && 
                t.object === inferredTriple.object
              );
              
              if (!exists) {
                inferred.push(inferredTriple);
              }
            }
          }
        }
      }
      
      return inferred;
    }
  }
];

export function performInference(triples: Triple[]): Triple[] {
  let allInferred: Triple[] = [];
  
  // Apply all inference rules
  for (const rule of inferenceRules) {
    try {
      const ruleInferred = rule.apply(triples);
      allInferred = allInferred.concat(ruleInferred);
    } catch (error) {
      console.warn(`Inference rule ${rule.id} failed:`, error);
    }
  }
  
  // Remove duplicates
  const uniqueInferred = allInferred.filter((triple, index) => {
    return allInferred.findIndex(t => 
      t.subject === triple.subject && 
      t.predicate === triple.predicate && 
      t.object === triple.object
    ) === index;
  });
  
  return uniqueInferred;
}

export function getInferenceRules(): InferenceRule[] {
  return inferenceRules;
}