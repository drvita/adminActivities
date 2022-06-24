import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { InvoicesController } from './controllers/invoices.controller';
import { InvoiceService } from './services/invoice.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, InvoicesController],
  providers: [AppService, UserService, InvoiceService],
})
export class AppModule {}
