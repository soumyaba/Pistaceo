import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform, ModalController } from 'ionic-angular';
import { WorkService } from '../../services/work.service';
import { LoadingService } from '../../services/loading-service';
import { ToastService } from '../../services/toast-service';
import { SchemaService } from '../../services/schema.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { SelectSearchableComponent } from '../../../node_modules/ionic-select-searchable';
import { UserService } from '../../services/user.service';
import { InboxComponent } from '../../components/inbox/inbox';
import { DocumentService } from '../../services/document.service';
import { DomSanitizer, SafeResourceUrl } from '../../../node_modules/@angular/platform-browser';
import { SentPage } from '../sent/sent';
import { DraftsPage } from '../drafts/drafts';
import { SignaturePadComponent } from '../../components/signature-pad/signature-pad';
import { ContentService } from '../../services/content.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../services/menu-service';
import { ShowannotationlistPage } from '../showannotationlist/showannotationlist';
import { SimpleFormPage } from '../simple-form/simple-form';


/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage implements OnInit {
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('signature') signaturePad: SignaturePadComponent;
  public imageannotationURL = [];
  public signatureDisabled;
  public signatureIsEmpty = false;
  public canvasWidth;
  public canvasheight;
  public signUrl;
  public allSavedAnnotaion = [];
  public firstParameter: any;
  public activitiInfo: any;
  public getWorkType: any;
  public animateClass: any;
  public activityForm: FormGroup;
  public routeTodata: any;
  public routeToItem: any;
  public hideRoute = false;
  public multiRoleSelect = true;
  public disbaleSelectSearch = false;
  public displayImage: SafeResourceUrl;
  public dataImage: any;
  public taskObject: any;
  public currentPage = 1;
  public disableResponse = false;
  public routeCount = 0;
  public readWrite: any;
  public showRoleMembers: any;
  public imageFilePath: any;
  public showToDo: any;
  public formData: any;
  public tempAttachments: any;
  public showDocOrForms = false;
  public fileLength = 0;
  public richtextShow = false;
  public annoatateBtns = false;
  public btnshow = false;
  public taskfrom: any;
  public annotaionCount = 0;
  public showZoom = 'true';
  public historyList = [];
  public showDocumentsTick = false;
  public showAttAchments = [];
  public responsesDropDown = [];
  public routeToItemRoutes = []
  public editSubject = false;
  public responseSelect;
  public showSegments = 'showActivity';
  public showactivity = true;
  public showform = false;
  public createformtitle: any;
  public tempDoc: any;
  public formObject: any;
  public formObjectSubmit;
  public tempelate;
  public documentFormTemplate = false;
  public datatableId: any;
  public templateName = '';
  public responseSelectProps;
  public tempelateRender: FormGroup;
  public slideIndex = 0;
  public notify = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ws: WorkService,
    private loading: LoadingService, private toaster: ToastService, private ss: SchemaService,
    private fb: FormBuilder, private us: UserService, private ds: DocumentService,
    private sanitizer: DomSanitizer, private platform: Platform, private cs: ContentService,
    private tr: ToastService, private translate: TranslateService,
    public menuser: MenuService, private modalCtrl: ModalController) {
    this.firstParameter = navParams.get("firstParameter");
    this.taskObject = navParams.get('taskObject');
    this.readWrite = navParams.get('readWrite');
    this.taskfrom = navParams.get('taskfrom');
    // console.log(this.taskfrom);
    this.animateClass = { 'zoom-in': true };
    platform.ready().then((readySource) => {
      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
      // console.log(this.platform.is('mobile'));
      // console.log(document.addEventListener);
      this.canvasWidth = platform.width() * 0.85;
      this.canvasheight = platform.height();
      if (this.platform.isLandscape()) {
        this.canvasheight = this.platform.height() * 2;
      }
      // if(platform.is('ipad')){
      //   this.canvasWidth = platform.width() * 0.58;
      //   this.canvasheight = platform.height();
      //   // this.widthof = this.canvasWidth;
      //   if(this.platform.isLandscape()) {
      //     this.canvasWidth = platform.width() * 0.65;
      //     this.canvasheight = this.platform.height() * 2;
      //   }
      //   } else if(platform.is('mobile')){
      //     this.canvasWidth = platform.width() - 50 ;
      //     this.canvasheight = platform.height();
      //     if(this.platform.isLandscape()) {
      //       this.canvasheight = this.platform.height() * 2;
      //     // this.widthof = this.canvasWidth;
      //     }

      //   } else if(platform.is('ios')) {
      //     if(this.platform.isLandscape()) {
      //       this.canvasWidth = this.platform.width() * 0.62;
      //       this.canvasheight = this.platform.height() * 2;
      //     }
      //   } else {
      //   this.canvasWidth = platform.width() * 0.70 ;
      //   this.canvasheight = platform.height();
      //   if(this.platform.isLandscape()) {
      //     this.canvasWidth = platform.width() * 0.70;
      //     this.canvasheight = this.platform.height() * 2;
      //   // this.widthof = this.canvasWidth;
      //   }
      // }

    });

  }
  // document.addEventListener("deviceready", function() {
  //   console.log('ok');
  //   console.log(this.device);
  // });
  ngOnInit() {
    this.activityForm = this.fb.group({
      refNo: [null],
      createdOn: [null],
      instructions: [null],
      subject: [null],
      comments: [null],
      activity: [null],
      responseDropdown: [null],
      roleDropdown: [null],
      activityDropdown: [null],
      activityDropdownId: [null],
      responseDropdownId: [null],
      roleDropdownId: [null],
      filevalues: [null],
      worktype: [null],
      activitytype: [null]
    });
    this.loading.show();
    this.ws.getActivityForAction(this.firstParameter).subscribe(data => { this.getactivityinfo(data); }, error => { this.loading.hide(); });
    this.ws.getAcitvityHistory(this.firstParameter).subscribe(data => { this.getHistory(data); this.loading.hide() }, error => { this.loading.hide() });
    this.showRoleMembers = '';
    this.tempAttachments = [];
    this.showSegments = 'showActivity';
    this.showactivity = true;
    this.showform = false;
    // let  index = this.slides.getActiveIndex();
    // if(index === 0) {
    this.btnshow = false;
    this.annoatateBtns = false;
    // }
  }
  getHistory(data) {
    this.historyList = [];
    this.historyList = JSON.parse(data._body);
  }
  ionViewDidLoad() {
    //  console.log('ionViewDidLoad ActivityPage');
  }
  getactivityinfo(data) {
    if (data !== undefined) {
      this.activitiInfo = JSON.parse(data._body);
      if (this.readWrite === 'readOnly') {
        this.hideRoute = true;
        this.us.getRoleMembers(this.activitiInfo.assignedTo).subscribe(data => this.getRoleMembers(data), error => {
          this.showRoleMembers = this.activitiInfo.assignedToName;
        });
        if (this.us.getCurrentUser().isAdmin === 'Y' && (this.taskfrom === 'Search')) {
          // this.showRecall = false;
          this.notify = true;
        } else {
          this.notify = false;
        }
      }
      this.activityForm.controls['refNo'].patchValue(this.activitiInfo.refNo);
      this.activityForm.patchValue({
        subject: this.activitiInfo.subject, createdOn: this.activitiInfo.createdOn,
        comments: this.activitiInfo.comments, worktype: this.activitiInfo.workTypeName, activitytype: this.activitiInfo.typeName
      });
      this.ss.getWorkTypeFromID(this.activitiInfo.typeId).subscribe(resdata => this.getworktypefromid(resdata), error => { });
      if (this.activitiInfo.primaryDoc !== undefined) {
        // this.ds.getPreviewPage(this.activitiInfo.primaryDoc  , 1).subscribe(data => {  this.getPreviewImage(data); } , error => {});
        this.cs.getPreviewPage(this.activitiInfo.primaryDoc, 1).subscribe(data => { this.preview(data); }, error => { error });
      }
      if (this.activitiInfo.attachments.length !== 0) {
        for (let index = 0; index < this.activitiInfo.attachments.length; index++) {
          this.showAttAchments.push(this.activitiInfo.attachments[index]);
        }
        for (let index = 0; index < this.activitiInfo.attachments.length; index++) {
          if (this.activitiInfo.attachments[index].docType.type === 'FORM') {
            this.showDocumentsTick = true;
          }
        }
      } else {
        this.showDocumentsTick = false;
      }
    }
  }
  //   getPreviewImage(data) {
  //     if(data._body !== '') {
  // this.dataImage = JSON.parse(data._body);
  // if(this.dataImage != '')
  //     {
  //       this.currentPage = this.dataImage.pageNo;
  //       this.displayImage = "data:Image/png;base64,"+ this.dataImage.image;
  //     }
  //   }
  //   }
  preview(data) {
    this.cs.getAnnotations(this.activitiInfo.primaryDoc).subscribe(resdata => this.getPreviewImage(data, resdata));
  }
  getPreviewImage(data, resdata) {
    if (resdata._body !== '') {
      this.allSavedAnnotaion = [];
      this.allSavedAnnotaion = JSON.parse(resdata._body);
      this.annotaionCount = this.allSavedAnnotaion.length;
    }
    this.imageannotationURL = [];
    if (data._body !== '' || data._body !== undefined) {
      // this.canvasWidth = document.getElementById('myP').clientWidth - 20;
      this.dataImage = JSON.parse(data._body);
      if (this.dataImage != '') {
        this.currentPage = this.dataImage.pageNo;
        this.displayImage = "data:Image/png;base64," + this.dataImage.image;
        // this.signaturePad.fromDataURL = this.displayImage;
        const url = {
          url: this.ds.downloadPreviewPage(this.activitiInfo.primaryDoc, this.currentPage)
          // url: 'http://192.168.1.34:8080/Productiviti/resources/DocumentService/downloadPreviewPage?id=08EFA731-37BF-4952-9492-04278F003511&page=1&empno=1'
        };
        // this.signaturePad.fromDataURL = this.displayImage;
        let tempUrl = [];
        tempUrl.push(url);
        for (let index = 0; index < this.allSavedAnnotaion.length; index++) {
          if (this.allSavedAnnotaion[index].type === 'IMAGE' && this.allSavedAnnotaion[index].pageNo === this.currentPage) {
            const url1 = {
              url: this.ds.downloadAnnotation(this.allSavedAnnotaion[index].imageId, 1)
            };
            tempUrl.push(url1);
          }
        }
        // this.signatureDisabled = 'readonly';
        // console.log(url);
        this.imageannotationURL = tempUrl;
        if (this.readWrite === 'readOnly') {
          this.signatureDisabled = 'readonly';
        } else {
          this.signatureDisabled = 'write';
        }
        //
        if (this.signaturePad !== undefined) {
          this.signaturePad.clear();
        }
        this.signatureDisabled = 'readonly';
        // }

      }
    }
  }
  getAllAnnotation(data) {
    this.allSavedAnnotaion = [];
    this.allSavedAnnotaion = JSON.parse(data._body);
    for (
      let index = 0; index < this.allSavedAnnotaion.length; index++) {
      if (this.allSavedAnnotaion[index].type === 'IMAGE' && this.allSavedAnnotaion[index].pageNo === this.currentPage) {
        const url2 = {
          url: this.ds.downloadAnnotation(this.allSavedAnnotaion[index].imageId, 1)
        };
        this.imageannotationURL.push(url2);
        if (this.readWrite === 'readOnly') {
          this.signatureDisabled = 'readonly';
        } else {
          this.signatureDisabled = 'write';
        }

      }
    }
  }
  getworktypefromid(data) {
    //  console.log(this.readWrite);
    this.showSegments = 'showActivity';
    this.showactivity = true;
    this.showform = false;
    this.loading.hide();
    this.getWorkType = JSON.parse(data._body);
    this.responsesDropDown = [];
    if (this.getWorkType.docTypes !== undefined) {
      if (this.getWorkType.docTypes.length > 0 && this.readWrite !== 'readOnly') {
        this.showToDo = true;
      } else {
        this.showToDo = false;
      }
      // console.log(this.getWorkType.docTypes);
    }
    this.activityForm.patchValue({ instructions: this.getWorkType.instructions });
    if (this.taskObject !== undefined) {
      this.getWorkType.responses = [];
      this.getWorkType.responses.push(this.taskObject);
      this.disableResponse = true;
    } else {
      this.disableResponse = false;
    }
    if (this.getWorkType.responses !== undefined) {
      // if (this.getWorkType.responses !== undefined) {
      for (let index = 0; index < this.getWorkType.responses.length; index++) {
        if (this.responsesDropDown.length === 0) {
          this.responsesDropDown.push({
            label: this.getWorkType.responses[index].name,
            value: this.getWorkType.responses[index].name
          });
        } else {
          let flag = 0;
          for (let d = 0; d < this.responsesDropDown.length; d++) {
            if (this.responsesDropDown[d].label !== this.getWorkType.responses[index].name) {
              flag = 1;
            } else {
              flag = 0;
              break;
            }
          }
          if (flag === 1) {
            this.responsesDropDown.push({
              label: this.getWorkType.responses[index].name,
              value: this.getWorkType.responses[index].name
            });
          }
        }
        // }
      }
      this.richtextShow = false;
      let name = '';
      if (this.getWorkType.responses.length > 0) {

        this.activityForm.patchValue({ responseDropdown: this.getWorkType.responses[0].name });
        // console.log(this.activityForm);
        this.activityForm.patchValue({
          responseDropdown: this.getWorkType.responses['0'].name,
          responseDropdownId: this.getWorkType.responses['0'].id,
          activityDropdown: this.getWorkType.responses['0'].routeToName,
          activityDropdownId: this.getWorkType.responses['0'].routeToId
        });
        if (this.getWorkType.manualRoute === 0) {
          this.getWorkType.patchValue({
            roleDropdown: this.getWorkType.responses['0'].roleName,
            roleDropdownId: this.getWorkType.responses['0'].roleId
          });
        }
        this.responseSelect = this.getWorkType.responses['0'];
        this.activityForm.patchValue({
          comments: this.getWorkType.responses['0'].comment
        });
        if (this.getWorkType.responses['0'].roleId !== -5) {
          this.multiRoleSelect = true;
          this.disbaleSelectSearch = true;
          // this.routeToItem = [];

          // this.routeToItem.push({
          //   'id': this.getWorkType.responses['0'].roleId,
          //   'name': this.getWorkType.responses['0'].roleName
          // });


          // this.multiRoleSelect = false;
          this.routeToItem = [];
          this.routeToItemRoutes = [];
          for (let b = 0; b < this.getWorkType.responses.length; b++) {
            if (this.getWorkType.responses['0'].id === this.getWorkType.responses[b].id) {
              const rout = {
                name: this.getWorkType.responses[b].roleName,
                value: this.getWorkType.responses[b].roleId
              };
              const routes = {
                name: this.getWorkType.responses[b].roleName,
                value: this.getWorkType.responses[b].roleId,
                routeToId: this.getWorkType.responses[b].routeToId,
                routeToName: this.getWorkType.responses[b].routeToName
              };
              this.routeToItem.push(rout);
              this.routeToItemRoutes.push(routes);
            }
          }
          this.activityForm.controls.roleDropdown.disable();

          if (this.getWorkType.responses['0'].name === 'Archive' || this.getWorkType.responses['0'].name === 'Compose Reply') {
            this.hideRoute = true;
            // if (this.getWorkType.responses['0'].name === 'Compose Reply') {
            //   this.richtextShow = true;
            // }
            if (this.getWorkType.responses['0'].name === 'Compose Reply') {
              this.richtextShow = true;
              this.activityForm.patchValue({
                responseDropdown: this.getWorkType.responses['0'].name,
                responseDropdownId: this.getWorkType.responses['0'].id,
                activityDropdown: this.getWorkType.responses['0'].routeToName,
                activityDropdownId: this.getWorkType.responses['0'].routeToId
              });
              this.activityForm.patchValue({
                comments: this.getWorkType.responses['0'].comment
              });
            } else {
              this.richtextShow = false;
              this.activityForm.patchValue({
                responseDropdown: this.getWorkType.responses['0'].name,
                responseDropdownId: this.getWorkType.responses['0'].id,
                activityDropdown: this.getWorkType.responses['0'].routeToName,
                activityDropdownId: this.getWorkType.responses['0'].routeToId
              });
              this.activityForm.patchValue({
                comments: this.getWorkType.responses['0'].comment
              });
            }
          } else {
            this.hideRoute = false;
            this.activityForm.patchValue({
              responseDropdown: this.getWorkType.responses['0'].name,
              responseDropdownId: this.getWorkType.responses['0'].id,
              activityDropdown: this.getWorkType.responses['0'].routeToName,
              activityDropdownId: this.getWorkType.responses['0'].routeToId
            });
            this.activityForm.patchValue({
              comments: this.getWorkType.responses['0'].comment
            });

          }
        } else {
          this.multiRoleSelect = true;
          this.disbaleSelectSearch = false;
          this.routeToItem = [];
          this.activityForm.controls.roleDropdown.enable();
          this.routeToItemRoutes = [];
        }
        if (this.getWorkType.responses['0'].roleId === -6) {
          this.multiRoleSelect = true;
          this.disbaleSelectSearch = false;
          this.activityForm.controls.roleDropdown.enable();
          this.routeToItem = [];
          this.routeToItemRoutes = [];
          this.responseSelect = this.getWorkType.responses['0'];
        }
      }
      if (this.getWorkType.docTypes !== undefined) {
        this.formDocumentRequired();
      } else {
        this.showDocumentsTick = true;
      }
      this.editSubject = false;
      this.activityForm.patchValue(
        {
          refno: this.activitiInfo.refNo,
          createdon: this.activitiInfo.createdOn,
          instruction: this.activitiInfo.instructions,
          subject: this.activitiInfo.subject,

        }
      );
      if (this.readWrite !== 'readworkitem') {
        if (this.getWorkType.docTypes !== undefined) {
          if (this.getWorkType.docTypes.length > 0) {
            this.showToDo = true;
          } else {
            this.showToDo = false;
          }

          if (this.getWorkType.docTypes.id) {
            this.showDocOrForms = true;
          } else {
            this.showDocOrForms = false;
          }
        }
      }

      if (this.readWrite === 'readworkitem') {
        this.richtextShow = false;
        if (this.getWorkType.docTypes !== undefined) {
          for (let index = 0; index < this.getWorkType.docTypes.length; index++) {
            if (this.getWorkType.docTypes[index].type === 'DOCUMENT') {
              // let fileUp = this.activitytype.docTypes[index].id + 'file';
              // this.activitytype.docTypes[index].file = new FileUploader({});
            }
          }
        }
        // this.activityform.patchValue({   responseDropdown:
        // this.activitytype.responses['0'].name,   responseDropdownId:
        // this.activitytype.responses['0'].id,   activityDropdown:
        // this.activitytype.responses['0'].routeToName,   activityDropdownId:
        // this.activitytype.responses['0'].routeToId,   comments :
        // this.activitytype.responses['0'].comment });
        this
          .activityForm
          .patchValue({
            comments: this.getWorkType.responses['0'].comment
          });
        //  else {
        //   this.hideRoute = true;
        // }
      }
    }
    if (this.editSubject) {
      this.activityForm.controls.subject.enable();
    }
  }
  formDocumentRequired() {
    let flag = 0;
    for (let index = 0; index < this.getWorkType.docTypes.length; index++) {
      if (this.getWorkType.docTypes[index].type === 'FORM' && this.getWorkType.docTypes[index].req === 1) {
        for (let d = 0; d < this.activitiInfo.attachments.length; d++) {
          if (this.activitiInfo.attachments[d].docType.type === 'FORM') {
            this.ds.getFormJSONDocumentForActivity(this.activitiInfo.attachments[d].docId, this.activitiInfo.id).subscribe(data => this.showDocumentsTickChecked(data), error => this.loading.hide());
          }
        }
        flag = 1;
        break;
      } else {
        flag = 0;
      }
    }
    if (flag === 1) {
      this.showDocumentsTick = false;
    } else {
      this.showDocumentsTick = true;

    }
  }
  showDocumentsTickChecked(data) {
    let flagDoc = 1;
    const value = JSON.parse(data._body);
    if (value) {
      for (let a = 0; a < value.sections.length; a++) {
        if (value.sections[a].visible === 'TRUE') {
          if (value.sections[a].rOnly === 'TRUE') {
            flagDoc = 1;
          } else {
            flagDoc = 0;
            break;
          }
        }
      }
    }
    if (flagDoc === 0) {
      this.showDocumentsTick = false;
    } else {
      this.showDocumentsTick = true;
    }
  }
  activityFormSubmit(nextscreen) {
    // if (this.activityForm.controls.comments.value === undefined || this.activityForm.controls.comments.value === '') {
    //   this.toaster.presentToast(this.translate.instant('Comment is required'));
    //   return;
    // } else {
    //   if ((this.activityForm.controls.responseDropdown.value === undefined || this.activityForm.controls.responseDropdown.value === null)) {
    //     this.toaster.presentToast(this.translate.instant('Response should not be empty'));
    //     return;
    //   }
    //   if (this.routeToItem.length === 0 && this.hideRoute === false) {
    //     this.toaster.presentToast(this.translate.instant('Role should not be empty'));
    //     return;
    //   } else {
    //     for (let roue = 0; roue < this.routeToItem.length; roue++) {
    //       const activitySubmit = {
    //         id: this.firstParameter,
    //         typeId: this.getWorkType.id,
    //         modifiedBy: this.us.getCurrentUser().EmpNo,
    //         modifierRole: this.us.getCurrentUser().roles['0'].id,
    //         finishedBy: this.us.getCurrentUser().EmpNo,
    //         finishedByName: this.us.getCurrentUser().fulName,
    //         finisherRole: this.us.getCurrentUser().roles['0'].id,
    //         comments: this.activityForm.controls.comments.value,
    //         attachments: [],
    //         responseId: this.activityForm.controls.responseDropdownId.value,
    //         routes: [{
    //           activityType: this.activityForm.controls.activityDropdownId.value,
    //           activityTypeName: this.activityForm.controls.activityDropdown.value,
    //           roleId: this.routeToItem[roue].id,
    //           roleName: this.routeToItem[roue].name
    //         }]
    //       };
    //       //  console.log(activitySubmit);
    //       if (roue === 0) {
    //         this.loading.show();
    //       }
    //       this.ws.saveActivity(activitySubmit).subscribe(data => this.ws.finishActivity(activitySubmit).subscribe(res => this.finishActivity(res, roue + 1), error => { this.loading.hide(); }), error => { this.loading.hide(); });
    //     }
    //   }
    // }
    // this.loading.show();
    let comments;
    comments = this.activityForm.controls.comments.value;
    if (this.showDocumentsTick !== true) {  // NEED TO MAKE CHANGE HERE
      this.tr.presentToast('Please fill the form');
      this.loading.hide();
      // this.annotationPreviewTab = false;
      // this.changeDetectorRef.detectChanges();
      // this.activeIndexNumber = 0;
      return;
    } else {
      if ((comments === '' || comments === undefined || comments === null) && (this.activityForm.controls.responseDropdown.value !== 'Archive')) {
        this.tr.presentToast('Comment is required');
        // this.annotationPreviewTab = false;
        // this.changeDetectorRef.detectChanges();
        this.loading.hide();
        // this.activeIndexNumber = 0;
        return;
      } else {
        let flag = 0;
        let count = 0;
        for (let index = 0; index < this.getWorkType.docTypes.length; index++) {
          if (this.getWorkType.docTypes[index].type === 'DOCUMENT') {
            if (this.getWorkType.docTypes[index].req === 1) {
              count++;
              for (let pos = 0; pos < this.tempAttachments.length; pos++) {
                if (this.getWorkType.docTypes[index].name === this.tempAttachments[pos].docType.name) {
                  flag = 1;
                  break;
                } else {
                  flag = 0;
                }
              }
            }
          }
        }
        if (count === 0) {
          flag = 1;
        }
        if (flag === 0 && (this.activityForm.controls.responseDropdown.value !== 'Archive')) {
          this.tr.presentToast('Need to complete all the mandatory to do items');
          this.loading.hide();
          // this.annotationPreviewTab = false;
          // this.changeDetectorRef.detectChanges();
          // this.activeIndexNumber = 0;
          return;
        } else {
          const activitySubmit = {
            id: this.firstParameter,
            typeId: this.getWorkType.id,
            modifiedBy: this.us.getCurrentUser().EmpNo,
            modifierRole: this.us.getCurrentUser().roles['0'].id,
            finishedBy: this.us.getCurrentUser().EmpNo,
            finishedByName: this.us.getCurrentUser().fulName,
            finisherRole: this.us.getCurrentUser().roles['0'].id,
            comments: comments,
            attachments: this.tempAttachments,
            responseId: this.activityForm.controls.responseDropdownId.value,
            routes: [],
            respPurpose: this.responseSelect.purpose
          };
          // if (this.responseSelect.finishForm !== undefined &&
          // this.responseSelect.finishForm !== null) {   activitySubmit.respPurpose =
          // this.responseSelect.purpose; }
          if (this.disbaleSelectSearch) {
            if (this.routeToItem.name !== '' || this.routeToItem.name !== undefined) {
              const routes = {
                activityType: this.activityForm.controls.activityDropdownId.value,
                activityTypeName: this.activityForm.controls.activityDropdown.value,
                roleId: this.routeToItem.value,
                roleName: this.routeToItem.name
              };
              activitySubmit.routes.push(routes);
              if (this.responseSelect.finishForm !== undefined && this.responseSelect.finishForm !== null) {
                this.templateName = this.responseSelect.finishForm.name;
                this.responseSelectProps = this.responseSelect.finishForm.properties;
                this.tempelateRender = this.fb.group({});
                let profileModal = this.modalCtrl.create(SimpleFormPage, { templateName: this.templateName, responseSelectProps: this.responseSelectProps });
                profileModal.onDidDismiss(data => {
                  if (data === 'added') {
                    // this.apisResult();
                  }
                });
                profileModal.present();


                // this.ngxSmartModalService.getModal('tempelateRenderModel').open();
              } else {
                if (this.editSubject) {
                  this.ws.updateSubject(this.activitiInfo.id, encodeURIComponent(this.activityForm.controls.subject.value)).subscribe();
                }
                this.activityForm.disable();
                this.loading.show();
                this.ws.saveActivity(activitySubmit).subscribe(data => this.ws.finishActivity(activitySubmit).subscribe(res => {
                  this.finishActivity(res, nextscreen);
                  this.loading.hide();
                }, errr => {
                  this.activityForm.enable(); this.loading.hide();
                }),
                  err => {
                    this.activityForm.enable();
                  }
                );
              }
            } else {
              this.tr.presentToast('Please select a role');
              this.loading.hide();
              // this.annotationPreviewTab = false;
              // this.changeDetectorRef.detectChanges();
              // this.activeIndexNumber = 0;
              return;
            }
          } else {
            if (this.routeToItem.length === 0) {
              this.tr.presentToast('Please select a role');
              this.loading.hide();
              // this.annotationPreviewTab = false;
              // this.changeDetectorRef.detectChanges();
              // this.activeIndexNumber = 0;
              return;
            } else {
              if (this.responseSelect.finishForm !== null && this.responseSelect.finishForm !== undefined) {
                this.templateName = this.responseSelect.finishForm.name;
                this.responseSelectProps = this.responseSelect.finishForm.properties;
                this.tempelateRender = this.fb.group({});
                let profileModal = this.modalCtrl.create(SimpleFormPage, { templateName: this.templateName, responseSelectProps: this.responseSelectProps });
                profileModal.onDidDismiss(data => {
                  if (data === 'added') {
                    // this.apisResult();
                  }
                });
                profileModal.present();
                // for (let index = 0; index < this.responseSelectProps.length; index++) {
                //   if (this.responseSelectProps[index].req === 'TRUE') {
                //     const control: FormControl = new FormControl(null, Validators.required);
                //     this
                //       .tempelateRender
                //       .addControl(this.responseSelectProps[index].name, control);
                //   } else {
                //     const control: FormControl = new FormControl(null);
                //     this
                //       .tempelateRender
                //       .addControl(this.responseSelectProps[index].name, control);
                //   }
                // }
                // for (let index = 0; index < this.responseSelectProps.length; index++) {
                //   if (this.responseSelectProps[index].type === 'TEXT') {
                //     if (this.responseSelectProps[index].value.length !== 0) {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
                //     } else {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
                //     }
                //   } else if (this.responseSelectProps[index].type === 'LOOKUP') {
                //     if (this.responseSelectProps[index].value.length !== 0) {
                //       this.tempelateRender.controls[
                //         this.responseSelectProps[index].name]
                //         .patchValue(this.responseSelectProps[index].value[0].value);
                //     } else {
                //       this.tempelateRender.controls[
                //         this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].lookups[0].value);
                //     }
                //   } else if (this.responseSelectProps[index].type === 'DATE') {
                //     this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].lookups[0].value);
                //   } else if (this.responseSelectProps[index].type === 'NUMBER') {
                //     if (this.responseSelectProps[index].value.length !== 0) {
                //       this.tempelateRender.controls[
                //         this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
                //     } else {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
                //     }
                //   } else if (this.responseSelectProps[index].type === 'TEXTAREA') {
                //     if (this.responseSelectProps[index].value.length !== 0) {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
                //     } else {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
                //     }
                //   } else if (this.responseSelectProps[index].type === 'CHECKBOX') {
                //     if (this.responseSelectProps[index].value.length !== 0) {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
                //     } else {
                //       this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
                //     }
                //   } else { }
                // }
                // this.ngxSmartModalService.getModal('tempelateRenderModel').open();
              } else {
                // this.loading.show();
                const activitySubmit = {
                  id: this.firstParameter,
                  typeId: this.getWorkType.id,
                  modifiedBy: this.us.getCurrentUser().EmpNo,
                  modifierRole: this.us.getCurrentUser().roles['0'].id,
                  finishedBy: this.us.getCurrentUser().EmpNo,
                  finishedByName: this.us.getCurrentUser().fulName,
                  finisherRole: this.us.getCurrentUser().roles['0'].id,
                  comments: comments,
                  attachments: this.tempAttachments,
                  responseId: this.activityForm.controls.responseDropdownId.value,
                  routes: [],

                  respPurpose: this.responseSelect.purpose
                };
                for (let roue = 0; roue < this.routeToItem.length; roue++) {
                  if (this.routeToItemRoutes.length > 0) {
                    const routes = {
                      activityType: this.routeToItemRoutes[roue].routeToId,
                      activityTypeName: this.routeToItemRoutes[roue].routeToName,
                      roleId: this.routeToItem[roue].value,
                      roleName: this.routeToItem[roue].name
                    };
                    activitySubmit.routes.push(routes);
                  } else {
                    const routes = {
                      activityType: this.activityForm.controls.activityDropdownId.value,
                      activityTypeName: this.activityForm.controls.activityDropdown.value,
                      roleId: this.routeToItem[roue].value,
                      roleName: this.routeToItem[roue].name
                    };

                    activitySubmit.routes.push(routes);
                  }
                }

                if (this.editSubject) {
                  this.ws.updateSubject(this.activitiInfo.id, encodeURIComponent(this.activityForm.controls.subject.value)).subscribe();
                }
                this.activityForm.disable();
                this.loading.show();
                this.ws.saveActivity(activitySubmit).subscribe(data => this.ws.finishActivity(activitySubmit).subscribe(res => this.finishActivity(res, nextscreen), err => {
                  this.activityForm.enable();
                  this.loading.hide();
                }),
                  error => {
                    this.loading.hide();
                  }
                );
              }
            }
          }
        }
      }

    }
  }
  finishActivity(data, routeCount) {
    // if (this.routeToItem.length === routeCount) {
    this.loading.hide();
    this.toaster.presentToast(this.translate.instant('Finished Successfully'));
    let route = JSON.parse(data._body);
    let value = this.getWorkType.nextScreen.toLowerCase();
    if (route > 0) {
      //  this.loading.show();
      this.ws.getWorkDraftActivity(route).subscribe(data => this.openDraft(data), error => { });
    } else {
      if (value === 'inbox') {
        this.navCtrl.setRoot(InboxComponent);
      }
      if (value === 'sent') {
        this.navCtrl.setRoot(SentPage);
      }
      // console.log(value);
      if (value === 'draft') {
        this.navCtrl.setRoot(DraftsPage);
      }
    }
    // }
  }
  openDraft(data) {
    this.toaster.presentToast(this.translate.instant('Document Routed'));
    this.loading.hide();
    let value = JSON.parse(data._body);
    this.navCtrl.push(ActivityPage, {
      firstParameter: value,
      readWrite: 'readWrite'
    });
  }
  responseSelectChange(event) {
    //  console.log(event);
    this.richtextShow = false;
    let responseSelect;
    for (let index = 0; index < this.getWorkType.responses.length; index++) {
      if (this.getWorkType.responses[index].name === event) {
        responseSelect = this.getWorkType.responses[index];
        this.responseSelect = this.getWorkType.responses[index];
      }
    }
    // console.log(responseSelect.name);
    this.activityForm.patchValue({
      responseDropdownId: responseSelect.id,
      activityDropdownId: responseSelect.routeToId,
      activityDropdown: responseSelect.routeToName,
      roleDropdownId: responseSelect.roleId,
      roleDropdown: responseSelect.roleName
    });

    if (responseSelect.name === 'Archive' || responseSelect.name === 'Compose Reply') {
      this.hideRoute = true;
      if (responseSelect.name === 'Compose Reply') {
        this.richtextShow = true;
        this.activityForm.patchValue({
          comments: responseSelect.comment
        });
      } else {
        this.richtextShow = false;
        this.activityForm.patchValue({
          comments: responseSelect.comment
        });
      }
    } else {
      this.hideRoute = false;
      this.activityForm.patchValue({
        comments: responseSelect.comment
      });
    }

    if (responseSelect.roleId !== -5) {
      this.multiRoleSelect = true;
      this.disbaleSelectSearch = true;
      this.routeToItem = [];
      this.routeToItemRoutes = [];
      if (responseSelect.name === 'Archive') {
        this.routeToItem.push({
          'id': responseSelect.roleId,
          'name': ''
        });
      } else if (responseSelect.name !== 'Archive') {
        // this.routeToItem.push({
        //   'id': responseSelect.roleId,
        //   'name': responseSelect.roleName
        // });
        for (let d = 0; d < this.getWorkType.responses.length; d++) {
          if (responseSelect.name === this.getWorkType.responses[d].name) {
            const response = {
              value: this.getWorkType.responses[d].roleId,
              name: this.getWorkType.responses[d].roleName
            };
            const routes = {
              name: this.getWorkType.responses[d].roleName,
              value: this.getWorkType.responses[d].roleId,
              routeToId: this.getWorkType.responses[d].routeToId,
              routeToName: this.getWorkType.responses[d].routeToName
            };
            this.routeToItem.push(response);
            this.routeToItemRoutes.push(routes);
          }
        }
      }
      this.activityForm.controls.roleDropdown.disable();
    } else {
      this.disbaleSelectSearch = false;
      this.multiRoleSelect = true;
      this.routeToItem = [];
      this.activityForm.controls.roleDropdown.enable();
      this.routeToItemRoutes = [];
    }
    if (responseSelect.roleId === -6) {
      this.multiRoleSelect = true;
      this.disbaleSelectSearch = false;
      this.activityForm.controls.roleDropdown.enable();
      this.routeToItem = [];
      this.routeToItemRoutes = [];
    }
  }
  roleChanged(event) {
    //console.log(event);
  }
  onSearchRoles(event) {
    let keyUp: string = event.text;
    if (keyUp.length > 2) {
      if (this.responseSelect.roleId === -6) {
        this.us.searchSubordinateRoles(keyUp).subscribe(data => {
          this.assinDBTypeAhead(data);
        }, error => { });
      } else {
        this
          .us
          .searchRoles(keyUp)
          .subscribe(res => this.assinDBTypeAhead(res));
      }
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
  slideChanged() {
    // let currentIndex = this.slides.getActiveIndex();
    // console.log('Current index is', currentIndex);
    let index = this.slides.getActiveIndex();
    this.slideIndex = this.slides.getActiveIndex();
    if (index === 4) {
      // index = 0;
      this.slides.slideTo(0);
      this.btnshow = false;
    }
    // } else if (index > 0) {
    //     index = index - 1;
    // }
    //  console.log(index);
    if (index === 0) {
      this.annoatateBtns = false;
      this.btnshow = false;
    } else if (index === 1) {
      this.btnshow = true;
      if (this.signaturePad !== undefined) {
        this.signaturePad.clear();
        this.signatureDisabled = 'readonly';
        this.showZoom = 'true';
      }
    } else if (index === 2 || index === 3) {
      this.annoatateBtns = false;
      this.btnshow = false;
    }
  }
  conditions() {
    this.btnshow = true;
    this.annoatateBtns = false;
    this.signaturePad.clear();
    this.signatureDisabled = 'readonly';
    this.showZoom = 'true';
    this.slides.lockSwipes(false);
  }
  firstPage(first) {
    this.loading.show();
    this.conditions();
    this.ds.getPreviewPage(this.activitiInfo.primaryDoc, first).subscribe(data => { this.preview(data); this.loading.hide(); }, error => { this.loading.hide(); });
  }
  previousPage(prev) {
    if (prev > 0) {
      this.loading.show();
      this.conditions();
      this.ds.getPreviewPage(this.activitiInfo.primaryDoc, prev).subscribe(data => { this.preview(data); this.loading.hide(); }, error => { this.loading.hide(); });
    }
  }
  nextPage(forward) {
    if ((forward - 1) < this.dataImage.pageCount) {
      this.loading.show();
      this.conditions();
      this.ds.getPreviewPage(this.activitiInfo.primaryDoc, forward).subscribe(data => { this.preview(data); this.loading.hide(); }, error => { this.loading.hide(); });
    }
  }
  lastPage(last) {
    this.loading.show();
    this.conditions();
    this.ds.getPreviewPage(this.activitiInfo.primaryDoc, last).subscribe(data => { this.preview(data); this.loading.hide(); }, error => { this.loading.hide(); });
  }
  getRoleMembers(data) {
    this.hideRoute = true;
    const value = JSON.parse(data._body);
    let roleMembers = ''
    if (value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        if (i === 0) {
          roleMembers = value[i].fulName;
        } else {
          roleMembers = roleMembers + ' , ' + value[i].fulName;
        }
      }
      setTimeout(() => {
        if (roleMembers !== '') {
          this.showRoleMembers = this.activitiInfo.assignedToName + ' ' + '[' + roleMembers + ']';
        } else {
          this.showRoleMembers = this.activitiInfo.assignedToName;
        }
      }, 0);
    }

  }
  recallActivity() {
    if (this.activityForm.controls.comments.value !== '') {
      this.loading.show();
      this.ws.recallActivity(this.activitiInfo.id).subscribe(data => this.getrecallActivity(data), error => this.loading.hide());
    } else {
      this.toaster.presentToast(this.translate.instant('Commment is required'));
    }
  }

  getrecallActivity(data) {
    this.loading.hide();
    this.toaster.presentToast(this.translate.instant('Recall is Successfull'));
    this.navCtrl.setRoot(SentPage);
  }
  fileUpload() {
    //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    //     console.log('file system open: ' + fs.name);
    //     fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

    //         console.log("fileEntry is file?" + fileEntry.isFile.toString());
    //         // fileEntry.name == 'someFile.txt'
    //         // fileEntry.fullPath == '/someFile.txt'
    //         writeFile(fileEntry, null);

    //     }, onErrorCreateFile);

    // }, onErrorLoadFs);
  }
  imageFilePath_change(event) {
    // console.log(event.target.files);
    let adddocument = [];
    this.fileLength = event.target.files.length;
    for (let i = 0; i < event.target.files.length; i++) {
      const docInfo = {
        docclass: 'ProductivitiDocument',
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
      if (i === 0) {
        this.loading.show();
      }
      this.ds.addDocument(this.formData).subscribe(data => {
        // adddocument.push({
        //   docid : data,
        //   docTitle:  event.target.files[i].name,
        //   format: event.target.files[i].type
        //  });
        this.saveAttachemtObjects(data, i + 1, event.target.files[i].name, event.target.files[i].type);
      }, error => {
        if (i + 1 === this.fileLength) {
          this.loading.hide();
          return;
        }
      });
    }
  }

  saveAttachemtObjects(data, count, name, type) {
    const attachments = {
      docId: data._body,
      docTitle: name,
      format: type,
      docType: {
        id: count
      }
    };
    this.tempAttachments.push(attachments);
    this.showDocOrForms = true;
    this.toaster.presentToast(this.translate.instant('Document Added'));
    if (count === this.fileLength) {
      this.loading.hide();
      // console.log(this.tempAttachments);
    }
    // contents must be an array of strings, each representing a line in the new file
    // let file = new File([''], data[0].docTitle, {type: data[0].format, lastModified: date});
    // let fileItem = new fileItem(this.tempFileobject, file, {});
    // // (Visual Only) adds the new fileItem to the upload queue
    // this.tempFileobject.queue.push(fileItem);
    // this.globelFileUploder.clearQueue();

  }
  removeFile(files) {
    for (let i = 0; i < this.tempAttachments.length; i++) {
      if (this.tempAttachments[i].docId === files.docId) {
        this.tempAttachments.splice(i, 1);
        return;
      }
    }
  }
  saveImageAnnoataions() {
    if (this.signaturePad !== undefined) {
      this.signUrl = this.signaturePad.toDataURL();
      const byteCharacters = atob(this.signUrl.replace('data:image/png;base64,', ''));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      // saveAs(blob, this.activityinfo.refNo);
      let string: String;
      string = this.us.getCurrentUser().EmpNo + '-imageAnnoatation.png';
      const docInfo = {
        docclass: 'ProductivitiDocument',
        props: [{
          'name': 'Document Title',
          'symName': 'DocumentTitle',
          'dtype': 'STRING',
          'mvalues': [string],
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
      // formData.append('file', scannedPdfName);
      formData.append('document', blob, this.us.getCurrentUser().EmpNo + '-imageAnnoatation.png');
      this.ds.addDocument(formData).subscribe(data => this.digitalSignAnnotation(data));
    }
  }
  digitalSignAnnotation(data) {
    this.annoatateBtns = false;
    this.signatureIsEmpty = false;
    this.signaturePad.clear();
    const image = {
      docId: this.activitiInfo.primaryDoc,
      imageId: data._body,
      type: 'IMAGE',
      empNo: this.us.getCurrentUser().EmpNo,
      xPos: 0,
      yPos: 0,
      userName: this.us.getCurrentUser().userLogin,
      pageNo: this.currentPage
    };
    //  this.annotationid++;
    this.ds.saveAnnotation(image).subscribe(resdata => this.savedAnnotation(resdata, data._body));
  }
  clear() {
    if (this.signaturePad !== undefined) {
      this.signaturePad.clear();
      this.annoatateBtns = false;
      this.showZoom = 'true';
      this.btnshow = true;
      this.signatureDisabled = 'readonly';
      this.slides.lockSwipes(false);
    }
  }
  savedAnnotation(resdata, dataid) {
    this.tr.presentToast(this.translate.instant('Saved Annotation'));
    this.btnshow = true;
    this.slides.lockSwipes(false);
    this.showZoom = 'true';
    this.cs.getPreviewPage(this.activitiInfo.primaryDoc, this.currentPage).subscribe(data => { this.preview(data) });
  }
  drawComplete(event) {
    this.signatureIsEmpty = true;
    this.annoatateBtns = true;
    this.btnshow = false;
  }
  enable() {
    // if(this.signaturePad !== undefined) {
    this.signatureDisabled = 'write';
    this.slides.lockSwipes(true);
    this.showZoom = 'false';
    this.tr.presentToast(this.translate.instant('You can do image annotation now'));
    // }
  }
  flagActivitiy() {
    this.ws.flagActivity(this.firstParameter, 1, this.us.getCurrentUser().EmpNo).subscribe(data => { this.updateFlag(data); this.tr.presentToast(this.translate.instant('Added flag activity')) }, error => console.log(error));
  }

  removeflagActivitiy() {
    this.ws.flagActivity(this.firstParameter, 0, this.us.getCurrentUser().EmpNo).subscribe(data => { this.updateFlag(data); this.tr.presentToast(this.translate.instant('Removed flag activity')) }, error => console.log(error));
  }
  updateFlag(data) {
    this.loading.show();
    this.ws.getActivityInfo(this.firstParameter).subscribe(data => { this.getactivityinfo(data); }, error => { this.loading.hide(); });
    this.showRoleMembers = '';
    this.tempAttachments = [];
    this.btnshow = true;
    this.annoatateBtns = false;
  }
  showAnnotations() {
    let showAnnoatationsModal = this.modalCtrl.create(ShowannotationlistPage, { docId: this.activitiInfo.primaryDoc });
    showAnnoatationsModal.onDidDismiss(data => {
      if (data !== 'closed') {
        setTimeout(() => {
          this.showAnnotationsImage(data);
        }, 0);
      }
    });
    showAnnoatationsModal.present();
  }
  showAnnotationsImage(data) {
    this.loading.show();
    this.btnshow = true;
    this.annoatateBtns = false;
    this.readWrite = this.navParams.get('readWrite');
    this.ds.getPreviewPage(this.activitiInfo.primaryDoc, data).subscribe(data => { this.preview(data); this.loading.hide(); }, error => { this.loading.hide(); }); //this.loading.hide();
  }
  downloadDocuments(doc) {
    this.cs.downloadDocument(doc.docId, doc.docTitle);
  }
  downLoadSigned(doc) {
    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('DownloadDocument' + '(' + date + '-' + time + ')');
    this.ds.downloadSignedDocument(doc, 'DownloadDocument' + '(' + date + ' - ' + time + ')');
  }
  downloadDocumentsSendName(doc) {
    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.cs.downloadDocument(doc, 'DownloadDocument' + '(' + date + ' - ' + time + ')');
  }
  segmentChanged(event) {
    this.showactivity = true;
    this.showform = false;
    this.showSegments = 'showActivity';

  }
  openForms(item) {
    this.loading.show();
    this.tempelate = item;
    this.createformtitle = item.name;
    this.showSegments = 'showForm';
    this.showform = true;
    let flag = 0;
    for (let index = 0; index < this.activitiInfo.attachments.length; index++) {
      if (this.activitiInfo.attachments[index].docType.id === item.id) {
        flag = 0;
        this.tempDoc = this
          .activitiInfo
          .attachments[index];
        break;
      } else {
        flag = 1;
      }
    }
    if (flag === 0) {
      this.documentFormTemplate = false;
      this.ds.getFormJSONDocumentForActivity(this.tempDoc.docId, this.activitiInfo.id).subscribe(data => this.getJSONFromDocument(data), error => this.loading.hide());
    } else {
      this.documentFormTemplate = true;
      this.ds.getFormJSONDocumentForActivity(this.tempelate.template, this.activitiInfo.id).subscribe(data => this.getJSONFromDocument(data), error => this.loading.hide());
    }
  }
  getJSONFromDocument(data) {
    this.formObject = data._body;
    this.loading.hide();
  }
  formDynamicSubmit(event) {
    this.formObjectSubmit = event;
    const date = new Date();
    const filename = this.createformtitle.concat(date.getTime().toString()) + '.JSON';
    const docInfo = {
      id: this.tempelate.template,
      docclass: 'ProductivitiDocument',
      props: [
        {
          'name': 'Document Title',
          'symName': 'DocumentTitle',
          'dtype': 'STRING',
          'mvalues': [
            filename
          ],
          'mtype': 'N',
          'len': 255,
          'rOnly': 'false',
          'hidden': 'false',
          'req': 'false'
        }
      ],
      accessPolicies: []
    };
    const formData = new FormData();
    formData.append('DocInfo', JSON.stringify(docInfo));

    for (const docClass of this.formObjectSubmit) {
      docClass.sections.forEach(element => {
        if (this.converToUppercase(element.type) === 'FORM') {
          for (const cols of element.columns) {
            for (const props of cols.properties) {
              delete props.dbValue;
              delete props.dbDummyValue;
              delete props.lookupOptions;

            }
          }
        } else if (this.converToUppercase(element.type) === 'TABLE') {
          for (const row of element.rows) {
            for (const item of row.items) {
              delete item.rOnly;
              delete item.req;
              delete item.label;
              delete item.type;
              delete item.length;
              delete item.lookup;
              delete item.lookups;
              delete item.dblookup;
            }
          }
        }
      });
    }

    formData.append('file', new Blob([JSON.stringify(this.formObjectSubmit)], { type: 'application/json' }));
    if (this.documentFormTemplate === true) {
      // this
      //     .ds
      //     .addJSONDocument(this.formObjectSubmit.pop())
      //     .subscribe(data => {
      //         this.addDocumentAttachement(data);
      //     });
      this.ds.saveFormDocument(this.formObjectSubmit.pop()).subscribe(data => {
        this.addDocumentAttachement(data);
      });
    } else {
      // this
      //     .ds
      //     .checkOut(this.tempDoc.docId)
      //     .subscribe(data => {
      //         this.checkinfile(data, formData);
      //     });
      let flag = 0;
      if (this.formObjectSubmit[0].datatable.length > 0) {
        for (let index = 0; index < this.formObjectSubmit[0].datatable.length; index++) {
          if (this.formObjectSubmit[0].datatable[index].key === 'DOCID') {
            this.formObjectSubmit[0].datatable[index].value = this.tempDoc.docId;
            flag = 1;
            break;
          } else {
            flag = 0;
          }
        }
      } else {
        flag = 0;
      }
      if (flag === 0) {
        //  this.formObjectSubmit[0].datatable.push({'DOCID': this.tempDoc.docId});
        this.formObjectSubmit[0].datatable.push({ 'key': 'DOCID', 'value': this.tempDoc.docId });
      }
      this.ds.saveFormDocument(this.formObjectSubmit.pop()).subscribe(datares => { this.chechedin(datares); });
      // console.log(this.formObjectSubmit);
      // this.ds.saveFormDocument(this.formObjectSubmit.pop()).subscribe(data => {
      //     this.addDocumentAttachement(data);
      // });
    }
  }
  cancelForm(event) {
    this.formObject = [];
    this.segmentChanged(event);
  }
  converToUppercase(string) {
    if (string) {
      return string.toUpperCase();
    }
  }
  addDocumentAttachement(data) {
    let flag = 0;
    const document = {
      docId: data._body,
      docTitle: this.createformtitle,
      docType: this.tempelate,
      format: 'application/json'
    };
    this.activitiInfo.attachments.push(document);
    for (let index = 0; index < this.tempAttachments.length; index++) {
      if (this.tempAttachments[index].docId === document.docId) {
        this.tempAttachments.splice(index, 1);
        flag = 0;
        break;
      }
    }
    this.tempAttachments.push(document);
  }
  chechedin(data) {
    this.datatableId = data._body;
    this.tr.presentToast('Saved Successfully');
    this.showDocumentsTick = true;
    this.tempDoc.docId = data._body;
    this.segmentChanged(event);
    for (let i = 0; i < this.tempAttachments.length; i++) {
      if (this.tempAttachments[i].docType.id === this.tempDoc.id) {
        this.tempAttachments[i].docId = data._body;
        this.tempDoc.docId = data._body;
        break;
      }
    }
    this.saveActivity('event');
    this.ws.updatePrimaryDocument(this.activitiInfo.workId, this.activitiInfo.id).subscribe(datares => this.updatePrimaryDoc(datares));
    //  this is no the ideal way of doing but it's an imidate fix
  }

  updatePrimaryDoc(data) {
    this.activitiInfo.primaryDoc = '';
    this.ws.getActivityInfo(this.firstParameter).subscribe(datares => this.getactivityinfoDoc(datares));
    // this.createformtabshow = false;
  }
  saveActivity(event) {
    const activitySubmit = {
      id: this.firstParameter,
      typeId: this.getWorkType.id,
      modifiedBy: this.us.getCurrentUser().EmpNo,
      modifierRole: this.us.getCurrentUser().roles['0'].id,
      finishedBy: this.us.getCurrentUser().EmpNo,
      finishedByName: this.us.getCurrentUser().fulName,
      finisherRole: this.us.getCurrentUser().roles['0'].id,
      comments: this.activityForm.controls.comments.value,
      attachments: this.tempAttachments,
      responseId: this.activityForm.controls.responseDropdownId.value,
      routes: [],
      respPurpose: this.responseSelect.purpose
    };

    const routes = {
      activityType: this.activityForm.controls.activityDropdownId.value,
      activityTypeName: this.activityForm.controls.activityDropdown.value,
      roleId: this.routeToItem.value,
      roleName: this.routeToItem.name
    };
    activitySubmit.routes.push(routes);
    this.ws.saveActivity(activitySubmit).subscribe();
    this.loading.hide();

    if (this.editSubject) {
      this.ws.updateSubject(this.activitiInfo.id, encodeURIComponent(this.activityForm.controls.subject.value)).subscribe();
    }
  }
  getactivityinfoDoc(datares) {
    const activityInfo = JSON.parse(datares._body);
    // this.activityId = activityInfo.id;
    this.activitiInfo.primaryDoc = activityInfo.primaryDoc;
  }
  notification() {
    this.ws.sendPendingActivityNotifications(this.activitiInfo.workId).subscribe(data => {
      this.tr.presentToast('Notification sent successfully');
    }, error => { });
  }
  activityComplete() {

    const finishForm = {
      name: this.responseSelect.finishForm.name,
      properties: this.responseSelectProps
    };
    const activitySubmit = {
      id: this.firstParameter,
      typeId: this.getWorkType.id,
      modifiedBy: this.us.getCurrentUser().EmpNo,
      modifierRole: this.us.getCurrentUser().roles['0'].id,
      finishedBy: this.us.getCurrentUser().EmpNo,
      finishedByName: this.us.getCurrentUser().fulName,
      finisherRole: this.us.getCurrentUser().roles['0'].id,
      comments: this.activityForm.controls.comments.value,
      attachments: this.tempAttachments,
      responseId: this.activityForm.controls.responseDropdownId.value,
      routes: [],
      finishForm: finishForm,
      respPurpose: this.responseSelect.purpose
    };
    const routes = {
      activityType: this.activityForm.controls.activityDropdownId.value,
      activityTypeName: this.activityForm.controls.activityDropdown.value,
      roleId: this.routeToItem.value,
      roleName: this.routeToItem.name
    };

    activitySubmit.routes.push(routes);
    // this.ngxSmartModalService.getModal('tempelateRenderModel').close();
    this.loading.show();
    this.ws.saveActivity(activitySubmit).subscribe(data => this.ws.finishActivity(activitySubmit).subscribe(res => this.finishActivity(res, this.getWorkType.nextScreen.toLowerCase()), err => {
      this.activityForm.enable();
      this.loading.hide();
    }),
      error => {
        this.loading.hide();
      }
    );
    if (this.editSubject) {
      this.ws.updateSubject(this.activitiInfo.id, encodeURIComponent(this.activityForm.controls.subject.value)).subscribe(
        data => this.updateSubject(data, activitySubmit)
      );
    }
  }
  updateSubject(data, activitySubmit) {

    this.activityForm.disable();
    this.tempelateRender.disable();
    this.loading.hide();
    this.ws.saveActivity(activitySubmit).subscribe(
      datares => this.ws.finishActivity(activitySubmit).subscribe(res => {
        this.finishActivity(res, this.getWorkType.nextScreen);
      }, errr => {
        this.loading.hide();
      }),
      err => {
        this.loading.hide();
      }
    );
  }
}
