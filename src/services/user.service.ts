import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpInterceptor } from './interceptor.service';
import { GlobalService } from './global.service';
import { ToastService } from './toast-service';

@Injectable()
export class UserService {
  private base_url: string;
  private header: Headers;
  constructor(private http: HttpInterceptor, private baseUrl: GlobalService, private tr: ToastService) {
    this.base_url = this.baseUrl.baseUrl;
    this.header = new Headers();
    if (localStorage.getItem('token') !== null) {
      this.header.append('token', localStorage.getItem('token'));
    }
  }
  authenticateUser(username, password, urls) {
    localStorage.clear();
    localStorage.removeItem('token');
    let headers = new Headers();
    headers.append('userid', username);
    headers.append('password', password);
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${urls}UserService/authenticateUser`;
    return this.http.get(url, { headers: headers })
    // .map(
    //   response => { this.responsefromlog(response); }
    // );
  }
  responsefromlog(data) {
    localStorage.setItem('token', data._body);
    this.header.append('token', localStorage.getItem('token'));
  }
  logIn(username: any, password: any, token: any, urls): Observable<any> {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${urls}UserService/getUserDetails?userid=${username}&sysdatetime=${fulldatetime}`;
    localStorage.setItem('token', token);
    this.header.append('token', localStorage.getItem('token'));
    return this.http.get(url, { headers: this.header });
  }

  searchUsers(text) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/searchUsers?key=NAME&text=${text}&usertype=role`;
    return this.http.get(url, { headers: this.header });
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'Server Error');
  }

  userDetail(res) {
    const x = res._body;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  getRoles() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getRoles`;
    return this.http.get(url, { headers: this.header });

  }

  getUserDetails(userId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getUserDetails?userid=${userId}`;
    return this.http.get(url, { headers: this.header });
  }

  getUsers() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getUsers`;
    return this.http.get(url, { headers: this.header });
  }

  saveUser(user) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/saveUser`;
    return this.http.post(url, user, { headers: this.header });
  }

  saveRole(role) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/saveRole`;
    return this.http.post(url, role, { headers: this.header });
  }

  getOrgRoles() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getOrgRoles`;
    return this.http.get(url, { headers: this.header });
  }

  getSubOrgRoles(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getSubOrgRoles?orgId=${id}`;
    return this.http.get(url, { headers: this.header });
  }

  getUserDelegations() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getUserDelegations`;
    return this.http.get(url, { headers: this.header });
  }

  saveDelegation(userDetail) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/saveDelegation`;
    return this.http.post(url, userDetail, { headers: this.header });
  }
  getRoleMembers(roleid) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/getRoleMembers?roleId=${roleid}`;
    return this.http.get(url, { headers: this.header });
  }
  revokeDelegation(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/revokeDelegation?id=${id}`;
    return this.http.get(url, { headers: this.header });
  }
  generatePin() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/generatePIN`;
    return this.http.get(url, { headers: this.header });
  }
  saveSignature(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/saveSignature?signature=${id}`;
    return this.http.get(url, { headers: this.header });
  }

  validatepin(pin) {
    const url = `${this.base_url}UserService/validatePIN?pin=${pin}`;
    return this.http.get(url, { headers: this.header });
  }

  searchRoles(text) {
    const url = `${this.base_url}UserService/searchRoles?text=${text}`;
    return this.http.get(url, { headers: this.header });
  }
  searchSubordinateRoles(text) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}UserService/searchSubordinateRoles?text=${text}&roleid=${this.getCurrentUser().roles[0].id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
}
