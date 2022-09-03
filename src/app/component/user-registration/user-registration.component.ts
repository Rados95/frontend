import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistration = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatedPassword: ''
  };

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  register() {
    if (this.fieldsAreFilled() && this.passwordsMatch()) {
      const user: User = {...this.userRegistration, role: 'SELLER'};
      this.userService.saveUser(user).subscribe({
        next: (res) => {
          this.toastr.success('User successfully added.');
          this.router.navigateByUrl('/user-list');
        },
        error: (error) => {
          this.toastr.error('User registration failed.');
        }
      });
    }
  }

  private passwordsMatch(): boolean {
    return this.userRegistration.password === this.userRegistration.repeatedPassword;

  }

  private fieldsAreFilled(): boolean {
    return this.userRegistration.username !== ''
      && this.userRegistration.firstName !== ''
      && this.userRegistration.lastName !== ''
      && this.userRegistration.email !== ''
      && this.userRegistration.password !== ''
      && this.userRegistration.repeatedPassword !== null && this.userRegistration.repeatedPassword !== '';
  }

}
