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

   public logout()
   {
    localStorage.removeItem('user');
   }
}
