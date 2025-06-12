import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminserviceService } from '../../services/adminservice.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface StylishData {
  id: number;
  stylishName1: string;
  email: string;
  phoneNo: string;
  reference: string;
  location: string;
  active: boolean;
}

@Component({
  selector: 'app-stylish-main',
  standalone: false,
  templateUrl: './stylish-main.component.html',
  styleUrls: ['./stylish-main.component.scss']
})
export class StylishMainComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'stylishName1',
    'email',
    'phoneNo',
    'reference',
    'location',
    'expert',
    'actions'
  ];
  dataSource = new MatTableDataSource<StylishData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  http: any;

  constructor(
    private adminService: AdminserviceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: StylishData, filter: string) => {
      const lowercaseFilter = filter.trim().toLowerCase();
      return (
        data.stylishName1.toLowerCase().includes(lowercaseFilter) ||
        data.phoneNo.toLowerCase().includes(lowercaseFilter) ||
        data.email.toLowerCase().includes(lowercaseFilter) ||
        data.location.toLowerCase().includes(lowercaseFilter) ||
        data.reference.toLowerCase().includes(lowercaseFilter)
      );
    };
    this.fetchStylists();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchStylists(): void {
    this.adminService.getAllStylists().subscribe({
      next: (data) => {
        console.log(data)
        const formatted: StylishData[] = data.map((item: any) => ({
          id: item.stylistId,
          stylishName1: item.stylistName,
          email: item.email ?? 'N/A',
          phoneNo: item.contact ?? 'N/A',
          reference: item.reference ?? 'N/A',
          location: item.location ?? 'N/A',
          expert_in:item.expert_in?? 'N/A',
          active: item.active ?? false // Gets status from backend
        }));
        this.dataSource.data = formatted;
      },
      error: (err) => {
        console.error('Error fetching stylists:', err);

      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  toggleActive(row: StylishData): void {
    const updatedStatus = !row.active;

    this.adminService.updateStylistStatus(row.id, updatedStatus).subscribe({
      next: () => {
        row.active = updatedStatus;
        this.snackBar.open(`Stylish "${row.stylishName1}" is now ${updatedStatus ? 'Active' : 'Inactive'}`, 'Close', {
          duration: 3000
        });
      },
      error: (err) => {
        console.error('Failed to update status:', err);
        this.snackBar.open('Error updating status. Please try again.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  editStylist(row: StylishData): void {
    const encodedId = btoa(row.id.toString()); // Encode the ID as Base64
    this.router.navigate(['/dashboard/stylish/edit-stylish'], {
      queryParams: {
        id: encodedId
      }
    });
  }

  deleteStylist(id: number): void {
    if (confirm('Are you sure you want to delete this stylist?')) {
      this.adminService.deleteStylist(id).subscribe({
        next: (response) => {
          // console.log('Delete response:', response);
          this.snackBar.open('Stylist deleted successfully', 'Close', { duration: 3000 });
          this.fetchStylists();
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Failed to delete stylist:', err);
          this.snackBar.open('Error deleting stylist. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }




}
