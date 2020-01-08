import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, DateTime, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SchemaService } from '../../services/schema.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { IntegrationService } from '../../services/integration.service';
import { UserService } from '../../services/user.service';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { ToastService } from '../../services/toast-service';
import { LoadingService } from '../../services/loading-service';
import { WorkService } from '../../services/work.service';
import { ActivityPage } from '../activity/activity';
import { SentPage } from '../sent/sent';
import { DummyTable } from '../../app/models/dummy-table.model';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  @Input() readOnly;
  public id: any;
  public initActivityType: any;
  public multiFormSupport: any;
  public subjectProps: any;
  public form: FormGroup;
  public dynamicform: FormGroup;
  public selectedTempId;
  public name: any;
  public activitytype: any;
  public uploader;
  public showDoc = false;
  // public globelFileUploder = new FileUploader({});
  public selectedObject;
  public duplicateActivity;
  // popupOptions: NgbModalOptions = {
  //   size: 'lg'
  // };
  public closeResult;
  public documentsSelected = [];
  public tempAttachments = [];
  public formData;
  public title: 'ScanedImage';
  public workid: any;
  public createformtabshow = false;
  public activeIdString: any;
  public createformtitle: any;
  public formObject;
  public tempTemplateId;
  public showDocumentsTick = false;
  public websocketNotOpen = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  //  hashTwainModel: NgbModal;
  public formarray = [];
  public showform = false;
  public showcreate = false;
  public increament = 0;
  // public sub = new Subscription();
  public createis = false;
  public singleSelectDropdown;
  public multipleSelectDropdown;
  public singleSelectDropdownTA;
  public itemList;
  public formObjectSubmit = [];
  public addarray = [];
  public showaddlabel: any;
  public tempid = 1;
  public temptask = [];
  public checkouid = 0;
  public fileNameList = [];
  public nextScreen: any;
  public attachDocNonMandetory = false;
  tabs: Array<boolean> = new Array<boolean>(false, false);
  public lookupOptions = [];
  public selectedTab: any;
  public toldisable = false;
  public datePicker: any;
  public generic = false;
  public showSegments = 'showForm'; //showcreate
  public rtlSupport = 'ltr';
  public singleSelect = false;
  public STEXTSearch = [];
  public routeTodata = [];
  public multipleSelect = true;
  public documentAdd: FormGroup;
  public submitButton = false;
  public ddmmyy = true;
  public tableRowValue = 0;
  public type: any;
  // public tempFileobject = new FileUploader({});
  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService,
    private menuCtrl: MenuController, private ss: SchemaService, private fb: FormBuilder, private ds: DocumentService,
    private integrationservice: IntegrationService, private us: UserService, private tr: ToastService,
    private loading: LoadingService, private ws: WorkService, public events: Events) {
    this.menuCtrl.enable(true, 'myMenu');
    this.id = navParams.get('id');
    this.initActivityType = navParams.get('initActivityType');
    this.multiFormSupport = navParams.get('multiFormSupport');
    this.subjectProps = navParams.get('subjectProps');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreatePage');

  }

  ngOnInit() {
    this.showform = false;
    this.showSegments = 'showForm';
    // console.log('id' + this.id + 'initactivittytype' + this.initActivityType + 'multiformsupport' + this.multiFormSupport + 'subjectprops' + this.subjectProps);
    this.ss.getActivityTypeFromID(this.initActivityType).subscribe(data => { this.activityType(data); }); if (localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
    } else {
      this.rtlSupport = 'ltr';
    }
    this.form = this.fb.group({
      subject: [null, Validators.compose([Validators.required])]
    });
    this.dynamicform = this.fb.group({});
    this.documentAdd = this.fb.group({});
    this.showaddlabel = this.multiFormSupport;
    this.formarray = [];
    this.showform = false;
    this.showSegments = 'showForm';
    this.showcreate = false;
    this.increament = 0;
    this.tempAttachments = [];
    this.showDocumentsTick = false;
    this.formObject = [];
    this.activeIdString = null;
    this.createformtabshow = false;
    this.form.reset();
    this.dynamicform.reset();
    this.createis = false;
    // this.activitytype.docTypes = [];
    this.tempid = 1;
    this.temptask = [];
    this.fileNameList = [];
    this.attachDocNonMandetory = false;
  }
  activityType(data) {
    this.activitytype = JSON.parse(data._body);
    this.nextScreen = this.activitytype.nextScreen;
    if (this.activitytype.docTypes.length > 0) {
      this.showDoc = true;
      this.duplicateActivity = JSON.parse(data._body);
      for (let index = 0; index < this.activitytype.docTypes.length; index++) {
        if (this.activitytype.docTypes[index].type === 'DOCUMENT') {
          // this.activitytype.docTypes[index].id = new FileUploader({});
        } else if (this.activitytype.docTypes[index].type === 'FORM') {
          this.showSegments = 'showForm';
          this.showform = false;
          this.showcreate = false;
          this.formarray.push(this.activitytype.docTypes[index]);
        }
      }
      this.fill(this.formarray);
    } else {
      this.showDoc = false;
    }
  }
  getJSONFromDocument(data) {
    this.showform = true;
    if (this.showcreate === true) {
      this.type = "SAVED";
      // this.showSegments = 'showCreate';
      // this.showcreate = false;
      // this.increament = 1;
      this.showSegments = 'showForm';
      this.showform = true;
    } else {
      this.type = 'CREATE';
      this.showSegments = 'showForm';
      this.showform = true;
    }
    setTimeout(() => {
      this.formObject = data._body;
    }, 100);
    this.loading.hide();
  }

  fill(array) {
    if (array.length > 0) {
      if (array.length > this.increament) {
        this.documentForm(array[this.increament]);
      } else {
        this.showform = false;
        this.showcreate = true;
        this.showSegments = 'showCreate';
      }
    }
  }
  documentForm(item) {
    this.selectedTempId = item.id;
    if (item.tempid === undefined) {
      this.tempid = 1;
      item.tempid = 1;
    } else {
      this.tempid = item.tempid;
    }

    this.createformtitle = item.name;
    if (this.showSegments === 'showCreate') {
      this.createformtabshow = true;
      this.type = "SAVED";
      this.formarray = [];
      this.showSegments = 'showForm';
      this.showcreate = true;
      this.showform = false;
      this.increament = 0;
    } else {
    }
    this.activeIdString = 'createformTab';
    this.selectedTab = 1;
    this.formObject = [];
    this.tempTemplateId = item.template;
    this.selectedTempId = item.id;
    let flag = 1;
    if (this.temptask.length > 0) {
      for (let i = 0; i < this.temptask.length; i++) {
        if (this.temptask[i].docType.id === item.id && this.temptask[i].tempid === item.tempid) {
          this.ds.getJSONFromDocument(this.temptask[i].docId).subscribe(data => this.getJSONFromDocument(data));
          flag = 1;
          break;
        } else {
          flag = 0;
        }
      }
    } else {
      this.ds.getJSONFromDocument(this.tempTemplateId).subscribe(data => this.getJSONFromDocument(data));
    }
    if (flag === 0) {
      this.ds.getJSONFromDocument(this.tempTemplateId).subscribe(data => this.getJSONFromDocument(data));
    }
  }



  formDynamicSubmit(event) {
    let subjectProps = '';
    this.formObjectSubmit = event;
    if (this.subjectProps !== undefined) {
      const props = this.subjectProps.split(',');
      for (let l = 0; l < props.length; l++) {
        for (let index = 0; index < this.formObjectSubmit.length; index++) {
          for (let i = 0; i < this.formObjectSubmit[index].sections.length; i++) {
            if (this.formObjectSubmit[index].sections[i].type === 'FORM') {
              for (let j = 0; j < this.formObjectSubmit[index].sections[i].columns.length; j++) {
                for (let k = 0; k < this.formObjectSubmit[index].sections[i].columns[j].properties.length; k++) {
                  // this.formObjectSubmit[index].sections[i].columns[j].properties[k].value = this.formObject[index].sections[i].columns[j].properties[k].value;
                  if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].name === props[l]) {
                    subjectProps = subjectProps + this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[0].value;
                    if (l + 1 < props.length) {
                      subjectProps = subjectProps + '-';
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    for (let index = 0; index < this.formObjectSubmit.length; index++) {
      for (let i = 0; i < this.formObjectSubmit[index].sections.length; i++) {
        if (this.formObjectSubmit[index].sections[i].type === 'FORM') {
          for (let j = 0; j < this.formObjectSubmit[index].sections[i].columns.length; j++) {
            for (let k = 0; k < this.formObjectSubmit[index].sections[i].columns[j].properties.length; k++) {
              if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].name === 'privacy') {
                if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[0].value === '5') {
                  this.attachDocNonMandetory = true;
                  //  console.log(this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[0].value);
                } else {
                  this.attachDocNonMandetory = false;
                }
              }
            }
          }
        }
      }
    }
    this.form.patchValue({
      subject: subjectProps
    });

    let date = new Date();
    const docInfo = {
      id: this.tempTemplateId,
      docclass: 'ProductivitiDocument',
      props: [{
        'name': 'Document Title',
        'symName': 'DocumentTitle',
        'dtype': 'STRING',
        'mvalues': [this.createformtitle.concat(date.getTime().toString())],
        'mtype': 'N',
        'len': 255,
        'rOnly': 'false',
        'hidden': 'false',
        'req': 'false'
      }],
      accessPolicies: []
    };
    const formData = new FormData();
    // formData.append('DocInfo', JSON.stringify(docInfo));
    for (const docClass of this.formObjectSubmit) {
      docClass.sections.forEach(element => {
        if (element.type === 'FORM') {
          for (const cols of element.columns) {
            for (const props of cols.properties) {
              delete props.dbValue;
              delete props.dbDummyValue;
              delete props.lookupOptions;
              for (const value of props.value) {
                delete value._$visited;
              }
            }
          }
        } else if (element.type === 'TABLE') {
          for (const row of element.rows) {
            for (const item of row.items) {
              delete item.rOnly;
              delete item.req;
              delete item.label;
              delete item.type;
              delete item.length;
              delete item.lookup;
            }
          }
        }
      });
    }
    formData.append('file', new Blob([JSON.stringify(this.formObjectSubmit)]), this.createformtitle.concat(date.getTime().toString()));
    // this.ds.addJSONDocument(this.formObject.pop()).subscribe(data => this.getDocId(data, this.createformtitle.concat(date.getTime().toString())));
    let attached = false;
    if (this.temptask.length > 0) {
      for (let i = 0; i < this.temptask.length; i++) {
        if (this.temptask[i].docType.id === this.selectedTempId && this.temptask[i].tempid === this.tempid) {
          attached = true;
          this.checkouid = this.temptask[i].docId;
          break;
        } else {
          attached = false;
        }
      }
    } else {
      attached = false;
    }
    if (attached === true) {
      this.loading.show();
      let flag = 0;
      if (this.formObjectSubmit[0].datatable === undefined) {
        this.formObjectSubmit[0].datatable = [];
        // this.formObjectSubmit[0].datatable.push({'key': 'DOCID', 'value': this.checkouid});
      }
      if (this.formObjectSubmit[0].datatable.length > 0) {
        for (let index = 0; index < this.formObjectSubmit[0].datatable.length; index++) {
          if (this.formObjectSubmit[0].datatable[index].key === 'DOCID') {
            this.formObjectSubmit[0].datatable[index].value = this.checkouid;
            flag = 1;
            break;
          } else {
            flag = 0;
          }
        }
      } else {
        this.formObjectSubmit[0].datatable.push({ 'key': 'DOCID', 'value': this.checkouid });
        flag = 1;
      }
      if (flag === 0) {
        // this.formObjectSubmit[0].datatable.push({'DOCID': this.checkouid});
        this.formObjectSubmit[0].datatable.push({ 'key': 'DOCID', 'value': this.checkouid });
        //
      }
      this.ds.saveFormDocument(this.formObjectSubmit[0]).subscribe(datares => { this.chechedin(datares); this.loading.hide(); });
      this.activeIdString = null;
      this.createformtabshow = false;
      this.activeIdString = 'createTab';
      this.selectedTab = 0;
    } else {
      this.loading.show();
      if (this.activitytype.docTypes.length === 1) {
        this.ds.saveFormDocument(this.formObjectSubmit[0]).subscribe(data => { this.loading.hide(); this.getDocIdSubmit(data, this.createformtitle.concat(date.getTime().toString())); }, error => { this.failedToAddForm(error); });
      } else {
        this.ds.saveFormDocument(this.formObjectSubmit.pop()).subscribe(data => { this.loading.hide(); this.getDocId(data, this.createformtitle.concat(date.getTime().toString())); }, error => { this.failedToAddForm(error); });
        this.formObjectSubmit = [];
      }
    }
  }
  getDocIdSubmit(data, name) {
    const attachments = {
      docId: data._body,
      docTitle: name,
      format: 'application/json',
      docType: {
        id: this.selectedTempId
      },
      tempid: this.tempid
    };
    this.temptask.push(attachments);
    for (let i = 0; i < this.activitytype.docTypes.length; i++) {
      if (this.tempid === 1) {
        if (this.activitytype.docTypes[i].id === this.selectedTempId) {
          this.activitytype.docTypes[i].showgreentich = true;
          this.activitytype.docTypes[i].showadd = true;
          this.activitytype.docTypes[i].tempid = this.tempid;
          break;
        }
      }
    }
    if (this.activitytype.docTypes.length > 0) {
      for (let t = 0; t < this.activitytype.docTypes.length; t++) {
        if (this.activitytype.docTypes[t].id === this.selectedTempId && this.activitytype.docTypes[t].tempid === this.tempid) {
          this.activitytype.docTypes[t].showgreentich = true;
          this.activitytype.docTypes[t].tempid = this.tempid;
          break;
        }
      }
    }
    //   if (this.showform === true && this.formarray.length > this.increament) {
    //     this.increament = this.increament + 1;
    //     if (this.formarray.length === this.increament) {
    // this.increament = 0;
    // this.tempAttachments = [];
    //     }else if (this.formarray.length > this.increament) {
    //       this.fill(this.formarray);
    //     }
    //   }
    if (this.activitytype.docTypes.length === 1) {
      this.onsubmit('form');
    }
  }
  failedToAddForm(error) {
    this.loading.hide();
    // document.getElementById('appBody').style.cursor = 'auto';
    // document.getElementById('appBody').style.pointerEvents = 'auto';
    // this.tr.error('', 'Failed to Add Document');
  }
  checkinfile(data, response) {

    const date = new Date();
    const docInfo = {
      id: data._body,
      docclass: 'ProductivitiDocument',
      props: [{
        'name': 'Document Title',
        'symName': 'DocumentTitle',
        'dtype': 'STRING',
        'mvalues': [this.createformtitle.concat(date.getTime().toString())],
        'mtype': 'N',
        'len': 255,
        'rOnly': 'false',
        'hidden': 'false',
        'req': 'false'
      }],
      accessPolicies: []
    };
    const formData = new FormData();
    formData.append('DocInfo', JSON.stringify(docInfo));
    formData.append('file', new Blob([JSON.stringify(this.formObjectSubmit.pop())]), this.createformtitle.concat(date.getTime().toString()));
    this.ds.checkIn(formData).subscribe(datares => { this.chechedin(datares); });
  }
  chechedin(data) {
    // console.log(data._body);
    // this.tr.success('Saved Successfully');
    this.segmentChanged(data);
    this.loading.hide();
    this.tr.presentToast('Saved Successflly');
    for (let i = 0; i < this.temptask.length; i++) {
      if (this.temptask[i].docType.id === this.selectedTempId && this.temptask[i].tempid === this.tempid) {
        this.temptask[i].docId = data._body;
        break;
      }
    }
    // this.formObjectSubmit = [];
  }
  getDocId(data, name) {
    // document.getElementById('appBody').style.cursor = 'auto';
    // document.getElementById('appBody').style.pointerEvents = 'auto';
    // this.tr.success('', this.createformtitle + ' ' + 'Saved');
    this.loading.hide();
    this.activeIdString = null;
    const attachments = {
      docId: data._body,
      docTitle: name,
      format: 'application/json',
      docType: {
        id: this.selectedTempId
      },
      tempid: this.tempid
    };
    // this.tempAttachments.push(attachments);
    // console.log(this.tempAttachments);
    this.temptask.push(attachments);

    for (let i = 0; i < this.activitytype.docTypes.length; i++) {
      if (this.tempid === 1) {
        if (this.activitytype.docTypes[i].id === this.selectedTempId) {
          this.activitytype.docTypes[i].showgreentich = true;
          this.activitytype.docTypes[i].showadd = true;
          this.activitytype.docTypes[i].tempid = this.tempid;
          break;
        }
      }
    }
    this.showDocumentsTick = true;
    this.activeIdString = 'createTab';
    this.selectedTab = 0;
    this.createformtabshow = false;
    if (this.activitytype.docTypes.length > 0) {
      for (let t = 0; t < this.activitytype.docTypes.length; t++) {
        if (this.activitytype.docTypes[t].id === this.selectedTempId && this.activitytype.docTypes[t].tempid === this.tempid) {
          this.activitytype.docTypes[t].showgreentich = true;
          this.activitytype.docTypes[t].tempid = this.tempid;
          break;
        }
      }
    }
    if (this.showSegments === 'showForm' && this.formarray.length > this.increament) {
      this.increament = this.increament + 1;
      if (this.formarray.length === this.increament) {
        this.formarray = [];
        this.showSegments = 'showCreate';
        this.showcreate = false;
        this.increament = 0;
        this.showform = false;
        this.tempAttachments = [];
        this.showcreate = true;
      } else if (this.formarray.length > this.increament) {
        this.fill(this.formarray);
      }
    }
  }
  search(event) {
    console.log(event.text);
    let keyUp: string = event.text;
    if (keyUp.length > 2) {
      this.us.searchRoles(keyUp).subscribe(res => this.assinDBTypeAhead(res), error => console.log(error));
    }
  }
  assinDBTypeAhead(res) {
    this.routeTodata = [];
    let result = JSON.parse(res._body);
    for (let index = 0; index < result.length; index++) {
      const element = {
        'id': result[index].id,
        'name': result[index].name
      };
      this.routeTodata.push(element);
    }
    // console.log(this.routeTodata);
  }
  changed(event) {

  }

  onsubmit(form) {
    let flag = false;
    for (let index = 0; index < this.activitytype.docTypes.length; index++) {
      if (this.activitytype.docTypes[index].req === 1 && this.activitytype.docTypes[index].type === 'FORM') {
        for (let attach = 0; attach < this.temptask.length; attach++) {
          if (this.activitytype.docTypes[index].id === this.temptask[attach].docType.id && this.activitytype.docTypes[index].tempid === this.temptask[attach].tempid) {
            flag = true;
            break;
          } else {
            flag = false;
          }
        }
      }
    }

    let flag3 = true;
    for (let attach3 = 0; attach3 < this.duplicateActivity.docTypes.length; attach3++) {
      if (this.duplicateActivity.docTypes[attach3].req === 1 && this.duplicateActivity.docTypes[attach3].type !== 'FORM' && this.attachDocNonMandetory === false) {
        if (this.tempAttachments.length > 0) {
          for (let attach1 = 0; attach1 < this.tempAttachments.length; attach1++) {
            if (this.duplicateActivity.docTypes[attach3].id === this.tempAttachments[attach1].docType.id) {
              flag3 = true;
              break;
            } else {
              flag3 = false;
            }
          }
        } else {
          flag3 = false;
        }
      }
    }
    if (flag === true && flag3 === true) {
      let formarraycrate;
      // formarraycrate = [];
      for (let i = 0; i < this.temptask.length; i++) {
        let paramval;
        paramval = {
          subject: this.form.value.subject,
          typeId: this.id,
          createdBy: this.us.getCurrentUser().EmpNo,
          creatorRoleId: this.us.getCurrentUser().roles[0].id,
          attachments: this.tempAttachments
        };
        paramval.attachments = paramval.attachments.concat(this.temptask[i]);
        for (let o = 0; o < paramval.attachments.length; o++) {
          delete paramval.attachments[o].tempid;
        }
        formarraycrate = paramval;
        // formarraycrate.push(paramval);
      }
      //  document.getElementById('appBody').style.cursor = 'wait';
      //  document.getElementById('appBody').style.pointerEvents = 'none';
      this.loading.show();
      this.ws.saveWork(formarraycrate).subscribe(data => { this.createIsDone(data); }, eror => {
        this.loading.hide();
        //  document.getElementById('appBody').style.cursor = 'auto';
        //  document.getElementById('appBody').style.pointerEvents = 'auto';
        this.ngOnInit();
      }); // this.tr.error('', 'Failed To Create')
    } else {
      this.tr.presentToast(this.translate.instant('Need to attach required documents'));
    }
  }
  createIsDone(data) {
    let route;
    route = JSON.parse(data._body);
    this.createis = true;
    // this.route.navigateByUrl('sent');
    if (route > 0 && (this.nextScreen === 'DRAFT' || this.nextScreen === 'Draft')) {
      this.ws.getWorkDraftActivity(route).subscribe(res => { this.openActivity(res); this.loading.hide() }, error => {
        this.loading.hide();
        // document.getElementById('appBody').style.cursor = 'auto';
        // document.getElementById('appBody').style.pointerEvents = 'auto';
      }); // this.toastr.error('Failed to route')
      // this.router.navigateByUrl('inbox/readworkitem/' + route);
    } else {
      this.loading.hide();
      this.tr.presentToast(this.translate.instant('Created Successfully'));
      // document.getElementById('appBody').style.cursor = 'auto';
      // document.getElementById('appBody').style.pointerEvents = 'auto';
      // this.router.navigate( ['/sent']);
      const sent = {
        name: 'SentPage'
      };
      this.events.publish('sentSet', sent);
      // this.navCtrl.setRoot(SentPage);

    }
  }
  openActivity(data) {
    // this.navigateByUrl('')
    this.tr.presentToast(this.translate.instant('Created And Document Routed'));
    //  document.getElementById('appBody').style.cursor = 'auto';
    //  document.getElementById('appBody').style.pointerEvents = 'auto';
    let value;
    value = JSON.parse(data._body);
    //  this.router.navigate(['/draft/activity'], {queryParams: {'readworkitem': 'readworkitem', 'workId' : value}});
    this.navCtrl.push(ActivityPage, {
      firstParameter: value,
      readWrite: 'readWrite',
      taskfrom: 'Drafts'
    })
  }
  segmentChanged(event) {
    this.showcreate = true;
    this.dynamicform.reset();
    this.showSegments = 'showCreate';
    this.showform = false;

  }
  cancelForm(vale) {
    this.segmentChanged(vale);
    this.formObject = [];
  }
  inputfileChanged(event, id, docClass) {
    console.log(event.target.files);
    this.addDocument(event, id, docClass);
  }
  tempObject(obj, name) {
    // this.tempFileobject = obj ;
    for (let index = 0; index < this.activitytype.docTypes.length; index++) {
      if (this.activitytype.docTypes[index].type === 'DOCUMENT' && this.activitytype.docTypes[index].name === name) {
        this.selectedObject = this.duplicateActivity.docTypes[index].id;
      }
    }
  }
  addDocument(event, fileUploader, docClass) {

    let adddocument;
    adddocument = [];
    this.loading.show();
    for (let i = 0; i < event.target.files.length; i++) {
      const docInfo = {
        docclass: docClass,
        props: [{
          'name': 'Document Title',
          'symName': 'DocumentTitle',
          'dtype': 'STRING',
          'mvalues': [event.target.files[i].name],
          'mtype': 'N',
          'len': 255,
          'rOnly': 'false',
          'hidden': 'false',
          'req': 'false'
        }],
        accessPolicies: []
      };
      this.formData = new FormData();
      this.formData.append('DocInfo', JSON.stringify(docInfo));
      this.formData.append('file' + i, event.target.files[i]);
      console.log(event.target.files[i].name);
      this.ds.addDocument(this.formData).subscribe(data => {
        adddocument = [];
        adddocument.push({
          docid: data,
          docTitle: event.target.files[i].name,
          format: event.target.files[i].type
        });
        this.saveAttachemtObjects(adddocument, event);
      }, error => {
        // this.loading.hide();
      });
    }
  }

  saveAttachemtObjects(data, event) {
    //  console.log(data);
    const attachments = {
      docId: data[0].docid._body,
      docTitle: data[0].docTitle,
      format: data[0].format,
      docType: {
        id: this.selectedObject
      }
    };
    // this.msgs = [];
    // this.msgs.push({severity: 'success', summary: 'Document added', detail: ''});

    this.tempAttachments.push(attachments);
    console.log(event.target.files.length + ',' + this.tempAttachments.length);
    if (event.target.files.length === this.tempAttachments.length) {
      this.loading.hide();
      this.tr.presentToast(this.translate.instant('Document Added'));
      console.log(this.tempAttachments);
    }
    const date: number = new Date().getTime();
    // contents must be an array of strings, each representing a line in the new file
    // const file = new File([''], data[0].docTitle, {type: data[0].format, lastModified: date});
    // const fileItem = new fileItem(this.tempFileobject, file, {});
    // // (Visual Only) adds the new fileItem to the upload queue
    // this.tempFileobject.queue.push(fileItem);
    // this.globelFileUploder.clearQueue();
  }
  removeAttachments(value, amt) {
    for (let index = 0; index < this.tempAttachments.length; index++) {
      if (value.docTitle === this.tempAttachments[index].docTitle && amt === index) {
        this.tempAttachments.splice(index, 1);
        this.tr.presentToast(value.docTitle + '-' + this.translate.instant('Removed Successfully'));
      }
    }

  }


  converToUppercase(string) {
    if (string) {
      return string.toUpperCase();
    }
  }




}
