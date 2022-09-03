import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
        next: data => {
          this.users = data as User[];
        },
        error: error => {
          this.toastr.error('An error occurred while trying to fetch the users');
        }
      }
    );
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe({
      next: data => {
        this.toastr.info('User deletion successful');
        this.loadUsers();
      },
      error: error => {
        this.toastr.error('User deletion failed');
      }
    });
  }

}
