import { Component, OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ContentService } from '../../services/content.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the FolderPermissionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-folder-permissions',
  templateUrl: 'folder-permissions.html',
})
export class FolderPermissionsPage implements OnInit{
public folderId = undefined;
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
// public rtlSupport = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private viewCtrl: ViewController, private cs: ContentService,
     private fb:FormBuilder, private us: UserService, private tr: ToastService, private renderer:Renderer, private translate: TranslateService ) {
    this.folderId = this.navParams.get('folderId');
    this.animateClass = { 'fade-in-left-item': true };
    this.folderPermissionModelDropdown.push({label: 'View', value: 1});
    this.folderPermissionModelDropdown.push({label:'Modify', value: 3});
    this.folderPermissionModelDropdown.push({label: 'Create', value: 7});
    this.folderPermissionModelDropdown.push({label: 'File', value: 15});
    this.folderPermissionModelDropdown.push({label:'Unfile', value: 31});
    this.folderPermissionModelDropdown.push({label: 'Permission', value: 63});
    this.folderPermissionModelDropdown.push({label: 'Delete', value: 127});
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FolderPermissionsPage');
    this.cs.getFolder(this.folderId).subscribe(data => {this.getFolderPermissionDetails(data)});
    // if(localStorage.getItem('language') === 'ar') {
    //   this.rtlSupport = true;
    // } else {
    //   this.rtlSupport = false;
    // }
  }
  ngOnInit() {
    this.addPermissionForm = this.fb.group({
      accessLevel: [null, Validators.compose([Validators.required])],
      granteeName: [null, Validators.compose([Validators.required])],
      permissionSource: [1, Validators.compose([Validators.required])],
      roleId: [null, Validators.compose([Validators.required])],
      accessMask:  [1, Validators.compose([Validators.required])],
      });

  }
  getFolderPermissionDetails(data) {
    this.addFolderPermissionDisplay = false;
    this.editFolderPermission = false;
    const folderPermission =  JSON.parse(data._body);
    this.folderPermission = folderPermission.permissions;
  }
  close() {
this.viewCtrl.dismiss('colse');
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
  accessLevel:  permissions.accessLevel,
  accessMask: permissions.accessMask,
  granteeName: permissions.granteeName,
  permissionSource: permissions.permissionSource,
  roleId: permissions.roleId,
});
// this.setroleList = {'value': permissions.roleId,
// 'name':  permissions.granteeName
// };
this.selectedRoleObject = {'value': permissions.roleId,
'name':  permissions.granteeName
};
this.addFolderPermissionDisplay = false;
this.editFolderPermission = true;
  }
  folderDeletePermissions(permissions) {
    const setAccessMask = permissions;
    setAccessMask.accessMask = 0;
    const docSend = {
      id: this.folderId,
      permissions: [setAccessMask],
  };
  this.cs.updateFolderSecurity(docSend).subscribe(data => {this.updateFolderSecurity(data); this.tr.presentToast(this.translate.instant('Deleted Successfully'))} );
  }
  submitFolderPermission() {
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
        id: this.folderId,
        permissions: [permission],
      };
      this.cs.updateFolderSecurity(docSend).subscribe(data => {this.updateFolderSecurity(data);
        if(this.addFolderPermissionDisplay === true) {
          this.tr.presentToast(this.translate.instant('Added Successfully'));
          this.addFolderPermissionDisplay = false;
        } else {
          this.tr.presentToast(this.translate.instant('Edited Successfully'));
          this.editFolderPermission = false;
        }
        } );
    } else {
      this.tr.presentToast(this.translate.instant('Please select the role'));
    }
  }
  updateFolderSecurity(data) {
    this.cs.getFolder(this.folderId).subscribe(datares => this.getFolderPermissionDetails(datares));
  }
  accessLevelChanged(event) {
    console.log(event);
    this.addPermissionForm.patchValue({accessMask: event});

  }
  autoCompleteKeyUp(event) {
    if(event.target.value !== undefined) {
    let stringTyped = '';
    this.selectedRoleObject = undefined;
    stringTyped = event.target.value;
    if (stringTyped.length > 2) {
      this.us.searchRoles(stringTyped).subscribe(data => this.getAllRoles(data) );
    }
  } else {
    this.selectedRoleObject = undefined;
    this.getroleList = [];
    console.log(this.selectedRoleObject);
  }
  }
  getAllRoles(data) {
    this.getroleList = [];
    const getrolecategory  = JSON.parse(data._body);
    for (let index = 0; index < getrolecategory.length; index++) {
      this.getroleList.push({
        'value': getrolecategory[index].id,
        'name':  getrolecategory[index].name
       });
    }
  }
  selectRoleName(value) {
    this.addPermissionForm.patchValue({granteeName: value.name});
    this.selectedRoleObject = value;
    console.log(this.selectedRoleObject);
   this.getroleList = [];
  }
  cancelAdd() {
    this.addFolderPermissionDisplay = false;
    this.editFolderPermission = false;
    this.addPermissionForm.reset();
  }
}
