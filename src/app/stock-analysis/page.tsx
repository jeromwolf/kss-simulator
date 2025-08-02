import { redirect } from 'next/navigation';

export default function StockAnalysisPage() {
  // Redirect to the new module page
  redirect('/modules/stock-analysis');
}