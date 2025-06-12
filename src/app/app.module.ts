import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeadsComponent } from './components/leads/leads.component';
import { HeaderComponent } from './constant/header/header.component';
import { SidebarComponent } from './constant/sidebar/sidebar.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/components/login/login.component';
import { BaseComponent } from './components/dashboard/base/base.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { StylishMainComponent } from './components/stylish-main/stylish-main.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { MatIconModule } from '@angular/material/icon';
import { AddStylishComponent } from './components/stylish-main/add-stylish/add-stylish.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { EditRecordComponent } from './components/reports/edit-record/edit-record.component';
import { PrintReportComponent } from './components/reports/print-report/print-report.component';
import { EditStylishComponent } from './components/stylish-main/edit-stylish/edit-stylish.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeadsComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardChartComponent,
    HomeComponent,
    LoginComponent,
    BaseComponent,
    StylishMainComponent,
    AppointmentFormComponent,
    AddStylishComponent,
    ReportsComponent,
    EditRecordComponent,
    PrintReportComponent,
    EditStylishComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgChartsModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
