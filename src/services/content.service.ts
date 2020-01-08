import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { HttpInterceptor } from './interceptor.service';
import { UserService } from './user.service';
import { GlobalService } from './global.service';
import { AlertController, Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastService } from './toast-service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './loading-service';
import { StatusBar } from '@ionic-native/status-bar';
@Injectable()
export class ContentService {
  private base_url: string;
  private header: Headers;
  private fileTransfer: FileTransferObject;
  constructor(private http: HttpInterceptor, private us: UserService, private global: GlobalService,
    private transfer: FileTransfer, private file: File,
    private platform: Platform, private tr: ToastService, private translate: TranslateService, private loading: LoadingService, private statusbar: StatusBar) {
    this.base_url = global.baseUrl;
    this.header = new Headers();
    this.header.append('token', localStorage.getItem('token'));
    this.header.append('repo', localStorage.getItem('repoName'));
  }

  getRepositories() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getRepositories?sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getAppRepository() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getAppRepository?sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getTopFolders() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getTopFolders?sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getSubfolders(folderId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getSubfolders?id=${folderId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getDocumentClasses() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getDocumentClasses?sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }


  getFolderDocuments(folderId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getFolderDocuments?id=${folderId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  createSubfolder(foldername, folderId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/createSubfolder?parentid=${folderId}&name=${foldername}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getUnfiledDocuments() {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getUnfiledDocuments`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentFolders(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getDocumentFolders?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getRecent(empNo) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getRecent?empno=${empNo}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getFavorites(empNo) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getFavorites?empno=${empNo}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  addToFavorites(empno, id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/addToFavorites?empno=${empno}&id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  removeFromFavorites(empno, id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/removeFromFavorites?empno=${empno}&id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  updateProperties(val) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/updateProperties`;
    return this.http.post(url, val, { headers: this.header }).map(
      res => res
    );
  }

  addDocument(form) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/addDocument`;
    return this.http.post(url, form, { headers: this.header }).map(
      res => res
    );
  }
  downloadMultipleDocuments(docIds) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    this.header.append('Accept', 'application/zip');
    this.header.append('responseType', 'arraybuffer');
    const url = `${this.global.baseUrl}ContentService/downloadMultipleDocuments`;
    return this.http.post(url, docIds, { headers: this.header }).map(
      res => res
    );
    //  return url;
  }

  downloadDocument(docId, name) {
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
      const url = `${this.base_url}ContentService/downloadDocument?id=${docId}&sysdatetime=${fulldatetime}`;
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
    // this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    //   .then(status => {
    //     if (status.hasPermission) {
    //       this.downloadFile(docId, name);
    //     }
    //     else {
    //       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    //         .then(status => {
    //           if(status.hasPermission) {
    //             this.downloadFile(docId, name);
    //           }
    //         });
    //     }
    //   });
  }

  downloadFile(docId, name) {

  }

  downloadThisDocument(docId, name) {
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
      const url = `${this.base_url}ContentService/downloadThisDocument?id=${docId}&sysdatetime=${fulldatetime}`;
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
  }
  checkOut(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/checkOut?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getThisDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getThisDocument?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  searchDocuments(request: any): any {
    const url = `${this.global.baseUrl}ContentService/search`;
    return this.http.post(url, request, { headers: this.header }).map(res => res.json());
  }

  cancelCheckOut(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/cancelCheckOut?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  checkIn(formData) {
    const url = `${this.global.baseUrl}ContentService/checkIn`;
    return this.http.post(url, formData, { headers: this.header }).map(
      res => res
    );
  }

  viewDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/downloadDocument?id=${docId}`;
    // return url;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }

  getDocumentVersions(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getDocumentVersions?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentPermissions(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getDocumentPermissions?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentPageCount(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getDocumentPageCount?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getPreviewPage(docId, pagenumber) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getPreviewPage?id=${docId}&page=${pagenumber}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  downloadPreviewPage(docId, pagenumber) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/downloadPreviewPage?id=${docId}&page=${pagenumber}&empno=${this.us.getCurrentUser().EmpNo}`;
    return url;
  }

  downloadAnnotation(docId, pagenumber) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/downloadAnnotation?id=${docId}&page=${pagenumber}&empno=${this.us.getCurrentUser().EmpNo}`;
    return url;
  }


  saveAnnotation(annotation) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/saveAnnotation`;
    return this.http.post(url, annotation, { headers: this.header }).map(
      res => res
    );
  }

  getAnnotations(documentId) {
    const url = `${this.global.baseUrl}ContentService/getAnnotations?id=${documentId}&status=ALL`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  downloadAnnotatedDocument(documentId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/downloadAnnotatedDocument?id=${documentId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }

  downloadSignedDocument(documentId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/downloadSignedDocument?id=${documentId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { responseType: ResponseContentType.Blob, headers: this.header }).map(
      res => res
    );
  }

  completeAnnotation(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/completeAnnotation?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  deleteAnnotation(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/deleteAnnotation?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getJSONFromDocument(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getJSONFromDocument?docId=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  addJSONDocument(formDetails) {
    const url = `${this.global.baseUrl}ContentService/addJSONDocument`;
    return this.http.post(url, formDetails, { headers: this.header }).map(res => res);
  }

  getFolder(folderId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/getFolder?id=${folderId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  updateFolderSecurity(folderObj) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/updateFolderSecurity`;
    return this.http.post(url, folderObj, { headers: this.header }).map(
      res => res
    );
  }

  setFolderPriority(folderId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/setFolderPriority?folderId=${folderId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  updateDocumentSecurity(documentObj) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/updateDocumentSecurity`;
    return this.http.post(url, documentObj, { headers: this.header }).map(
      res => res
    );
  }


  getDocumentPagePermission(docId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/setFolderPriority?id=${docId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  downloadSharedDocument(docId) {
    const url = `${this.global.baseUrl}ContentService/downloadSharedDocument?id=${docId}`;
    return url;
  }

  renameFolder(folderId, folderName) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.global.baseUrl}ContentService/renameFolder?folderid=${folderId}&name=${folderName}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getSearchPreviewPage(docId, pageNum, searchText) {
    const url = `${this.global.baseUrl}ContentService/getSearchPreviewPage?id=${docId}&page=${pageNum}&text=${searchText}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  downloadHLDocument(docId, pageNum, searchText) {
    const url = `${this.global.baseUrl}ContentService/downloadHLDocument?id=${docId}&text=${searchText}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getDocumentActions(id) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}ContentService/getDocumentActions?id=${id}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
  getDocumentHistory(documentId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}ContentService/getDocumentHistory?id=${documentId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }

  getDocumentLinks(documentId) {
    const sysDateTime = new Date();
    const fulldatetime = sysDateTime.getTime();
    const url = `${this.base_url}ContentService/getDocumentLinks?docid=${documentId}&sysdatetime=${fulldatetime}`;
    return this.http.get(url, { headers: this.header }).map(
      res => res
    );
  }
}
