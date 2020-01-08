import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import * as global from '../global.variables';
import { HttpInterceptor } from './interceptor.service';
import { identifierName } from '@angular/compiler';
import { UserService } from './user.service';
import { GlobalService } from './global.service';
import { LoadingService } from './loading-service';
import { Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './toast-service';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';

@Injectable()
export class DocumentService {
  private header: Headers;
  public base_url: any;
  private fileTransfer: FileTransferObject;
  constructor(private http: HttpInterceptor, private us: UserService, private global: GlobalService, private transfer: FileTransfer, private file: File,
    private platform: Platform, private tr: ToastService, private translate: TranslateService, private loading: LoadingService, private statusbar: StatusBar) {
    this.header = new Headers();
    this.header.append('token', localStorage.getItem('token'));
    this.base_url = this.global.baseUrl;

  }

  addDocument(form) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/addDocument`;
    return this.http.post(url, form, { headers: this.header }).map(
      res => res
    );
  }
  downloadMultipleDocuments(docIds) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadMultipleDocuments`;
    return this.http.post(url, docIds, { headers: this.header }).map(
      res => res
    );
    //  return url;
  }
  getFormJSONDocumentForActivity(docId, activitiId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getFormJSONDocumentForActivity?docId=${docId}&activityId=${activitiId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(res => res);
  }

  downloadDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadDocument?id=${docId}&sysdatetime=${fulldatetime}`;
    //  return url;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }

  downloadThisDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadThisDocument?id=${docId}&sysdatetime=${fulldatetime}`;
    // return url;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }
  checkOut(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/checkOut?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getThisDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getThisDocument?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  searchDocuments(request: any): any {
    const url = `${this.base_url}DocumentService/search`;
    return this.http.post(url, request, { headers: this.header }).map(res => res.json());
  }

  cancelCheckOut(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/cancelCheckOut?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  checkIn(formData) {
    const url = `${this.base_url}DocumentService/checkIn`;
    return this.http.post(url, formData, { headers: this.header }).map(
      res => res
    );
  }

  viewDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadDocument?id=${docId}`;
    // return url;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }

  getDocumentFolders(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getDocumentFolders?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getFavorites(empNo) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getFavorites?empno=${empNo}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  addToFavorites(empno, id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/addToFavorites?empno=${empno}&id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  removeFromFavorites(empno, id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/removeFromFavorites?empno=${empno}&id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentVersions(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getDocumentVersions?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentPermissions(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getDocumentPermissions?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getRecent(empNo) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getRecent?empno=${empNo}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentPageCount(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getDocumentPageCount?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getPreviewPage(docId, pagenumber) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getPreviewPage?id=${docId}&page=${pagenumber}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  downloadPreviewPage(docId, pagenumber) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadPreviewPage?id=${docId}&page=${pagenumber}&empno=${this.us.getCurrentUser().EmpNo}&token=${localStorage.getItem('token')}&sysdatetime=${fulldatetime}`;
    // return this.http.get(url, {headers:this.header}).map(
    //   res => res
    // );
    return url;
  }

  downloadAnnotation(docId, pagenumber) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadAnnotation?id=${docId}&page=${pagenumber}&empno=${this.us.getCurrentUser().EmpNo}&token=${localStorage.getItem('token')}&sysdatetime=${fulldatetime}`;
    // return this.http.get(url, {headers:this.header}).map(
    //   res => res
    // );
    return url;
  }


  saveAnnotation(annotation) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/saveAnnotation`;
    return this.http.post(url, annotation, { headers: this.header }).map(
      res => res
    );
  }

  getAnnotations(documentId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getAnnotations?id=${documentId}&status=ALL?sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  updateProperties(val) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/updateProperties`;
    return this.http.post(url, val, { headers: this.header }).map(
      res => res
    );
  }
  downloadAnnotatedDocument(documentId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/downloadAnnotatedDocument?id=${documentId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }

  downloadSignedDocument(docId, name) {
    this.loading.show();
    let options: FileUploadOptions = {
      headers: { "token": localStorage.getItem('token') }
    }
    this.fileTransfer = this.transfer.create();
    let path = '';
    let dir_name = 'Pistaceo'; // directory to download - you can also create new directory
    let file_name = name; //any file name you like
    let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
    result.then((resp) => {
      path = resp.toURL();
      const sysDateTime = new Date();
      const fulldatetime = sysDateTime.getTime();
      const url = `${this.base_url}DocumentService/downloadSignedDocument?id=${docId}&sysdatetime=${fulldatetime}`;
      this.platform.ready().then((readySource) => {
        this.statusbar.styleDefault();
        if (this.platform.is('android')) {
          this.statusbar.overlaysWebView(false);
          this.statusbar.backgroundColorByHexString('#000000');
        }
        // var downloadManager = require('cordova-plugin-android-downloadmanager.DownloadManager')
        this.fileTransfer.download(url, path + file_name, true, options).then((entry) => {
          //here logging our success downloaded file path in mobile.
          this.loading.hide();
          console.log('download completed: ' + entry.nativeURL);
          this.tr.presentToast(this.translate.instant('Download is success') + ' ' + 'Availabel in :' + 'Phone Storage/Pistaceo/' + name);
        }, (error) => {
          //here logging our error its easier to find out what type of error occured.
          console.log(error);
          this.loading.hide();
          this.tr.presentToast(this.translate.instant('Failed to download'));
        });
      });
    }, (err) => {
      console.log(err);
      this.loading.hide();
      this.tr.presentToast(this.translate.instant('Failed to create path'));
    });
    // const sysDateTime = new Date();
    // const fulldatetime = sysDateTime.getTime();
    // const url = `${this.base_url}DocumentService/downloadSignedDocument?id=${documentId}&sysdatetime=${fulldatetime}`;
    // return this.http.get(url,{responseType:ResponseContentType.Blob, headers:this.header}).map(
    //   res => res
    // );
  }

  completeAnnotation(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/completeAnnotation?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  deleteAnnotation(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/deleteAnnotation?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getJSONFromDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/getJSONFromDocument?docId=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  addJSONDocument(formDetails) {
    const url = `${this.base_url}DocumentService/addJSONDocument`;
    return this.http.post(url, formDetails, { headers: this.header }).map(res => res);
  }
  saveFormDocument(formDetails) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}DocumentService/saveFormDocument?sysdatetime=${fulldatetime}`;
    return this.http.post(url, formDetails, { headers: this.header }).map(res => res);
  }


}
