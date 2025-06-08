import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminserviceService } from '../../../services/adminservice.service';

@Component({
  selector: 'app-edit-stylish',
  standalone: false,
  templateUrl: './edit-stylish.component.html',
  styleUrl: './edit-stylish.component.scss'
})
export class EditStylishComponent implements OnInit{
  stylistForm: FormGroup;
  stylistData: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminserviceService
  ) {
    this.stylistForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      location: ['', Validators.required],
      reference: [''],
      
      expert_in: [''],
      active: [true, Validators.required], 
    });
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encodedId = params['id'];
      if (encodedId) {
        try {
          const decodedId = atob(encodedId); 
          this.fetchStylistById(decodedId);
        } catch (e) {
          console.error('Invalid ID encoding');
          this.router.navigate(['/dashboard/stylish']); 
        }
      }
    });
  }

  fetchStylistById(id: string): void {
    this.adminService.getStylistById(id).subscribe({
      next: (data: any) => {
        this.stylistData = {
          id: data.stylistId,
          name: data.stylistName,
          email: data.email,
          phoneNo: data.contact,
          reference: data.reference,
          expert_in: data.expert_in,
          date: data.date,
          bio: data.bio,
          location: data.location,
          active: data.active
        };
        
        this.stylistForm.patchValue(this.stylistData);
        
      },
      error: (err) => {
        console.error('Failed to fetch stylist details:', err);
      }
    });
  }
  onSubmit(): void {
    if (this.stylistForm.valid) {
      // Prepare updatedData including required fields for backend
      const updatedData = {
        stylistId: this.stylistData.id,
        stylistName: this.stylistForm.value.name,
        email: this.stylistForm.value.email,
        contact: this.stylistForm.value.phoneNo,
        location: this.stylistForm.value.location,
        reference: this.stylistForm.value.reference || '',
        expert_in: this.stylistForm.value.expert_in || '',
        active: this.stylistForm.value.active
        
        // date: this.stylistData.date || '',
        // bio: this.stylistData.bio || ''
      };
      
  
      console.log('Updating stylist with params:', updatedData);
  
      this.adminService.updateStylistDetails(updatedData).subscribe({
        next: () => {
          console.log('Stylist updated successfully');
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    }
  }
  
  
  
  

  
  
  
}
