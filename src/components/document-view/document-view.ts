import { Component, OnInit, Input, OnChanges, NgZone } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ModalController, PopoverController, ActionSheetController, Platform, Events } from 'ionic-angular';
import { ContentService } from '../../services/content.service';
import { ToastService } from '../../services/toast-service';
import { AddDocumentPage } from '../../pages/add-document/add-document';
import { PropertiesPage } from '../../pages/properties/properties';
import { FolderPermissionsPage } from '../../pages/folder-permissions/folder-permissions';
import { saveAs } from 'file-saver';
import { CheckinFilePage } from '../../pages/checkin-file/checkin-file';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../services/global.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the DocumentViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'document-view',
  templateUrl: 'document-view.html'
})
export class DocumentViewComponent implements OnInit, OnChanges {
  @Input() typeSearch;
  @Input() subDocumentList;
  public  folderResults: any;
  public animateItems = [];
  public animateClass: any;
  public repositories = [];
  public showAddFolder = false;
  public repoId: undefined;
  public folderId: undefined;
  public showRepository = true;
  public folderDocumentResult = [];
  public docId = undefined;
  public showFolderActions = false;
  public showDocumentActions = false;
  public showactionGrid = false;
  public checkedDocuments = [];
  public chedkedFolderId = undefined;
  public tieredItemsActions = [];
  public downloadDocList = [];
  public documentCheck;
  public propertyChecked;
  public isCheckIn;
  public isCheckOut;
  public documentId;
  public multiDownload = [];
  public repoName = '';
  public breadcrumbItems = [];
  public folderPath;
  public recentDocsList = [];
  public rtlSupport = 'ltr';
  private fileTransfer: FileTransferObject;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cs: ContentService,
    private menuCtrl: MenuController, private alertCtrl: AlertController,
    private tr: ToastService, private modalCtrl: ModalController,
    public popoverCtrl: PopoverController, private actionSheetCtrl: ActionSheetController,
    private zone: NgZone, private translate: TranslateService, private platform: Platform,
    public events: Events, private global: GlobalService, private transfer: FileTransfer, private file: File) {
  this.animateClass = { 'fade-in-left-item': true };
  this.menuCtrl.enable(true, 'myMenu');
if(localStorage.getItem('language') === 'ar') {
  this.rtlSupport = 'rtl';
} else {
  this.rtlSupport = 'ltr';
}
}

ionViewDidLoad() {
  // console.log('ionViewDidLoad DocumentPage');

}
ionViewWillEnter() {
  this.events.publish('hideHeader', { isHidden: false});
  this.apisResult();
}
ngOnInit() {
  // this.recentDocsList = [];
  if (this.typeSearch === 'genericSearch' || this.typeSearch === 'advancedSearch') {
    // this.recentDocsList = this.subDocumentList;
    // console.log(this.recentDocsList.length);
    // this.cs.searchDocuments(param).subscribe(data => {this.searchDocOutput(data); this.loading.hide(); }, error =>{this.loading.hide()});

  }else {
  this.cs.getAppRepository().subscribe(data => this.updateRepositoryValue(data));
  // this.cs.getTopFolders().subscribe(data => this.topFolders(data));
  }

}
ngOnChanges() {
  if (this.typeSearch === 'genericSearch' || this.typeSearch === 'advancedSearch') {
    this.recentDocsList = [];
      this.recentDocsList = this.subDocumentList;
      this.apisResult();


  }else {
  this.cs.getAppRepository().subscribe(data => this.updateRepositoryValue(data));
  this.apisResult();
  // this.cs.getTopFolders().subscribe(data => this.topFolders(data));
  }
}
  searchDocOutput(data) {

  }


getPathFolder(data) {
  if (data._body !== undefined) {
    let docIdByPath = JSON.parse(data._body);
    this.folderId = docIdByPath.id;
    // this.router.navigate(['/folderview'], { queryParams:
    //   { 'repoName': this.repoName , 'repoId': this.repoId , 'folderId': docIdByPath.id }});
    this.apisResult();

   }
}
getFolderPath(data) {
  this.folderPath = JSON.parse(data._body);
  this.breadcrumbItems = [];
  this.breadcrumbItems.push({label: this.repoName, command: (event) => {this.breadCrumbClicked(event); }, title: 'repo' , id: this.repoId });
  let path = this.folderPath.path;
  if (path !== undefined) {
    let pathArray = path.split('/');
    for (let index = 0; index < pathArray.length; index++) {
      if ( pathArray[index] !== '') {
        this.breadcrumbItems.push({label: pathArray[index], command: (event) => {this.getDocIdByPath(event); }});
      }
    }
    this.folderId = this.folderPath.id;
    this.showAddFolder = true;
    this.apisResult();
    // console.log(this.breadcrumbItems);
  }else {
    this.breadcrumbItems.push({label: ''});
  }
}
getDocIdByPath(event) {
  let pathString = '';
  for (let index = 0; index < this.breadcrumbItems.length; index++) {
    if (event.label === this.breadcrumbItems[index].label) {
      break;
    }
    pathString = pathString + this.breadcrumbItems[index + 1].label + '/';
  }
  if (pathString !== '' ) {
    this.cs.getFolder(encodeURI(pathString)).subscribe(data => this.getPathFolder(data));

  }
   }
updateRepositoryValue(data) {
  this.repositories = [];
  this.repositories.push(JSON.parse(data._body));
}
topFolders(data) {
//  console.log(JSON.parse(data._body));
this.showRepository = false;
this.showAddFolder = false;
this.folderResults = [];
this.folderResults = JSON.parse(data._body);
}
itemClicked(item) {
  this.folderId = item.id;
  this.showRepository = false;
  this.showAddFolder = true;
  this.checkedDocuments = [];
  this.showactionGrid = false;
  this.tieredItemsActions = [];
  this.downloadDocList = [];
 // this.apisResult();
 this.cs.getFolder(this.folderId).subscribe(data => this.getFolderPath(data));

}
apisResult() {
  this.checkedDocuments = [];
  this.tieredItemsActions = [];
  this.showactionGrid = false;
  this.downloadDocList = [];
  if (this.typeSearch === 'genericSearch' || this.typeSearch === 'advancedSearch') {
    this.recentDocsList = [];
    this.recentDocsList = this.subDocumentList;
  }else {
  if (this.repoId === undefined && this.folderId === undefined ) {
    this.cs.getRecent(2).subscribe(data => this.getRecentDocuments(data) );
    } else if (this.repoId !==  undefined && this.folderId === undefined) {
      this.cs.getTopFolders().subscribe(folderdata => this.topFolders(folderdata) );
    } else if (this.repoId !==  undefined && this.folderId !== undefined) {
      this.cs.getSubfolders(this.folderId).subscribe(data => this.subFolders(data) );
      this.cs.getFolderDocuments(this.folderId).subscribe(data => this.folderDocuments(data) );
    } else {

    }
  }
}
doRefresh(event) {
  // this.showRepository = true;
  // this.showAddFolder = false;
  // this.checkedDocuments = [];
  this.apisResult();
  setTimeout(() => {
   event.complete();
  }, 100);
  // this.folderId = undefined;
  // this.repoId = undefined;
  //  this.cs.getAppRepository().subscribe(data => {this.updateRepositoryValue(data), event.complete();}, error => {event.complete();});
}
documentPropertyTab(doc) {

}
subFolders(data) {
  this.folderResults = [];
this.folderResults = JSON.parse(data._body);
}
// showActions() {
//   const actionSheet = this.actionSheetCtrl.create({
//     buttons: [
//       {
//         text: 'New Folder',
//         role: 'destructive',
//         handler: () => {
//           console.log('New folder clicked');
//         }
//       },
//       {
//         text: 'New Document',
//         role: 'destructive',
//         handler: () => {
//           console.log('New Document clicked');
//         }
//       },
//     ]
//   });
//   actionSheet.present();
// }
addNewFolder(fab) {
  fab.close();
  const prompt = this.alertCtrl.create({
    title: this.translate.instant('Add New Folder'),
    inputs: [
      {
        name: 'folderName',
        placeholder: this.translate.instant('Enter Folder Name'),
        id: 'addnew'
      },
    ],
    buttons: [
      {
        text: this.translate.instant('Cancel'),
        handler: data => {
          data.folderName = '';
        }
      },
      {
        text: this.translate.instant('Save'),
        handler: data => {
          // console.log('Saved clicked'+ data.folderName);
          this.saveFolder(data);
        }
      }
    ]
  });
  prompt.present();
}
saveFolder(data) {
  let folder = data.folderName;
  if (data.folderName !== '') {
    if (this.folderId  !== undefined) {
      this.cs.createSubfolder( data.folderName , this.folderId ).subscribe( data => this.refreshComponent(data, folder));
    }else {
      this.cs.createSubfolder( data.folderName , this.repoId ).subscribe( data => this.refreshComponent(data, folder));
    }
  }else {
     this.tr.presentToast(this.translate.instant('Folder name can not be empty'));

  }
}
refreshComponent(data, folder) {
  this.tr.presentToast(folder + ' ' + this.translate.instant('Folder Added'));
this.apisResult();
}
addNewdocument(fab) {
  let profileModal = this.modalCtrl.create(AddDocumentPage, { folderId: this.folderId, repoId: this.repoId });
  profileModal.onDidDismiss(data => {
    // if(data === 'added') {
      this.apisResult();
    // }
  });
  profileModal.present();
  fab.close();
}
openFolders(item) {
  this.repoId = item.id;
  this.folderId = undefined;
  this.repoName = item.name;
  this.folderDocumentResult = [];
  this.cs.getTopFolders().subscribe(folderdata => this.topFolders(folderdata) );
  this.breadcrumbItems = [];
  this.breadcrumbItems.push({label: this.repoName, command: (event) => {this.breadCrumbClicked(event); }, title: 'repo' , repoId: this.repoId, folderId:  undefined});
}
folderDocuments(data) {
  this.folderDocumentResult = [];
  this.folderDocumentResult = JSON.parse(data._body);

}
getRecentDocuments(data) {

}
showProperties(item) {
this.docId = item.id;
this.navCtrl.push(PropertiesPage, {docId: this.docId, folderId: this.folderId, repoId: this.repoId, callback: this.myCallbackFunction});
}
myCallbackFunction(_params, params1) {
  return new Promise((resolve, reject) => {
  });
 }
checkboxClicked(event, folder) {
    if(event.checked === true) {
      // this.folderId = folder.id;
      this.checkedDocuments.push(folder);
    }else {
       this.folderId = undefined;
      for (let index = 0; index < this.checkedDocuments.length; index++) {
        if (this.checkedDocuments[index].id === folder.id) {
          this.checkedDocuments.splice(index, 1);
        }
       }
    }
    if (this.checkedDocuments.length === 1 || this.tieredItemsActions.length > 0) {
this.showactionGrid = true;
this.chedkedFolderId = this.checkedDocuments[0].id;
    } else {
      if(this.showDocumentActions === false) {
        this.showactionGrid = false;
      }
    }

}
docCheckboxClicked(event, docs) {
  this.tieredItemsActions = undefined;
  this.tieredItemsActions = [];
  const val = {
    docId: docs.id,
    name: docs.props['0'].mvalues['0'],
    format: docs.format,
    isReserved: docs.isReserved
  };
  if (event.checked) {
    this.downloadDocList.push(val);
   if ( this.downloadDocList.length > 0) {
    this.documentCheck = true;
   }
// property
if (this.downloadDocList.length > 1) {
this.propertyChecked = true;
}else {
this.propertyChecked = false;
}
 let count1 = 0;
 let count2 = 0;
    for (let i = 0 ; i <  this.downloadDocList.length ; i++) {
      if (this.downloadDocList[i].isReserved === true) {
       count1++;
      }else {
        count2++;
      }
    }
    if (count1 > 0 && count2 > 0) {
      this.isCheckIn = false;
      this.isCheckOut = false;
    }else if (count1 > 0 && count2 === 0) {
      this.isCheckIn = true;
      this.isCheckOut = false;
    }else if (count1 === 0 && count2 > 0) {
      this.isCheckOut = true;
      this.isCheckIn = false;
    } else {
    }
  } else {
   for (let i = 0 ; i < this.downloadDocList.length ; i++) {
    if (this.downloadDocList[i].docId === docs.id) {
      this.downloadDocList.splice(i , 1);
    }
   }
    if ( this.downloadDocList.length > 0) {
      this.documentCheck = true;
     }else {
      this.documentCheck = false;
     }
    // property
         if (this.downloadDocList.length > 1) {
          this.propertyChecked = true;
        }else {
          this.propertyChecked = false;
        }
       let count1 = 0;
       let count2 = 0;
          for (let i = 0 ; i <  this.downloadDocList.length ; i++) {
            if (this.downloadDocList[i].isReserved === true) {
             count1++;
            }else {
              count2++;
            }
          }
          if (count1 > 0 && count2 > 0) {
            this.isCheckIn = false;
            this.isCheckOut = false;
          }else if (count1 > 0 && count2 === 0) {
            this.isCheckIn = true;
            this.isCheckOut = false;
          }else if (count1 === 0 && count2 > 0) {
            this.isCheckOut = true;
            this.isCheckIn = false;
          }else {
          }
        }
        // this.fileList.emit(this.downloadDocList);

    if (this.documentCheck) {
      this.tieredItemsActions.push(
      {
        text: this.translate.instant('Download'),
        icon: 'download',
        handler: () => {
          this.downloadDocuments();
        }
      },
      );

      if (this.isCheckOut) {
        this.tieredItemsActions.push({
          text: this.translate.instant('Check-out'),
          icon: 'lock',
          handler: () => {this.checkOutDocument(); }
      });
    }
      if (this.isCheckIn && !this.propertyChecked) {
        this.tieredItemsActions.push({
          text: this.translate.instant('Check-in'),
          icon: 'unlock',
          handler: () => {
            // this.checkInMultiple(); this.checkInModel = true;
            setTimeout(() => {
              this.checkInFile(docs);
            }, 100);

          }
      });
      this.tieredItemsActions.push({
        text: this.translate.instant('Cancel checkout'),
        icon: 'close',
        handler: () => {
          let alert = this.alertCtrl.create({
            title: this.translate.instant('Confirm Cancel Checkout'),
            message: this.translate.instant('Are you sure to cancel checkout?'),
            buttons: [
              {
                text: this.translate.instant('Cancel'),
                role: 'cancel',
                handler: () => {
                }
              },
              {
                text: this.translate.instant('Ok'),
                handler: () => {
                  this.cancelCheckOut();
                }
              }
            ]
          });
          alert.present();
         }
    });
  }
    }
    if(this.tieredItemsActions.length > 0 || this.checkedDocuments.length === 1) {
      this.showactionGrid = true;
    }else {
      this.showactionGrid = false;
    }
}
folderActions() {
  const actionSheet = this.actionSheetCtrl.create({
    buttons: [ {
      text: this.translate.instant('Rename Folder'),
      role: 'destructive',
      icon: 'create',
      handler: () => {
        this.renameFolder();
      }
    },
    {
      text: this.translate.instant('Folder Permission'),
      icon: 'key',
      handler: () => {
        setTimeout(() => {
          this.showfolderPermissions();
        }, 0);
      }
    },]
  });
  actionSheet.present();
}
showfolderPermissions() {
  let folderpermissionsok = this.modalCtrl.create(FolderPermissionsPage, { folderId: this.chedkedFolderId, repoId: this.repoId });
  folderpermissionsok.present();
  folderpermissionsok.onDidDismiss(data => {
    if(data === 'added') {
      this.apisResult();
    }
  });
}
fileActions() {
  const actionSheet1 = this.actionSheetCtrl.create({
    buttons: this.tieredItemsActions
  });
  actionSheet1.present();
}
renameFolder() {
  const prompt = this.alertCtrl.create({
    title: this.translate.instant('Rename Folder'),
    inputs: [
      {
        name: 'folderName',
        placeholder: this.translate.instant('Enter Folder Name'),
        value: this.checkedDocuments[0].name
      },
    ],
    buttons: [
      {
        text: this.translate.instant('Cancel'),
        handler: data => {
          data.folderName = '';
        }
      },
      {
        text: this.translate.instant('Save'),
        handler: data => {
          // console.log('Saved clicked'+ data.folderName);
          if(data.folderName !== '') {
          this.cs.renameFolder(this.checkedDocuments[0].id, data.folderName).subscribe(data => {data; this.tr.presentToast(this.translate.instant('Rename Success'));this.checkedDocuments = [];this.apisResult();});
          } else {
            this.tr.presentToast(this.translate.instant('Folder name can not be empty'));
          }
        }
      }
    ]
  });
  prompt.present();
}
downloadDocuments() {
  this.multiDownload = [];
  const filename = '';
  if (this.downloadDocList.length > 1) {
    for (let i = 0 ; i < this.downloadDocList.length ; i++) {
      this.multiDownload.push(this.downloadDocList[i].docId);
    }
   this.cs.downloadMultipleDocuments(this.multiDownload).subscribe(data => this.saveToFileSystem(data) );
   // this.saveFile(this.cs.downloadMultipleDocuments());
  }else if (this.downloadDocList.length === 1) {
    console.log(this.downloadDocList[0]);
     this.cs.downloadDocument(this.downloadDocList[0].docId, this.downloadDocList[0].name);
//     const sysDateTime = new Date();
//   const fulldatetime = sysDateTime.getTime();
//   this.fileTransfer = this.transfer.create();
//   const url = `${this.global.baseUrl}ContentService/downloadThisDocument?id=${this.downloadDocList[0].docId}&sysdatetime=${fulldatetime}`;
//   // return url;
//   // return this.http.get(url, {responseType: ResponseContentType.Blob, headers: this.header}).map(
//   //   res => res
//   // );
//   this.platform.ready().then((readySource) => {
//   this.fileTransfer.download(url, this.file.externalRootDirectory, false).then((entry) => {
//     //here logging our success downloaded file path in mobile.
//     console.log('download completed: ' + entry.toURL());
//     this.tr.presentToast(this.translate.instant('Download is success'));
// }, (error) => {
//     //here logging our error its easier to find out what type of error occured.
//     console.log(error);
//     this.tr.presentToast(this.translate.instant('Failed to download'));
// });
//   });
     }
}
downloadCurrentDocument(data) {
  let filename = '';
    const disposition = data.headers.get('Content-Disposition');
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
      saveAs(data._body, filename);
}
private saveToFileSystem(response) {
  const parts = 'zipFile';
  const filename = parts;
  const blob = new Blob([response._body] , { type: 'application/zip' } );
   saveAs(blob, filename);
}
checkOutDocument() {
  for (let index = 0; index < this.downloadDocList.length; index++) {
    this.cs.checkOut(this.downloadDocList[index].docId).subscribe(data => this.checkingOut(this.downloadDocList[index].docId));
  }
}
checkingOut(data) {
this.apisResult();
}
cancelCheckOut() {
this.downloadDocList.forEach(element => {
  this.cs.cancelCheckOut(element.docId).subscribe(data => this.getCancelCheckOut(data) );
});
}

getCancelCheckOut(data) {
this.apisResult();
this.tr.presentToast(this.translate.instant('Cancelled document checkout'));
}
checkInFile(data) {
let checkInModal = this.modalCtrl.create(CheckinFilePage, { documentId: data.id, repoId: this.repoId });
checkInModal.onDidDismiss(data => {
  if(data === 'added') {
    this.apisResult();
  }
});
checkInModal.present();
}
clicked() {
// this.apisResult();
}
breadCrumbClicked(event) {
// console.log(event);
if (event.title === 'repo') {
this.openFolders(event);
this.breadcrumbItems = [];
this.repoName = event.label;
  this.breadcrumbItems.push({label: this.repoName, command: (event) => {this.breadCrumbClicked(event); }, title: 'repo' , repoId: this.repoId, folderId:  undefined  });
}else {
let pathString = '';
for (let index = 0; index < this.breadcrumbItems.length; index++) {
  if (event.label === this.breadcrumbItems[index].label) {
    break;
  }
  pathString = pathString + this.breadcrumbItems[index + 1].label + '/';
}
if (pathString !== '' ) {
  this.cs.getFolder(encodeURI(pathString)).subscribe(data => this.getFolderPath(data));
}
this.folderId = event.folderId;
this.folderDocumentResult = [];
this.apisResult();
}
}
}


