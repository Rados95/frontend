import {Component, OnInit} from '@angular/core';
import {LoginRequest} from "../../model/login-request";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest('', '');

  constructor(private loginService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginRequest = new LoginRequest('', '');
  }

  login() {
    this.loginService.login(this.loginRequest.username, this.loginRequest.password).subscribe({
      next: res => {
        localStorage.setItem('currentUser', JSON.stringify({
          username: this.loginRequest.username,
          role: res.role
        }));
        this.toastr.success('Login successful!');
        this.router.navigateByUrl('/');
      },
      error: error => {
        this.toastr.error('Login failed!');
      }
    });
  }

}
