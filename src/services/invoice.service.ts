import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice, CreateInvoice, UpdateInvoice } from '../dtos/invoice.dto';
import { UserService } from './user.service';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [
    {
      id_sat: 'INV/2020-sdgdfhfh2fg556445656',
      type: 'income',
      amount: 25000,
      taxes: 1250,
      id: 1,
      total: 26250,
      user: {
        name: 'Salvador Gonzalez',
        role: 'admin',
        username: 'drvita',
        password: 'Password.01',
        id: 1,
      },
      created_at: 'Fri Jun 24 2022 14:14:20 GMT-0500 (Central Daylight Time)',
      updated_at: 'Fri Jun 24 2022 14:14:20 GMT-0500 (Central Daylight Time)',
    },
    {
      id_sat: 'INV/2020-6f654gdf641h6gfh',
      type: 'income',
      amount: 12500,
      taxes: 420,
      id: 2,
      total: 12920,
      user: {
        name: 'Diana Veronica',
        role: 'admin',
        username: 'veritoo',
        password: 'Password.01',
        id: 2,
      },
      created_at: 'Fri Jun 24 2022 14:15:02 GMT-0500 (Central Daylight Time)',
      updated_at: 'Fri Jun 24 2022 14:15:02 GMT-0500 (Central Daylight Time)',
    },
    {
      id_sat: 'INV/2020-552g5gj22j5uy5f5fd5',
      type: 'expenses',
      amount: 4500,
      taxes: 189,
      id: 3,
      total: 4689,
      user: {
        name: 'Uriel Martinez',
        role: 'user',
        username: 'Uri',
        password: 'Password.01',
        id: 3,
      },
      created_at: 'Fri Jun 24 2022 14:15:30 GMT-0500 (Central Daylight Time)',
      updated_at: 'Fri Jun 24 2022 14:15:30 GMT-0500 (Central Daylight Time)',
    },
  ];
  private count = 0;

  constructor(private readonly users: UserService) {}

  getAll(): Invoice[] {
    return this.invoices;
  }

  get(id: Invoice['id']): Invoice | never {
    const index = this.invoices.findIndex((invoice) => invoice.id === id);

    if (index < 0) {
      throw new NotFoundException('Id user not is correct or not');
    }

    return this.invoices[index];
  }

  create(data: CreateInvoice): Invoice {
    this.count++;
    const total = data.amount + data.taxes;
    const user = this.users.get(data.user_id);

    console.log('[DEBUG] User in invoices:', user);
    const newInvoice: Invoice = {
      ...data,
      id: this.count,
      total,
      user: user,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    };

    this.invoices.push(newInvoice);

    return newInvoice;
  }

  update(id: Invoice['id'], data: UpdateInvoice): Invoice {
    const invoice = this.get(id);
    const index = this.invoices.findIndex((invoice) => invoice.id === id);
    const user_id = data.user_id;
    delete data.user_id;

    const updated: Invoice = {
      ...invoice,
      ...data,
    };

    if (user_id) {
      updated.user = this.users.get(user_id);
    }

    this.invoices[index] = updated;

    return updated;
  }

  delete(id: Invoice['id']): Invoice {
    const user = this.get(id);

    this.invoices = this.invoices.filter((invoice) => invoice.id !== id);

    return user;
  }
}
