import { Injectable, NotFoundException } from '@nestjs/common';
import { User, CreateUser, UpdateUser } from '../dtos/user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      name: 'Salvador Gonzalez',
      role: 'admin',
      username: 'drvita',
      password: 'Password.01',
      id: 1,
    },
    {
      name: 'Diana Veronica',
      role: 'admin',
      username: 'veritoo',
      password: 'Password.01',
      id: 2,
    },
    {
      name: 'Uriel Martinez',
      role: 'user',
      username: 'Uri',
      password: 'Password.01',
      id: 3,
    },
    {
      name: 'Lacho Martinez',
      role: 'user',
      username: 'Lacho',
      password: 'Password.01',
      id: 4,
    },
    {
      name: 'Arturo Vuelvas',
      role: 'user',
      username: 'Diablo',
      password: 'Password.01',
      id: 5,
    },
  ];
  private count = 0;

  getAll(): User[] {
    return this.users;
  }

  get(id: User['id']): User | never {
    const index = this.users.findIndex((user) => user.id === id);

    if (index < 0) {
      throw new NotFoundException('Id user not is correct or not');
    }

    return this.users[index];
  }

  create(data: CreateUser): User {
    this.count++;

    const newUser: User = {
      ...data,
      id: this.count,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: User['id'], data: UpdateUser): User {
    const user = this.get(id);
    const index = this.users.findIndex((user) => user.id === id);

    const userUpdate: User = {
      ...user,
      ...data,
    };

    this.users[index] = userUpdate;

    return userUpdate;
  }

  delete(id: User['id']): User {
    const user = this.get(id);

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
