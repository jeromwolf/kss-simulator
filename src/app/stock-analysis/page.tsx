import { StockAnalysisHub } from '@/components/stock-analysis/StockAnalysisHub';
import styles from './stock-analysis.module.css';

export default function StockAnalysisPage() {
  return (
    <div className={styles['stock-analysis-content']}>
      <StockAnalysisHub />
    </div>
  );
}