import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './components/reportes.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ReportesComponent],
  imports: [CommonModule, ReportesRoutingModule, MatTabsModule],
})
export class ReportesModule {}
