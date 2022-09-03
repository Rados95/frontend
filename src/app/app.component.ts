import {Component} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService) {
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    return this.authService.logout();
  }
}
