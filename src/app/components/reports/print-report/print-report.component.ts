import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../../../services/adminservice.service';

@Component({
  selector: 'app-print-report',
  standalone: false,
  templateUrl: './print-report.component.html',
  styleUrl: './print-report.component.scss'
})
export class PrintReportComponent {



  printPage() {
    window.print();
  }




  close() {
    // Add close logic like navigating back or hiding modal
  }
}
