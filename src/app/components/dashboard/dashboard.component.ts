import {Component, OnInit} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import {AdminserviceService} from '../../services/adminservice.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  totalStylists: number = 0;
  totalAppointments: number = 0;
  totalCustomer: number = 0;

  constructor(private service:AdminserviceService) {
  }

  ngOnInit() {
   this.countOfStylist()
    this.countOfAppointment()
    this.countOfCustomer()
  }

  countOfStylist(){
    this.service.countStylist().subscribe({
      next: (data)=>{this.totalStylists=data },error:(err)=>{console.log(err)}})
  }

  countOfAppointment(){
    this.service.countAppointment().subscribe({
      next: (data)=>{this.totalAppointments=data},error:(err)=>{console.log(err) } })
  }

  countOfCustomer(){
    this.service.countCustomer().subscribe({
      next: (data)=>{
        this.totalCustomer=data
      },error:(err)=>{
        console.log(err)
      }
    })
  }



  // Line Chart (Financial Goal) - Warm Sunset Theme
  financialChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [200, 400, 350, 300, 450, 600],
      label: 'Earnings',
      fill: true,
      tension: 0.5,
      backgroundColor: 'rgba(255, 140, 0, 0.3)', // Warm orange transparent fill
      borderColor: 'rgba(220, 20, 60, 1)',       // Crimson red border
      pointBackgroundColor: 'rgba(255, 69, 0, 1)', // OrangeRed dots
      pointBorderColor: '#fff',
    }]
  };
  financialChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };

  // Pie Chart (Customer Ratio) - Soft Pastels Theme
  customerChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Female', 'Male', 'Others'],
    datasets: [{
      data: [40, 45, 15],
      backgroundColor: ['#f9c5d1', '#f6e2b3', '#b3e5fc'],  // Pink, soft yellow, light blue
      hoverBackgroundColor: ['#f7a9b8', '#f4d87c', '#81d4fa'], // Darker pastels on hover
    }]
  };
  customerChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };


}
