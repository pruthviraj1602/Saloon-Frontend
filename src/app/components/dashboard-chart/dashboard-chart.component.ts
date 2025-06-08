import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-chart',
  standalone: false,
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.scss'
})
export class DashboardChartComponent implements AfterViewInit {
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;

  ngAfterViewInit() {
    this.barChart();
    this.doughnutChart();
  }

  barChart(){
    new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Bar Chart Example'
          }
        },
      }
    });
  }

  doughnutChart() {
    new Chart(this.pieCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],  
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true 
        }
      },
    }) 
  }

}
