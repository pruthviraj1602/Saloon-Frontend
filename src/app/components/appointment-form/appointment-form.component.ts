import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  standalone: false,
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnInit {

  // UI states
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private adminService: AdminserviceService) {}



  ngOnInit(): void {
    this.fetchStylistNames();
  }


  appointment: FormGroup = new FormGroup({
    customerName: new FormControl(''),
    serviceName: new FormControl(''),
    customerContact: new FormControl(''),
    time: new FormControl(''),
    date: new FormControl(''),
    stylistId: new FormControl(''),
    payment: new FormControl(0),
    paymentType: new FormControl('')
  });


  stylist: any[] = [];

  fetchStylistNames(): void {
    this.adminService.getAllStylists().subscribe({
      next: (data) => {
        console.log(data)
        this.stylist=data;
      },
      error: (err) => {
        console.error('Error fetching stylist names:', err);
      }
    });
  }


  submitAppointment(): void {
    if (this.isSubmitting || this.appointment.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

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
      }
    };

    console.log(payload)
    this.adminService.bookAppointment(payload).subscribe({
      next: () => {
        this.successMessage = 'Appointment booked successfully!';
        this.isSubmitting = false;
        this.appointment.reset();
      },
      error: (err) => {
        this.errorMessage = 'Failed to book appointment.';
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }




}
