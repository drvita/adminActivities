import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User, CreateUser, UpdateUser } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UserService) {}

  @Get()
  index(): User[] {
    return this.users.getAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: User['id']): User {
    return this.users.get(id);
  }

  @Post()
  store(@Body() payload: CreateUser): User {
    return this.users.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body() payload: UpdateUser,
  ): User {
    return this.users.update(id, payload);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: User['id']): User {
    return this.users.delete(id);
  }
}
