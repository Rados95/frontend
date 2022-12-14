export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;

  constructor(username: string, firstName: string, lastName: string, email: string, role: string, password?: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.password = password;
  }
}
