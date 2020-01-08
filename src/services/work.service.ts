import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import * as global from '../global.variables';
import { UserService } from './user.service';
import { HttpInterceptor } from './interceptor.service';
import { GlobalService } from './global.service';

@Injectable()
export class WorkService {

  private current_user: any;
  private header: Headers;
  private base_url: String;
  constructor(private http: HttpInterceptor, private us: UserService, private baseUrl: GlobalService) {
    this.header = new Headers();
    this.header.append('token', localStorage.getItem('token'));
    this.base_url = this.baseUrl.baseUrl;
  }


  saveWork(value) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/saveWork`;
    return this.http.post(url, value, { headers: this.header }).map(res => res);
  }
  getWorkStatistics(empno, datetype, type) {
    const url = `${this.base_url}WorkService/getWorkStatistics?empNo=${empno}&dateType=${datetype}&type=${type}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getActivityStatistics(empno, datetype, type) {
    const url = `${this.base_url}WorkService/getActivityStatistics?empNo=${empno}&dateType=${datetype}&type=${type}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getOrgWorkStatistics(orgId, datetype, type) {
    const url = `${this.base_url}WorkService/getOrgWorkStatistics?orgId=${orgId}&dateType=${datetype}&type=${type}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getOrgActivityStatistics(orgId, datetype, type) {
    const url = `${this.base_url}WorkService/getOrgActivityStatistics?orgId=${orgId}&dateType=${datetype}&type=${type}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getOrgWorkItems(orgId, datetype, status) {
    const url = `${this.base_url}WorkService/getOrgWorkItems?orgId=${orgId}&dateType=${datetype}&status=${status}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res, error => console.log(error)
    );

  }
  getOrgWorkItemsType(orgId, dateType, typeId) {
    // console.log(orgId+ ':'+dateType+ ':' + status +':'+typeId);
    const url = `${this.base_url}WorkService/getOrgWorkItems?orgId=${orgId}&dateType=${dateType}&typeId=${typeId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getUserWorkItems(dateType, typeId) {
    const url = `${this.base_url}WorkService/getUserWorkItems?dateType=${dateType}&typeId=${typeId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getOrgAcitityItemsType(orgId, dateType, typeId) {
    const url = `${this.base_url}WorkService/getOrgActivityItems?orgId=${orgId}&dateType=${dateType}&typeId=${typeId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getOrgActivityItems(orgId, datetype, status) {
    const url = `${this.base_url}WorkService/getOrgActivityItems?orgId=${orgId}&dateType=${datetype}&status=${status}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res, error => console.log(error)
    );

  }
  // getWorkHistory(id) {
  //   const url = `${this.base_url}WorkService/getWorkHistory?workId=${id}`;
  //   return this.http.get(url).map(
  //     res => res , error => console.log(error)
  //   );
  // }

  getAcitvityHistory(id) {
    const url = `${this.base_url}WorkService/getWorkHistory?activityId=${id}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res, error => console.log(error)
    );
  }
  getActivityForAction(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getActivityForAction?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getSentItems(empId, page) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getSentItems?empNo=${empId}&pageNo=${page}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getInboxItems(empId, page) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getInboxItems?empNo=${empId}&pageNo=${page}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getDraftItems(empId, page) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getDraftItems?empNo=${empId}&pageNo=${page}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getArchiveItems(empId, page) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getArchiveItems?empNo=${empId}&pageNo=${page}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getActivityInfo(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getActivityInfo?id=${id}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  saveActivity(formdetails) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/saveActivity`;
    return this.http.post(url, formdetails, { headers: this.header }).map(res => res);
  }

  finishActivity(activity) {
    const url = `${this.base_url}WorkService/finishActivity`;
    return this.http.post(url, activity, { headers: this.header }).map(res => res);
  }

  markActivityAsRead(empNo, id, roleId) {
    const url = `${this.base_url}WorkService/markActivityAsRead?id=${id}&empNo=${empNo}&roleId=${roleId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getWorkHistory(workId) {
    const url = `${this.base_url}WorkService/getWorkHistory?workId=${workId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  searchInbox() {
    const url = `${this.base_url}WorkService/searchInbox`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  searchSentItems() {
    const url = `${this.base_url}WorkService/searchSentItems`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  recallActivity(id) {
    const url = `${this.base_url}WorkService/recallActivity?id=${id}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getActivityResponses(id) {
    const url = `${this.base_url}WorkService/getActivityResponses?id=${id}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  finishMultipleActivities(formdetails) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/finishMultipleActivities`;
    return this.http.post(url, formdetails, { headers: this.header }).map(res => res);
  }
  getWorkRegister(type, category) {
    const url = `${this.base_url}WorkService/getWorkRegister?type=${type}&category=${category}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getWorkAttachments(workId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getWorkAttachments?workId=${workId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getWorkDraftActivity(workid) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getWorkDraftActivity?workId=${workid}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getWorkActivity(workId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/getWorkActivity?workId=${workId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getActivityItems(datetype, status) {
    const url = `${this.base_url}WorkService/getUserActivityItems?dateType=${datetype}&status=${status}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res);
  }
  getActivityItemsType(datetype, typeId) {
    const url = `${this.base_url}WorkService/getUserActivityItems?dateType=${datetype}&typeId=${typeId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res);
  }
  getUserWorkItemsType(dateType, typeId) {
    const url = `${this.base_url}WorkService/getUserWorkItems?dateType=${dateType}&typeId=${typeId}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getUserWorkItemsStatus(dateType, status) {
    const url = `${this.base_url}WorkService/getUserWorkItems?dateType=${dateType}&status=${status}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  searchWork(request: any): any {
    const url = `${this.base_url}WorkService/searchWork`;
    return this.http.post(url, request, { headers: this.header }).map(res => res.json());
  }
  flagActivity(workid, flag, roleId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/flagActivity?id=${workid}&flag=${flag}&roleId=${roleId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res);
  }
  updateSubject(activityId, subject) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/updateSubject?actid=${activityId}&subject=${subject}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  updatePrimaryDocument(workId, activityid) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/updatePrimaryDocument?id=${workId}&activityid=${activityid}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  sendPendingActivityNotifications(workid) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}WorkService/sendPendingActivityNotifications?workid=${workid}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
}
