import { Injectable } from "@angular/core";
import { HttpInterceptor } from "./interceptor.service";
import { GlobalService } from "./global.service";
import { ToastService } from "./toast-service";
import { Headers } from '@angular/http';

@Injectable()
export class ConfigurationService {
    private base_url: string;
    private header: Headers;
    constructor(private http: HttpInterceptor, private baseUrl: GlobalService, private tr: ToastService) {
        this.base_url = this.baseUrl.baseUrl;
        this.header = new Headers();
        if (localStorage.getItem('token') !== null) {
            this.header.append('token', localStorage.getItem('token'));
        }
    }
    getConfiguration(key) {
        const sysDateTime = new Date();
        const fulldatetime = sysDateTime.getTime();
        const url = `${this.base_url}ConfigurationService/getConfiguration?key=${key}&sysdatetime=${fulldatetime}`;
        return this.http.get(url, { headers: this.header }).map(
            res => res
        );
    }
}