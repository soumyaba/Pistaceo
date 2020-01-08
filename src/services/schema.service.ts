import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import * as global from '../global.variables';
import {UserService} from './user.service';
import { HttpInterceptor } from './interceptor.service';
import { GlobalService } from './global.service';

@Injectable()
export class SchemaService {
  private base_url: string;
  private header:Headers;
  constructor(private http: HttpInterceptor, private baseUrl: GlobalService) {
    this.header = new Headers();
    this.header.append('token', localStorage.getItem('token'));
    this.base_url = this.baseUrl.baseUrl;
  }
  getWorkTypes():Observable<any> {
    // console.log(localStorage.getItem('token'));
    // if(localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== '') {
    //   let hdr = new Headers();
      // hdr.append('token', localStorage.getItem('token'));
      const url = `${this.base_url}SchemaService/getWorkTypes`;
      return this.http.get(url,{headers:this.header}).map(
          res => res
      );
    // }
  }
  getWorkTypeFromID(activityId) {
    // let hdr = new Headers();
    //   hdr.append('token', localStorage.getItem('token'));
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}SchemaService/getActivityTypeFromID?id=${activityId}`;
    return this.http.get(url,{headers:this.header}).map(
      res => res
    );
  }
  getActivityTypeFromID(id) {
    // let hdr = new Headers();
    //   hdr.append('token', localStorage.getItem('token'));
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}SchemaService/getActivityTypeFromID?id=${id}`;
    return this.http.get(url,{headers:this.header}).map(
      res => res
    );
  }
  getWorkCategories() {
    const url = `${this.base_url}SchemaService/getWorkCategories`;
      return this.http.get(url,{headers:this.header}).map(
          res => res
      );
  }
  saveWorkCategory(value) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}SchemaService/saveWorkCategory`;
    return this.http.post(url, value , {headers: this.header}).map(res => res);
  }
  getWorkTypeSearch(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}SchemaService/getWorkTypeSearch?id=${id}`;
    return this.http.get(url, {headers: this.header}).map(
      res => res
    );
  }
}
