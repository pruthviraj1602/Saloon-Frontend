import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BASE_URL from '../helper/helper';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { StylishData } from '../components/stylish-main/stylish-main.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private readonly http: HttpClient,private router: Router) { }

  login(user: any): Observable<any> {
    return this.http.post(`${BASE_URL}/admin/login`, user, {
    });
  }

  addStylist(stylistData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in stylistData) {
      if (stylistData.hasOwnProperty(key)) {
        body.set(key, stylistData[key]);
      }
    }
    return this.http.post(`${BASE_URL}/stylist/add-stylist`, body.toString(), { headers });
  }

  getAllStylists(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/stylist/get-all-stylist`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
  }



  updateStylistStatus(id: number, updatedStatus: boolean) {
    return this.http.patch<any>(
      `${BASE_URL}/stylist/update-stylist`,
      {
        stylistId: id,
        active: updatedStatus
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  }

  updateStylistDetails(stylist: any) {
    const params = new URLSearchParams({
      stylistId: stylist.stylistId.toString(),
      stylistName: stylist.stylistName,
      email: stylist.email,
      contact: stylist.contact,
      location: stylist.location,
      reference: stylist.reference,
      expert_in: stylist.expert_in,
      date: stylist.date,
      bio: stylist.bio
    });

    return this.http.patch<any>(
      `${BASE_URL}/stylist/update-stylist?${params.toString()}`,
      null, // No JSON body
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // No Content-Type needed because no body
        }
      }
    );
  }





  editStylist(row: StylishData): void {
    const encodedId = btoa(row.id.toString()); // encode id as base64
    this.router.navigate(['/dashboard/stylish/edit-stylish'], {
      queryParams: { id: encodedId }
    });
  }

  getStylistById(id: string) {
    return this.http.get(`${BASE_URL}/stylist/get-stylist?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  toggleStylistActiveStatus(id: number, active: boolean) {
    const body = {
      stylistId: id,
      active: active
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    };

    // ✅ Ensure you're sending to the actual backend URL
    return this.http.put(`${BASE_URL}/stylist/update-is-active`, body, { headers });
  }


  deleteStylist(id: number) {
    const token = localStorage.getItem('token') || '';
    const url = `${BASE_URL}/stylist/delete-stylists?id=${id}`;

    return this.http.delete(url);
  }



  public getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/location/get`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  public bookAppointment(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/appointment/add-appointment`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  public getAppointments():Observable<any>{
    return this.http.get<any[]>(`${BASE_URL}/appointment/get-all-appointment`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  public getAppointment(id:any):Observable<any>{
    return this.http.get<any[]>(`${BASE_URL}/appointment/get-appointment?id=${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  public updateAppointment(payload:any):Observable<any>{
    return this.http.put(`${BASE_URL}/appointment/update-appointment`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }


}
