import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AdminserviceService} from '../../../services/adminservice.service';
import {ToastrService} from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-record',
  standalone: false,
  templateUrl: './edit-record.component.html',
  styleUrl: './edit-record.component.scss'
})
export class EditRecordComponent implements OnInit {

 bookingForm!: FormGroup;
  reportId!: number;


   constructor(private route: ActivatedRoute,
               private fb: FormBuilder,
               private adminService:AdminserviceService,
               private router:Router,
               private snackBar:MatSnackBar
   ) {}

  stylists: any[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.reportId = idParam ? +idParam : 0;

    this.bookingForm = this.fb.group({
      id: [''],
      customerName: ['', Validators.required],
      service: ['', Validators.required],
      customerContact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      time: ['', Validators.required],
      date: ['', Validators.required],
      payment: ['', Validators.required],
      paymentType: ['', Validators.required],
      stylistId: [null, Validators.required]  // Ensure type consistency
    });

    this.adminService.getAllStylists().subscribe({
      next: (res) => {
        this.stylists = res;
      },
      error: (err) => console.error('Failed to load stylists:', err)
    });

    if (idParam) {
      this.adminService.getAppointment(idParam).subscribe({
        next: (data) => {
          // Format date to yyyy-MM-dd if needed
          const formattedDate = new Date(data.date).toISOString().substring(0, 10);

          this.bookingForm.patchValue({
            id: data.id,
            customerName: data.customerName,
            service: data.service,
            customerContact: data.customerContact,
            time: data.time,
            date: formattedDate,
            payment: data.payment,
            paymentType: data.paymentType,
            stylistId: data.stylist?.stylistId
          });
        },
        error: (err) => console.error('Error fetching appointment:', err)
      });
    }
  }

  get formControls() {
    return Object.entries(this.bookingForm.controls);
  }


  onSubmit(): void {
    if (this.bookingForm.valid) {

      const formData = this.bookingForm.value;

      let payload = {
        id: formData.id,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        customerName: formData.customerName,
        customerContact: formData.customerContact,
        payment: formData.payment,
        paymentType: formData.paymentType,
        stylist: {
          stylistId: formData.stylistId
        }
      };

      console.log('Payload to update:', payload);

      this.adminService.updateAppointment(payload).subscribe({
        next: (data) => {
          console.log(data)
          this.snackBar.open("update successfully...!","Close",{duration:3000})
          this.router.navigate(['/dashboard/reports']);
        },
        error: (err) => {
          this.snackBar.open("update failed...,","Close",{duration:3000})
        }
      });
    } else {
      console.warn('Form is invalid:', this.bookingForm.value);
    }
  }




}
