import { Injectable,Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage/storage.service';


@Injectable({
  providedIn:'root'
})

export class AuthGuardProvider implements CanActivate{
  constructor(private router:Router,
    private storage:StorageService
  ){}
  canActivate(): MaybeAsync<GuardResult> {
    if(this.storage.getUser()!== null){
      console.log("hello");
      return true;
    }
    this.router.navigate(['/login'])
    alert("please log in....")
    return false;
    
  }

  
}
export const authGuard: CanActivateFn = (route, state) => {
  
  return true;
};