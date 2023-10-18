export default interface Loan {
  id: number;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  reason: string;
  status: string;
  cash_release_date?: string;
  repayment_date?: string;
  approval_date?: string;
  rejection_date?: string;
  token: string;
}