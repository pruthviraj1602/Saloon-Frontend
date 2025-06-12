import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminserviceService } from '../../../services/adminservice.service';
import {StorageService} from '../../../storage/storage.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-stylish',
  standalone: false,
  templateUrl: './add-stylish.component.html',
  styleUrl: './add-stylish.component.scss'
})
export class AddStylishComponent {

  stylistForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminserviceService,
    private storage:StorageService,
    private router:Router
  ) {
    this.stylistForm = this.fb.group({
      stylistName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      location: ['', Validators.required],
      reference: ['',Validators.required],
      expert_in: ['', Validators.required],

    });
  }

  closeForm() {
    this.router.navigate(['/dashboard/stylish'])
  }


  onSubmit() {
    if (this.stylistForm.valid) {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        console.error('No auth token found. Please login.');
        return;  // stop submission if no token
      }

      const formData = this.stylistForm.value;
      formData.id=this.storage.getUserId();

      console.log('Submitting formData:', formData);

      this.adminService.addStylist(formData).subscribe(
        response => {
          console.log('Stylist added successfully:', response);
          alert('Stylist added successfully!');
          this.stylistForm.reset();
        },
        error => {
          console.error('Error adding stylist:', error);
          alert('Failed to add stylist. Please try again.');
        }
      );
    }
  }



}
