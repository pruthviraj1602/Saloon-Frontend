import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {AdminserviceService} from '../../services/adminservice.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements AfterViewInit,OnInit {

  constructor(
    private adminService: AdminserviceService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAppointment()
    this.getAllStylist()
  }

  public getAllStylist(){
    this.adminService.getAllStylists().subscribe({
      next: (data)=>{
        console.log(data)
        this.stylists = data.map((s: any) => s.stylistName);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  appointments: any[] =[];

  getAppointment(): void {
    this.adminService.getAppointments().subscribe({
      next: (data) => {
        // console.log(data)
        this.appointments = data;
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }


  displayedColumns: string[] = ['id', 'customer', 'contact', 'date', 'stylist', 'service', 'time', 'Payment', 'PaymentType', 'actions'];

  stylists: string[] = [];
  selectedStylist: string = '';
  fromDate!: Date;
  toDate!: Date;



  dataSource = new MatTableDataSource(this.appointments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get filteredData() {
    return this.appointments.filter(row => {
      const stylistName = row.stylist?.stylistName ?? '';

      const matchStylist = this.selectedStylist
        ? stylistName.toLowerCase() === this.selectedStylist.toLowerCase()
        : true;

      const appointmentDate = new Date(row.date);
      const matchDateRange =
        this.fromDate && this.toDate
          ? appointmentDate >= this.fromDate && appointmentDate <= this.toDate
          : true;

      return matchStylist && matchDateRange;
    });
  }



  // Add this to apply filter manually when input changes
  applyFilters() {
    const filtered = this.filteredData;
    this.dataSource.data = filtered;
  }

 editRecord(id: number) {
  console.log('Editing report with ID:', id);
  this.router.navigate([`/dashboard/reports/edit/${id}`]);
}

printRecord(id: number) {
  this.router.navigate([`/dashboard/reports/print-reports/${id}`]);
}

  delete(id:number){
    console.log(id)
  this.adminService.deleteAppointment(id).subscribe({
    next: (data)=>{
      console.log(data)
      if(data){
        alert("appointment Deleted Successfully...!")
      }

    },error:(err)=>{
      console.log("appointment not deleted...",err)
    }
  })
  }


}
