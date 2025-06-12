import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StorageService} from '../../storage/storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-appointment-form',
  standalone: false,
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnInit {

  // UI states
  isSubmitting = false;


  constructor(private adminService: AdminserviceService,private storage:StorageService,private snackBar: MatSnackBar) {}



  ngOnInit(): void {
    this.fetchStylistNames();
  }


  appointment = new FormGroup({
    stylistId: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    serviceName: new FormControl('', Validators.required),
    customerContact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    time: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    payment: new FormControl('', [Validators.required, Validators.min(1)]),
    paymentType: new FormControl('', Validators.required)
  });


  stylist: any[] = [];

  fetchStylistNames(): void {
    this.adminService.getAllStylists().subscribe({
      next: (data) => {
        // Filter out only active stylists
        this.stylist = data.filter((stylist: any) => stylist.active === true);
      },
      error: (err) => {
        console.error('Error fetching stylist names:', err);
      }
    });
  }





  submitAppointment(): void {
    if (this.appointment.invalid) {
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 3000 });
      return;
    }
    if (this.isSubmitting || this.appointment.invalid) return;
    let id=this.storage.getUserId();
    this.isSubmitting= true;


    const formData = this.appointment.value;

    let payload = {
      service: formData.serviceName,
      date: formData.date,
      time: formData.time,
      customerName: formData.customerName,
      customerContact: formData.customerContact,
      payment: formData.payment,
      paymentType: formData.paymentType,
      stylist: {
        stylistId: formData.stylistId
      },
      admin:{
        id:id
      }
    };

    console.log(payload)
    this.adminService.bookAppointment(payload).subscribe({
      next: () => {
        this.snackBar.open('Appointment Scheduled', 'Close', {
          duration: 3000
        });

        this.isSubmitting = false;
        this.appointment.reset();
      },
      error: (err) => {

        console.error(err);
        this.isSubmitting = false;
      }
    });
  }




}
