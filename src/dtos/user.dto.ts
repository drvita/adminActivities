export type Role = 'admin' | 'user' | 'supplier' | 'customer';

export interface User {
  id: number | string;
  name: string;
  role: Role;
  username: string;
  password: string;
}

export type CreateUser = Omit<User, 'id'>;
export type UpdateUser = Partial<CreateUser>;
