import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from '../../../services/adminservice.service';
import { StorageService } from '../../../storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private adminservice: AdminserviceService,
    private router: Router,
    private storage: StorageService

  ) {
  }
  login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  log() {
    const user = this.login.value;
    console.log("Logging in with:", user);

    this.adminservice.login(user).subscribe(
      (res) => {
        this.storage.saveUser(res);
        console.log(res.accessToken);
        localStorage.setItem('token', res.token);
        console.log("Login Success", res);
        alert("Login Success!");


        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.error("Login Failed", err.error.message);
        alert("Login Failed: " + err.error.message);
      }
    );
  }
  
}
