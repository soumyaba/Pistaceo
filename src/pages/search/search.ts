import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { SchemaService } from '../../services/schema.service';
import { ContentService } from '../../services/content.service';
import { WorkService } from '../../services/work.service';
import { LoadingService } from '../../services/loading-service';
import { ShowAttachmentPage } from '../show-attachment/show-attachment';
import { ActivityPage } from '../activity/activity';
import { CheckinFilePage } from '../checkin-file/checkin-file';
import { ToastService } from '../../services/toast-service';
import { PropertiesPage } from '../properties/properties';
import { SearchWordViewPage } from '../search-word-view/search-word-view';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit {
  public labelToggle = 'Document';
  public searchValue = '';
  public sec: string = 'first';
  public genericSearchValue = 'genericSearch';
  public listOfTaskActivities = [];
  public animateClass: any;
  public maxDist;
  public dataSearchOutput = [];
  public tieredItemsActions = [];
  public downloadDocList = []
  public documentCheck;
  public propertyChecked;
  public isCheckIn;
  public isCheckOut;
  public showactionGrid = false;
  public checkedDocuments = [];
  public docId;
  public workSearch = true;
  public documentSearch = true;
  public workTypeDropdown = [];
  public workTypeSearch: FormGroup;
  public workTypeProps;
  public workTypeSearchResult = [];
  public documentForm: FormGroup;
  public documentClass: any;
  public documentClassDropdown = [];
  public documentClassProp: any;
  public documentClassDropdownSelected;
  public searchedDocument = [];
  public showRepository = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ss: SchemaService,
    private cs: ContentService, private ws: WorkService, private platform: Platform,
    private loading: LoadingService, private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController, private tr: ToastService, private alertCtrl: AlertController, private fb: FormBuilder, private translate: TranslateService) {
    this.animateClass = { 'fade-in-left-item': true };
    platform.ready().then((readySource) => {
      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
      this.maxDist = platform.height() * 0.75;
    });
  }
  ngOnInit() {
    this.workTypeSearch = this.fb.group({
      workTypeName: []
    });
    // if (this.labelToggle === 'Workflow') {
    this.ss.getWorkTypes().subscribe(data => this.workTypesRes(data));
    // }else {
    // this.cs.getDocumentClasses().subscribe(data => this.documentClasses(data));
    // }
    this.documentForm = this.fb.group({
      documentClass: [null],
      documentname: [''],
      documentid: []
    });
    this.cs.getDocumentClasses().subscribe(data => this.documentClasses(data));
  }
  documentClasses(data) {
    this.documentClass = [];
    this.documentClassProp = [];
    if (data._body !== '') {
      this.documentClass = JSON.parse(data._body);
      this.documentClassDropdownSelected = this.documentClass[0].symName;
      for (let index = 0; index < this.documentClass.length; index++) {
        this.documentClassDropdown.push({ label: this.documentClass[index].name, value: this.documentClass[index].symName, id: this.documentClass[index].id });
      }
      this.documentForm.patchValue({
        documentname: this.documentClass[0].symName,
        documentid: this.documentClass[0].id
      });
      this.documentClassProp = this.documentClass[0].props;
    }
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchPage');
  }
  workTypesRes(data) {
    this.workTypeDropdown = [];
    if (data !== '' || data !== undefined) {
      this.workTypeDropdown = JSON.parse(data._body);
      this.workTypeSearch.patchValue({ workTypeName: this.workTypeDropdown[0].id });
      this.ss.getWorkTypeSearch(this.workTypeDropdown[0].id).subscribe(datares => this.workTypeProp(datares));
    }
  }
  workTypeProp(data) {
    if (data !== '' || data !== undefined) {
      let value = JSON.parse(data._body);
      // console.log(value);
      for (let i = 0; i < value.properties.length; i++) {
        const control: FormControl = new FormControl(null);
        this.workTypeSearch.addControl(value.properties[i].symName, control);
      }
      this.workTypeProps = value.properties;
    }
  }
  toggle(event) {
    // console.log(event.checked);
    if (event.checked === true) {
      this.labelToggle = 'Document';
      if (this.sec === 'first' && this.searchValue !== '') {
        this.contentSearch();
      }
    } else {
      this.labelToggle = 'Workflow';
      if (this.sec === 'first' && this.searchValue !== '') {
        this.contentSearch();
      }
    }
  }
  changedSeg(sec) {
    // console.log(sec);
  }
  search(event) {
    this.searchValue = event.target.value;
    // console.log(this.searchValue);
  }
  contentSearch() {
    if (this.labelToggle === 'Document') {
      const param = {
        'contentSearch': { 'name': 'Content', 'symName': 'CONTENT', 'dtype': 'STRING', 'mvalues': [this.searchValue], 'oper': 'Contains' },
      };
      this.genericSearchValue = 'genericSearch';
      this.loading.show();
      this.cs.searchDocuments(param).subscribe(data => { this.searchDocOutput(data); this.loading.hide(); }, error => { this.loading.hide() });
    } else {
      this.ss.getWorkTypeSearch(0).subscribe(data => this.contentSerchResult(data));
    }

  }
  searchDocOutput(data) {
    this.tieredItemsActions = [];
    this.showactionGrid = false;
    this.dataSearchOutput = [];
    this.dataSearchOutput = data;
    setTimeout(() => {
      this.findOver('overflowdocument');
    }, 100);
  }
  contentSerchResult(data) {
    if (data !== '' || data !== undefined) {
      this.loading.show();
      const value = JSON.parse(data._body);
      value.properties[0].mvalues.push(this.searchValue);
      this.ws.searchWork(value).subscribe(res => this.worktypeResult(res), error => { this.loading.hide() });
    }
  }
  worktypeResult(data) {
    this.loading.hide();
    this.listOfTaskActivities = [];
    if (data.length > 0) {
      this.listOfTaskActivities = data;
      setTimeout(() => {
        this.findOver('overflow');
      }, 100);
    }
  }
  advancedSearch() {

  }
  findOver(overflowdocument) {
    // console.log(this.maxDist);
    document.getElementById(overflowdocument).style.maxHeight = this.maxDist + 'px';
    document.getElementById(overflowdocument).style.overflowY = 'auto';
    document.getElementById(overflowdocument).style.overflowX = 'hidden';
  }
  download(value) {
    this.cs.downloadDocument(value.docId, value.docTitle);
  }
  showAttachments(value) {
    this.ws.getWorkAttachments(value.id).subscribe(data => this.showattachments(data));
  }
  showattachments(data) {
    //  console.log(data);
    if (data !== undefined) {
      let attachmentres = JSON.parse(data._body);
      let profileModal = this.modalCtrl.create(ShowAttachmentPage, { data });
      profileModal.onDidDismiss(data => {
        if (data === 'added') {
          // this.apisResult();
        }
      });
      profileModal.present();
    }
  }
  goToActivity(value) {
    this.ws.getWorkActivity(value.id).subscribe(data => { this.goToActivityPage(data); });
  }

  goToActivityPage(data) {
    const value = JSON.parse(data._body);
    this.navCtrl.push(ActivityPage, {
      firstParameter: value,
      readWrite: 'readOnly',
      taskfrom: 'Search'
    });
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
      if (this.downloadDocList.length > 0) {
        this.documentCheck = true;
      }
      // property
      if (this.downloadDocList.length > 1) {
        this.propertyChecked = true;
      } else {
        this.propertyChecked = false;
      }
      let count1 = 0;
      let count2 = 0;
      for (let i = 0; i < this.downloadDocList.length; i++) {
        if (this.downloadDocList[i].isReserved === true) {
          count1++;
        } else {
          count2++;
        }
      }
      if (count1 > 0 && count2 > 0) {
        this.isCheckIn = false;
        this.isCheckOut = false;
      } else if (count1 > 0 && count2 === 0) {
        this.isCheckIn = true;
        this.isCheckOut = false;
      } else if (count1 === 0 && count2 > 0) {
        this.isCheckOut = true;
        this.isCheckIn = false;
      } else {
      }
    } else {
      for (let i = 0; i < this.downloadDocList.length; i++) {
        if (this.downloadDocList[i].docId === docs.id) {
          this.downloadDocList.splice(i, 1);
        }
      }
      if (this.downloadDocList.length > 0) {
        this.documentCheck = true;
      } else {
        this.documentCheck = false;
      }
      // property
      if (this.downloadDocList.length > 1) {
        this.propertyChecked = true;
      } else {
        this.propertyChecked = false;
      }
      let count1 = 0;
      let count2 = 0;
      for (let i = 0; i < this.downloadDocList.length; i++) {
        if (this.downloadDocList[i].isReserved === true) {
          count1++;
        } else {
          count2++;
        }
      }
      if (count1 > 0 && count2 > 0) {
        this.isCheckIn = false;
        this.isCheckOut = false;
      } else if (count1 > 0 && count2 === 0) {
        this.isCheckIn = true;
        this.isCheckOut = false;
      } else if (count1 === 0 && count2 > 0) {
        this.isCheckOut = true;
        this.isCheckIn = false;
      } else {
      }
    }
    // this.fileList.emit(this.downloadDocList);

    if (this.documentCheck) {
      this.tieredItemsActions.push(
        {
          text: 'Download',
          icon: 'download',
          handler: () => {
            this.downloadDocuments();
          }
        },
      );

      if (this.isCheckOut) {
        this.tieredItemsActions.push({
          text: 'Check-out',
          icon: 'lock',
          handler: () => { this.checkOutDocument(); }
        });
      }
      if (this.isCheckIn && !this.propertyChecked) {
        this.tieredItemsActions.push({
          text: 'Check-in',
          icon: 'unlock',
          handler: () => {
            // this.checkInMultiple(); this.checkInModel = true;
            setTimeout(() => {
              this.checkInFile(docs);
            }, 100);

          }
        });
        this.tieredItemsActions.push({
          text: 'Cancel checkout',
          icon: 'close',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Confirm Cancel Checkout',
              message: 'Are you sure to cancel checkout?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                  }
                },
                {
                  text: 'Ok',
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
    if (this.tieredItemsActions.length > 0) {
      this.showactionGrid = true;
    } else {
      this.showactionGrid = false;
    }
  }
  fileActions() {
    const actionSheet1 = this.actionSheetCtrl.create({
      buttons: this.tieredItemsActions
    });
    actionSheet1.present();
  }
  downloadDocuments() {

  }
  checkOutDocument() {
    for (let index = 0; index < this.downloadDocList.length; index++) {
      this.cs.checkOut(this.downloadDocList[index].docId).subscribe(data => this.checkingOut(this.downloadDocList[index].docId));
    }
  }
  checkingOut(id) {
    this.showactionGrid = false;
    const param = {
      'contentSearch': { 'name': 'Content', 'symName': 'CONTENT', 'dtype': 'STRING', 'mvalues': [this.searchValue], 'oper': 'Contains' },
    };
    this.cs.searchDocuments(param).subscribe(data => { this.searchDocOutput(data); }, error => { });

  }
  cancelCheckOut() {
    this.downloadDocList.forEach(element => {
      this.cs.cancelCheckOut(element.docId).subscribe(data => this.getCancelCheckOut(data));
    });
  }

  getCancelCheckOut(data) {
    // this.apisresult()
    this.showactionGrid = false;
    const param = {
      'contentSearch': { 'name': 'Content', 'symName': 'CONTENT', 'dtype': 'STRING', 'mvalues': [this.searchValue], 'oper': 'Contains' },
    };
    this.cs.searchDocuments(param).subscribe(data => { this.searchDocOutput(data); }, error => { });
    this.tr.presentToast(this.translate.instant('Cancelled document checkout'));
  }
  checkInFile(data) {
    let checkInModal = this.modalCtrl.create(CheckinFilePage, { documentId: data.id, repoId: undefined });
    checkInModal.onDidDismiss(data => {
      if (data === 'added') {
        // this.apisResult();
        if (this.sec === 'first') {
          this.contentSearch();
        }
      }
    });
    checkInModal.present();
  }
  showProperties(item) {
    this.docId = item.id;
    this.navCtrl.push(PropertiesPage, { docId: this.docId, folderId: undefined, repoId: undefined, callback: this.myCallbackFunction });
  }
  myCallbackFunction(_params, params1) {
    return new Promise((resolve, reject) => {
    });
  }
  searchPreviewPage(itemdocs, i) {
    this.navCtrl.push(SearchWordViewPage, { id: itemdocs, searchValue: this.searchValue });
  }
  workTypeClassChanged(event) {
    // console.log(event);
    // this.workTypeSearch.reset();
    this.workTypeSearch.patchValue({ workTypeName: event });
    this.ss.getWorkTypeSearch(event).subscribe(data => this.workTypeProp(data));
  }
  workTypeSubmit(event) {
    let name = '';
    let symName = '';
    for (const selectField of [].slice.call(event.target.getElementsByTagName('ion-select'))) {
      if (selectField.id !== undefined && selectField.id === 'docClass') {
        symName = selectField.textContent;
        name = selectField.textContent;
      }
    }

    const search = {
      'type': this.workTypeSearch.controls.workTypeName.value, 'properties': [],
      //  'contentSearch': {'name': 'Content', 'symName': 'CONTENT', 'dtype': 'STRING', 'mvalues': [], 'oper': ''}
    };
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const docClass of this.workTypeDropdown) {
          for (const prop of this.workTypeProps) {
            if (symName === docClass.name) {
              if (inputField.id !== undefined && inputField.id === prop.symName) {
                const property = { 'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.childNodes[1].value], 'oper': this.workTypeSearch.controls.workTypeName.value };
                search.properties.push(property);
              }
            }
          }
        }
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-datetime'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const docClass of this.workTypeDropdown) {
          for (const datepick of this.workTypeProps) {
            if (symName === docClass.name) {
              if (inputField.id !== undefined && inputField.id === datepick.symName) {
                const property = {
                  'symName': datepick.symName, 'dtype': datepick.dtype,
                  'mvalues': [inputField.textContent], 'oper': this.workTypeSearch.controls.workTypeName.value,
                  len: datepick.len, rOnly: datepick.rOnly, hidden: datepick.hidden, req: datepick.req, ltype: datepick.ltype
                };
                search.properties.push(property);
              }
            }
          }
        }
      }
    }
    this.workTypeSearchResult = [];
    this.loading.show();
    this.ws.searchWork(search).subscribe(data => { this.getSearchWork(data); this.loading.hide(); }, error => { this.loading.hide() });
    this.workSearch = false;
  }
  getSearchWork(data) {
    if (data !== undefined) {
      this.workTypeSearchResult = data;
      if (data.length > 0) {
        setTimeout(() => {
          this.findOver('worksearchoverflow');
        }, 100);
      }
    }
  }
  Clear() {
    // this.workTypeSearch.reset();
    this.workTypeSearch.patchValue({ workTypeName: this.workTypeDropdown[0].id });
    this.workTypeSearchResult = [];
  }
  documentSearchSubmit(event) {
    let name = this.documentForm.controls.documentname.value;
    let symName = this.documentForm.controls.documentname.value;
    // for (const selectField of [].slice.call(event.target.getElementsByTagName('select'))) {
    //   if (selectField.id !== undefined && selectField.id === 'docClass') {
    //     symName = selectField.options[selectField.options.selectedIndex].text;
    //     name = selectField.options[selectField.options.selectedIndex].value;
    //   }
    // }
    for (let index = 0; index < this.documentClassDropdown.length; index++) {
      if (this.documentClassDropdown[index].value === this.documentClassDropdownSelected) {
        name = this.documentClassDropdown[index].label;
        break;
      }
    }

    for (const docClass of this.documentClass) {
      for (const prop of docClass.props) {
        if (symName === docClass.name) {
          symName = docClass.symName;
        }
      }
    }

    const search = {
      'name': name, 'symName': symName, 'type': 'DOCUMENT', 'props': [],
      'contentSearch': { 'name': 'Content', 'symName': 'CONTENT', 'dtype': 'STRING', 'mvalues': [], 'oper': '' }
    };
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const docClass of this.documentClass) {
          for (const prop of docClass.props) {
            if (symName === docClass.symName) {
              if (inputField.id !== undefined && inputField.id === prop.symName) {
                const property = { 'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.childNodes[1].value] };
                search.props.push(property);
              }
            }
          }
        }
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-select'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const docClass of this.documentClass) {
          for (const prop of docClass.props) {
            if (symName === docClass.symName) {
              if (inputField.id !== undefined && inputField.id === prop.symName) {
                let property;
                if (inputField.textContent === 'Select') {
                  property = { 'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [''] };
                } else {
                  property = { 'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.textContent] };
                }
                search.props.push(property);
              }
            }
          }
        }
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-datetime'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const docClass of this.documentClass) {
          for (const datepick of docClass.props) {
            if (symName === docClass.symName) {
              if (inputField.id !== undefined && inputField.id === datepick.symName) {
                const property = {
                  'symName': datepick.symName, 'dtype': datepick.dtype,
                  'mvalues': [inputField.textContent],
                  len: datepick.len, rOnly: datepick.rOnly, hidden: datepick.hidden, req: datepick.req, ltype: datepick.ltype
                };
                search.props.push(property);
              }
            }
          }
        }
      }
    }

    this.searchedDocument = [];
    console.log(search);
    //  this.search = search;
    this.loading.show();
    this.cs.searchDocuments(search).subscribe(data => { this.getsearchedDocuments(data); this.loading.hide(); }, error => { this.loading.hide() });
    this.documentSearch = false;
  }

  getsearchedDocuments(data) {
    this.searchedDocument = [];
    if (data) {
      this.searchedDocument = data;
      setTimeout(() => {
        this.findOver('overflowdocumentSearch');
      }, 0);
    }
  }
  documentClassChange(event) {
    for (const prop of this.documentClass) {
      if (prop.symName === this.documentClassDropdownSelected) {
        this.documentClassProp = prop.props;
      }
    }
  }
  clearDocumentSearch() {
    this.documentClassDropdownSelected = this.documentClass[0].symName;
    this.documentForm.patchValue({ documentname: this.documentClass[0].symName, documentid: this.documentClass[0].id });
    this.documentClassProp = this.documentClass[0].props;
  }
}
