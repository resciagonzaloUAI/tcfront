import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './components/reportes.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ReportesComponent],
  providers: [DatePipe],
  imports: [CommonModule, ReportesRoutingModule, MatTabsModule],
})
export class ReportesModule {}
