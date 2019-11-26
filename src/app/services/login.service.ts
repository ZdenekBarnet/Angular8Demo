import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';
import { ICustomer } from '../model/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/';
  // baseUrl = 'https://barnetdemo.herokuapp.com/'; // logovani serveru pres cmd: heroku logs -t

  login(loginPayload) {
    // FxMDLt9SnonDYh4w jsem zvolil jako konstantu a pomoci https://www.devglan.com/online-tools/bcrypt-hash-generator
    // vygeneroval protikus na serveru v AuthorizationServerConfig CLIENT_SECRET, CLIEN_ID jsem zvolil
    const headers = {
      Authorization: 'Basic ' + btoa('FkBF6CojSxiwduZf:FxMDLt9SnonDYh4w'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.baseUrl + 'oauth/token', loginPayload, {headers});
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'users/user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserById(id: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.baseUrl + 'users/user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createUser(user: Customer) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.baseUrl + 'users/user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  updateUser(user: Customer) {
    // tslint:disable-next-line: max-line-length
    return this.http.put(this.baseUrl + 'users/user/' + user.id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  deleteUser(id: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.delete(this.baseUrl + 'users/user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getCustomers(): Observable <Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'testPersons/testPerson');
  }

  createCustomer(customer: Customer) {
    return this.http.post(this.baseUrl + 'testPersons/testPerson', customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(this.baseUrl + 'testPersons/testPerson/' + customer.id, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.baseUrl + 'testPersons/testPerson/' + id);
  }

  getRandomUser() {
    return this.http.get('https://randomuser.me/api/');
  }
}
