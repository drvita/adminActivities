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
import { InvoiceService } from 'src/services/invoice.service';
import { Invoice, CreateInvoice, UpdateInvoice } from '../dtos/invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoices: InvoiceService) {}

  @Get()
  index(): Invoice[] {
    return this.invoices.getAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: Invoice['id']): Invoice {
    return this.invoices.get(id);
  }

  @Post()
  store(@Body() payload: CreateInvoice): Invoice {
    return this.invoices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: Invoice['id'],
    @Body() payload: UpdateInvoice,
  ): Invoice {
    return this.invoices.update(id, payload);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: Invoice['id']): Invoice {
    return this.invoices.delete(id);
  }
}
