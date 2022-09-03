import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`/api/users`, user, {headers: this.headers});
  }

  getUsers(): Observable<User[]> {
    const httpParams = new HttpParams().append('role', 'SELLER');
    return this.http.get<User[]>(`/api/users`, {headers: this.headers, params: httpParams});
  }

  getUserByUsername(username: string): Observable<User> {
    console.log(username);
    return this.http.get<User>(`/api/users/${username}`, {headers: this.headers})
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${username}`, {headers: this.headers})
  }
}
