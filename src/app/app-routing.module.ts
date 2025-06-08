import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeadsComponent } from './components/leads/leads.component';
// import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { BaseComponent } from './components/dashboard/base/base.component';
import { StylishMainComponent } from './components/stylish-main/stylish-main.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AddStylishComponent } from './components/stylish-main/add-stylish/add-stylish.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EditRecordComponent } from './components/reports/edit-record/edit-record.component';
import { PrintReportComponent } from './components/reports/print-report/print-report.component';
import { AuthGuardProvider } from './auth.guard';
import { EditStylishComponent } from './components/stylish-main/edit-stylish/edit-stylish.component';




const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",            
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: BaseComponent,
    canActivate:[AuthGuardProvider],
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "leads",
        component: LeadsComponent,
      },
      {
        path: "stylish",
        component: StylishMainComponent,
      },
      { path: 'stylish/add-stylish', component: AddStylishComponent },
      { path: 'stylish/edit-stylish', component: EditStylishComponent },
      {
        path: "appointment-form",
        component:AppointmentFormComponent,
      },
      {
        path: "reports",
        component:ReportsComponent,
      },
      {
        path: 'reports/edit/:id',
        component: EditRecordComponent
      },
     {
        path: 'reports/print-reports/:id',
        component: PrintReportComponent,
      }

      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
