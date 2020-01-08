import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Tabs } from 'ionic-angular';
import { ContentService } from '../../services/content.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast-service';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage implements OnInit {
  public folderId = undefined;
  public documentId = undefined;
  public repoId = undefined;
  public sharedDownloadlink;
  public docProperty;
  public documentPropertyProps = [];
  public docPropertyName = '';
  public docisReserved;
  public folderFileName;
  public versionsList = [];
  public documentPermission = [];
  public listOfDcumentAnnotation = [];
  public editProp: FormGroup;
  public propertyEdit = false;
  public addFolderPermissionDisplay = false;
  public editFolderPermission = false;
  public folderPermission = [];
  public animateItems = [];
  public animateClass: any;
  public addPermissionForm: FormGroup;
  public permissionModelDropdown = [];
  public folderPermissionModelDropdown = [];
  public getroleList = [];
  public selectedRoleObject: any;
  public documentActionsList = [];
  public showDocumentHistory = [];
  public documentLinkList = [];
  public showEdit = false;
  @Output() docProps = new EventEmitter();
  public rtlSupport = 'ltr';
  tab: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cs: ContentService, private fb: FormBuilder, private tr: ToastService,
    private us: UserService, private translate: TranslateService, public events: Events) {
    this.tab = this.navCtrl.parent;
    this.folderId = this.navParams.data.folderId;
    this.documentId = this.navParams.data.docId;
    this.repoId = this.navParams.data.repoId;
    this.folderPermissionModelDropdown.push({ label: 'Full Control (Delete)', value: 127 });
    this.folderPermissionModelDropdown.push({ label: 'Owner (Permissions)', value: 63 });
    this.folderPermissionModelDropdown.push({ label: 'Author (Versioning)', value: 31 });
    this.folderPermissionModelDropdown.push({ label: 'Author (Modify)', value: 15 });
    this.folderPermissionModelDropdown.push({ label: 'Author (Download)', value: 7 });
    this.folderPermissionModelDropdown.push({ label: 'Author (Annotate)', value: 3 });
    this.folderPermissionModelDropdown.push({ label: 'Viewer', value: 1 });
    if (localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
    } else {
      this.rtlSupport = 'ltr';
    }
  }
  ngOnInit() {
    this.editProp = this.fb.group({});
    this.addPermissionForm = this.fb.group({
      accessLevel: [null, Validators.compose([Validators.required])],
      granteeName: [null, Validators.compose([Validators.required])],
      permissionSource: [1, Validators.compose([Validators.required])],
      roleId: [null, Validators.compose([Validators.required])],
      accessMask: [1, Validators.compose([Validators.required])],
    });
    if (localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
    } else {
      this.rtlSupport = 'ltr';
    }
  }
  addFolderPermission() {
    this.addFolderPermissionDisplay = true;
    this.editFolderPermission = false;
    this.addPermissionForm.reset();
    this.selectedRoleObject = undefined;
    this.addPermissionForm.patchValue({
      permissionSource: 1,
      accessMask: 1
    });

  }
  editFolderPermissions(permissions) {
    this.addPermissionForm.patchValue({
      accessLevel: permissions.accessLevel,
      accessMask: permissions.accessMask,
      granteeName: permissions.granteeName,
      permissionSource: permissions.permissionSource,
      roleId: permissions.roleId,
    });
    // this.setroleList = {'value': permissions.roleId,
    // 'name':  permissions.granteeName
    // };
    this.selectedRoleObject = {
      'value': permissions.roleId,
      'name': permissions.granteeName
    };
    this.addFolderPermissionDisplay = false;
    this.editFolderPermission = true;
  }
  folderDeletePermissions(permissions) {
    const setAccessMask = permissions;
    setAccessMask.accessMask = 0;
    const docSend = {
      id: this.documentId,
      permissions: [setAccessMask],
    };
    this.cs.updateDocumentSecurity(docSend).subscribe(data => this.updateDocumentSecurity(data));
  }
  updateDocumentSecurity(data) {
    this.addPermissionForm.reset();
    this.cs.getDocumentPermissions(this.docProperty.id).subscribe(datares => this.getDocumentPermissions(datares));
  }

  ionViewDidLoad() {
    this.cs.getThisDocument(this.documentId).subscribe(data => this.getPropertyDetail(data));
    this.cs.getDocumentFolders(this.documentId).subscribe(data => this.getDocumentFolderName(data));
    this.cs.getDocumentVersions(this.documentId).subscribe(data => this.getDocumentVersions(data));
    this.cs.getDocumentPermissions(this.documentId).subscribe(data => this.getDocumentPermissions(data));
    this.cs.getAnnotations(this.documentId).subscribe(data => this.getListOfAnnoattion(data));
    this.cs.getDocumentActions(this.documentId).subscribe(data => this.getDocumentActionsResult(data));
    this.cs.getDocumentHistory(this.documentId).subscribe(datares => this.getDocumentHistoryResult(datares));
    this.cs.getDocumentLinks(this.documentId).subscribe(datares => this.getDocumentLinksResult(datares));
  }
  getPropertyDetail(data) {
    if (data._body !== '') {
      this.docProperty = JSON.parse(data._body);
      this.documentPropertyProps = this.docProperty.props;
      this.docPropertyName = this.docProperty.docclass;
      this.docisReserved = this.docProperty.isReserved;
      for (const props of this.docProperty.props) {
        if (props.dtype === 'DATE') {
          let dateValue = props.mvalues[0];
          if (props.req === 'TRUE' || props.req === 'true') {
            const control: FormControl = new FormControl(dateValue.split(' ')[0], Validators.required);
            this.editProp.addControl(props.symName, control);
          } else {
            const control: FormControl = new FormControl(dateValue.split(' ')[0]);
            this.editProp.addControl(props.symName, control);
          }
        } else {
          if (props.req === 'TRUE' || props.req === 'true') {
            const control: FormControl = new FormControl(props.mvalues[0], Validators.required);
            this.editProp.addControl(props.symName, control);
          } else {
            const control: FormControl = new FormControl(props.mvalues[0]);
            this.editProp.addControl(props.symName, control);
          }
        }
      }
      this.propertyEdit = false;
      this.editProp.disable();
      this.docProps.emit(this.docProperty);

    }
  }
  getDocumentFolderName(data) {
    if (data._body !== '') {
      this.folderFileName = JSON.parse(data._body);
    }
  }
  getDocumentVersions(data) {
    if (data._body !== '') {
      this.versionsList = JSON.parse(data._body);
    }
  }
  getDocumentPermissions(data) {
    this.documentPermission = JSON.parse(data._body);
  }
  getListOfAnnoattion(data) {
    const resData = JSON.parse(data._body);
    if (resData.length === 0) {
    } else {
      this.listOfDcumentAnnotation = JSON.parse(data._body);
    }
  }
  editSubmit(event) {
    const params = { 'id': this.documentId, 'docclass': this.docPropertyName, 'props': [] };
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const prop of this.documentPropertyProps) {
          if (inputField.id !== undefined && inputField.id === prop.symName) {
            const property = { 'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.childNodes[1].value] };
            params.props.push(property);
          }
        }
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-datetime'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const prop of this.documentPropertyProps) {
          if (inputField.id !== undefined && inputField.id === prop.name) {
            const property = {
              'symName': prop.symName, 'dtype': prop.dtype, 'mvalues':
                [inputField.textContent]
            };
            params.props.push(property);
          }
        }
      }
    }
    this.cs.updateProperties(params).subscribe(res => {
      this.cs.getThisDocument(this.documentId).subscribe(data => {
        this.editProp.reset(); setTimeout(() => {
          this.getPropertyDetail(data);
        }, 100);
      });
    });

  }
  editProperty() {
    this.editProp.enable();
    this.propertyEdit = true;

  }
  submitFolderPermission(event) {
    if (this.selectedRoleObject !== undefined && this.addPermissionForm.controls.accessMask.value !== null) {
      const permission = {
        accessMask: this.addPermissionForm.controls.accessMask.value,
        granteeName: this.selectedRoleObject.name,
        permissionSource: 0,
        roleId: '',
      };
      let roleId = this.selectedRoleObject.value;
      if (roleId > 9000000) {
        roleId = roleId - 9000000;
        roleId = roleId * -1;
      }
      permission.roleId = roleId;
      const docSend = {
        id: this.documentId,
        permissions: [permission],
      };
      this.cs.updateDocumentSecurity(docSend).subscribe(data => {
        this.updateDocumentSecurity(data);
        if (this.addFolderPermissionDisplay === true) {
          this.tr.presentToast(this.translate.instant('Added Successfully'));
          this.addFolderPermissionDisplay = false;
        } else {
          this.tr.presentToast(this.translate.instant('Edited Successfully'));
          this.editFolderPermission = false;
        }
      });
    } else {
      this.tr.presentToast(this.translate.instant('Please select the role'));
    }
  }
  accessLevelChanged(event) {
    // console.log(event);
    this.addPermissionForm.patchValue({ accessMask: event });

  }
  autoCompleteKeyUp(event) {
    if (event.target.value !== undefined) {
      let stringTyped = '';
      this.selectedRoleObject = undefined;
      stringTyped = event.target.value;
      if (stringTyped.length > 2) {
        this.us.searchRoles(stringTyped).subscribe(data => this.getAllRoles(data));
      }
    } else {
      this.selectedRoleObject = undefined;
      this.getroleList = [];
      console.log(this.selectedRoleObject);
    }
  }
  getAllRoles(data) {
    this.getroleList = [];
    const getrolecategory = JSON.parse(data._body);
    for (let index = 0; index < getrolecategory.length; index++) {
      this.getroleList.push({
        'value': getrolecategory[index].id,
        'name': getrolecategory[index].name
      });
    }
  }
  selectRoleName(value) {
    this.addPermissionForm.patchValue({ granteeName: value.name });
    this.selectedRoleObject = value;
    console.log(this.selectedRoleObject);
    this.getroleList = [];
  }
  cancelAdd() {
    this.addFolderPermissionDisplay = false;
    this.editFolderPermission = false;
    this.addPermissionForm.reset();
  }
  showAnnoataionImage(image) {
    if (image.type === 'IMAGE') {
      this.tab.select(1);
      setTimeout(() => {
        this.events.publish('imageObjects', image);
      }, 100);
    } else {
      this.tr.presentToast(this.translate.instant('You can view only image anntoations!'));
    }
  }
  downloadDocuments(docs) {
    this.cs.downloadThisDocument(docs.id, docs.docTitle);
  }
  getDocumentActionsResult(data) {
    this.documentActionsList = [];
    this.documentActionsList = JSON.parse(data._body);
    for (let i = 0; i < this.documentActionsList.length; i++) {
      if (this.documentActionsList[i] === 'PERMISSION') {
        this.showEdit = true;
        break;
      } else {
        this.showEdit = false;
      }
    }
  }
  getDocumentHistoryResult(data) {
    if (JSON.parse(data._body).length > 0) {
      this.showDocumentHistory = JSON.parse(data._body);
    }
  }
  getDocumentLinksResult(datares) {
    this.documentLinkList = JSON.parse(datares._body);
  }
}
