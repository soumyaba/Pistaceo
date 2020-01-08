import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { HttpInterceptor } from './interceptor.service';
import { GlobalService } from './global.service';

@Injectable()
export class IntegrationService {
  private base_url: string;
  private header: Headers;
  constructor(private http: HttpInterceptor, private baseUrl: GlobalService) {
    this.base_url = this.baseUrl.baseUrl;
    this.header = new Headers();
    this.header.append('token', localStorage.getItem('token'));
  }

  getDBLookup(dbLookUp) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}IntegrationService/getDBLookup?sysdatetime=${fulldatetime}`;
    return this.http.post(url, dbLookUp, { headers: this.header }).map(
      res => res
    );
  }

  getDBTypeAhead(dbLookUp) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}IntegrationService/getDBTypeAhead?sysdatetime=${fulldatetime}`;
    return this.http.post(url, dbLookUp, { headers: this.header }).map(
      res => res
    );
  }
  getDBAutoFill(autoFill) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}IntegrationService/getDBAutoFill?sysdatetime=${fulldatetime}`;
    return this.http.post(url, autoFill, { headers: this.header }).map(
      res => res
    );
  }



}
