import { Injectable } from '@angular/core';
import { window } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user:any){
    return localStorage.setItem('user',JSON.stringify(user));
   }

   public getUser(){
    return localStorage.getItem('user');
   }

  public getUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || null;
  }

   public logout()
   {
    localStorage.removeItem('user');
   }
}
