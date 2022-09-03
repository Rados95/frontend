import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`/api/users/login`, new LoginRequest(username, password), {headers: this.headers});
  }

  isSignedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return user !== undefined && user !== null;
  }

  isAdmin(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user !== undefined && user !== null) {
      const userObject = JSON.parse(user);
      return userObject.role === 'ADMIN';
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.toastr.info('Logout successful!');
    this.router.navigateByUrl('/login');
  }
}
