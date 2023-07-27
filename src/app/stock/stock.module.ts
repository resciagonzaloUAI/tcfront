import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [],
  providers: [StockService],
  imports: [CommonModule, StockRoutingModule, SharedModule],
})
export class StockModule {}
