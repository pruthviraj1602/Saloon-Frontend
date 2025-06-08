import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AdminserviceService} from '../../../services/adminservice.service';

@Component({
  selector: 'app-edit-record',
  standalone: false,
  templateUrl: './edit-record.component.html',
  styleUrl: './edit-record.component.scss'
})
export class EditRecordComponent implements OnInit {

 bookingForm!: FormGroup;
  reportId!: number;


   constructor(private route: ActivatedRoute, private fb: FormBuilder,private adminService:AdminserviceService,private router:Router) {}

  stylists: any[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.reportId = idParam ? +idParam : 0;

    // Initialize form
    this.bookingForm = this.fb.group({
      id: [''],
      customerName: ['', Validators.required],
      service: ['', Validators.required],
      customerContact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      time: ['', Validators.required],
      date: ['', Validators.required],
      payment:['', Validators.required],
      paymentType: ['', Validators.required],
      stylistId: ['', Validators.required]
    });

    this.adminService.getAllStylists().subscribe({
      next: (res) => {
        this.stylists = res;
      },
      error: (err) => console.error('Failed to load stylists:', err)
    });

    // Fetch and patch form if ID exists
    if (idParam) {
      this.adminService.getAppointment(idParam).subscribe({
        next: (data) => {
          console.log(data)
          this.bookingForm.patchValue({
            id:data.id,
            customerName: data.customerName,
            service: data.service,
            customerContact: data.customerContact,
            time: data.time,
            date: data.date,
            payment:data.payment,
            paymentType: data.paymentType,
            stylistId: data.stylist?.stylistId
          });
        },
        error: (err) => {
          console.error('Error fetching appointment:', err);
        }
      });
    }
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
        next: () => {
          alert("Update Successfully..!");
          this.router.navigate(['/dashboard/reports']);
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    } else {
      console.warn('Form is invalid:', this.bookingForm.value);
    }
  }




}
