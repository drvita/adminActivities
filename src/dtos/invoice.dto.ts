import { User } from './user.dto';

export type InvoiceType = 'income' | 'expenses';

export interface Invoice {
  id: number | string;
  id_sat: string;
  type: InvoiceType;
  amount: number;
  taxes: number;
  total: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CreateInvoice
  extends Omit<
    Invoice,
    'id' | 'total' | 'created_at' | 'updated_at' | 'deleted_at' | 'user'
  > {
  user_id: User['id'];
}
export type UpdateInvoice = Partial<CreateInvoice>;
