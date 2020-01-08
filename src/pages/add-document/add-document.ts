import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { ToastService } from '../../services/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../services/menu-service';
import { LoadingService } from '../../services/loading-service';

/**
 * Generated class for the AddDocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-document',
  templateUrl: 'add-document.html',
})
export class AddDocumentPage implements OnInit{
  public repoId = undefined;
  public folderId = undefined;
  public addNewDocument: FormGroup;
  public documentClass: any;
  public documentClassDropdown = [];
  public documentClassProp: any;
  public attachmentfileName = '';
  public attachmentfile: any;
  public documentClassDropdownSelected;
  public animateItems = [];
  public animateClass: any;
  public rtlSupport = 'ltr';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private fb: FormBuilder, private cs:ContentService,
    private tr: ToastService, private translate: TranslateService, private loading:LoadingService) {
  this.repoId =   this.navParams.get('repoId');
  this.folderId = this.navParams.get('folderId');
  this.animateClass = { 'fade-in-left-item': true };
  }
  ngOnInit() {
    this.addNewDocument = this.fb.group({
      documentAttach: [null],
      documentClass: [null],
      documentname: [''],
    });
    this.cs.getDocumentClasses().subscribe(data => this.documentClasses(data) );
    if(localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
    } else {
      this.rtlSupport = 'ltr';
    }

  }
  documentClasses(data) {
    this.documentClass = [];
    this.documentClassProp = [];
    if (data._body !== '') {
      this.documentClass = JSON.parse(data._body);
      this.documentClassDropdownSelected = this.documentClass[0].symName;
      for (let index = 0; index < this.documentClass.length; index++) {
        this.documentClassDropdown.push({label: this.documentClass[index].name, value: this.documentClass[index].symName});
      }
      this.addNewDocument.patchValue({
        documentname:  this.documentClass[0].symName
      });
     this.documentClassProp =  this.documentClass[0].props;
     for(const required of this.documentClass[0].props) {
      if(required.req === 'true' || required.req === 'TRUE') {
        const control: FormControl = new FormControl(null, Validators.required);
                          this.addNewDocument.addControl(required.symName, control);
                      } else {
                          const control: FormControl = new FormControl(null);
                          this.addNewDocument.addControl(required.symName, control);
                      }
     }
    }
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddDocumentPage');
  }
close() {
  this.attachmentfile = null;
  this.attachmentfileName = '';
  this.viewCtrl.dismiss('closed');
}
documentSubmit(event) {
if(this.attachmentfileName !== '') {
  if (this.addNewDocument.controls.documentname.value !== null ) {
    let name = '';
    let symName = '';
    const dtype = '';
    for (let index = 0; index < this.documentClass.length; index++) {
      if (this.documentClass[index].symName === this.documentClassDropdownSelected) {
        symName = this.documentClass[index].symName;
       name = this.documentClass[index].name;
      }
    }
    const addDoc = {
      'docclass': symName,
       'folder': this.folderId,
      'props': [],
    };
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const docClass of this.documentClass) {
          for (const prop of docClass.props) {
            if (symName === docClass.symName) {
              if (inputField.id !== undefined && inputField.id === prop.symName) {
                const property = {'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.childNodes[1].value]};
                addDoc.props.push(property);
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
                const property = {'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.textContent]};
                addDoc.props.push(property);
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
                const property = {'symName': datepick.symName, 'dtype': datepick.dtype,
                'mvalues': [inputField.textContent],
                len: datepick.len, rOnly: datepick.rOnly, hidden: datepick.hidden , req: datepick.req, ltype: datepick.ltype};
                addDoc.props.push(property);
              }
            }
          }
        }
      }
    }
let formdata = new FormData();
formdata.append('DocInfo', JSON.stringify(addDoc));
formdata.append('file',  this.attachmentfile);
this.loading.show();
 this.cs.addDocument(formdata).subscribe( data => {this.documentUpload(data); this.loading.hide()}, erroe => {this.loading.hide()});
}

} else {
  this.tr.presentToast(this.translate.instant('Please Attach Document'));
}
}
documentUpload(data) {
  this.attachmentfile = null;
  this.attachmentfileName = '';
  this.viewCtrl.dismiss('added');
}
fileChanged(event){
  this.attachmentfile = null;
  if(event.target.files.length > 0) {
  this.attachmentfile = event.target.files[0];
   this.attachmentfileName = this.attachmentfile.name;
   console.log(this.attachmentfileName);
  }else {
    console.log(this.attachmentfileName);
  }
}
removeFile() {
  this.attachmentfile = null;
  this.attachmentfileName = '';
}
documentClassChange(event) {
  for (const prop of this.documentClass) {
    if (prop.symName === this.documentClassDropdownSelected) {
      this.documentClassProp = prop.props;
      if(prop.lookups !== undefined) {
        this.addNewDocument.controls[prop.mvalues[0].value].patchValue(prop.value[0].value);
      }
      for(const required of this.documentClassProp) {
        if(required.req === 'true') {
          const control: FormControl = new FormControl(null, Validators.required);
                            this.addNewDocument.addControl(required.symName, control);
                        } else {
                            const control: FormControl = new FormControl(null);
                            this.addNewDocument.addControl(required.symName, control);
                        }
       }
    }
  }
}
lookupDrop(event) {
  // console.log(event);
}
}
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
