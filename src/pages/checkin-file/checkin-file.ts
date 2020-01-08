import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ContentService } from '../../services/content.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CheckinFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin-file',
  templateUrl: 'checkin-file.html',
})
export class CheckinFilePage implements OnInit {
public documentId = undefined;
public docProperty: any;
public documentPropertyProps = [];
public docPropertyName;
public docisReserved;
public checkInForm: FormGroup;
public attachmentfileName = '';
public attachmentfile;
public rtlSupport = 'ltr';
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private cs: ContentService, private fb: FormBuilder, private tr: ToastService, private translate: TranslateService ) {
    this.documentId = this.navParams.get('documentId');
    if(localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
    } else {
      this.rtlSupport = 'ltr';
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CheckinFilePage');
  }
  ngOnInit() {
this.cs.getThisDocument(this.documentId).subscribe(data => {this.getPropertyDetail(data)});
this.checkInForm = this.fb.group({});
  }
  getPropertyDetail(data) {
    if (data._body  !== '' ) {
      this.docProperty = JSON.parse(data._body);
      this.documentPropertyProps = this.docProperty.props;
      this.docPropertyName = this.docProperty.docclass;
      this.docisReserved = this.docProperty.isReserved;
    }
  }
  close() {
    this.viewCtrl.dismiss('closed');

  }
  checkInSubmit(event) {
    if(this.attachmentfileName !== '') {
    const docInfo = {
      id: this.docProperty.id,
      creator: this.docProperty.creator,
      addOn: this.docProperty.addOn,
      modOn: this.docProperty.modOn,
      docclass: this.docProperty.docclass,
      props: [],
      accessPolicies: []
      };
      for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))) {
        if (inputField.getAttribute('type') !== 'file') {
            for (const prop of this.docProperty.props) {
                if (inputField.id !== undefined && inputField.id === prop.symName) {
                  const property = {'symName': prop.symName, 'dtype': prop.dtype, 'mvalues': [inputField.childNodes[1].value], mtype: prop.mtype,
                  len: prop.len, rOnly: prop.rOnly, hidden: prop.hidden , req: prop.req, ltype: prop.ltype};
                  docInfo.props.push(property);
              }
          }
        }
      }

    //   for (const selectField of [].slice.call(event.target.getElementsByTagName('select'))) {
    //      for ( const selectPick of this.docProperty.props) {
    //          if (selectField.name !== undefined && selectField.name === selectPick.symName) {
    //              if (selectField.options.selectedIndex !== -1) {
    //               const selectChange = {'symName': selectPick.symName, 'dtype': selectPick.dtype, 'mvalues': [selectField.value],
    //                mtype: selectField.options[selectField.options.selectedIndex].value,
    //               len: selectPick.len, rOnly: selectPick.rOnly, hidden: selectPick.hidden , req: selectPick.req, ltype: selectPick.ltype};
    //               docInfo.props.push(selectChange);
    //              }
    //          }
    //      }
    //  }
     for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-datetime'))) {
      if (inputField.getAttribute('type') !== 'file') {
        for (const datepick of this.docProperty.props) {
              if (inputField.id !== undefined && inputField.id === datepick.symName) {
                const property = {'symName': datepick.symName, 'dtype': datepick.dtype,
                'mvalues': [inputField.textContent],
                len: datepick.len, rOnly: datepick.rOnly, hidden: datepick.hidden , req: datepick.req, ltype: datepick.ltype};
                docInfo.props.push(property);
              }
          }
      }
    }        const formData = new FormData();
      formData.append('DocInfo', JSON.stringify(docInfo));
      formData.append('file', this.attachmentfile);
      // console.log(docInfo);
   this.cs.checkIn(formData).subscribe(data => this.getCheckIn(data) );
  } else {
    this.tr.presentToast(this.translate.instant('Please Attach Document'));
  }
  }
  getCheckIn(data) {
    this.tr.presentToast(this.translate.instant('Document Checked-in'));
    this.viewCtrl.dismiss('added');
  }
  removeFile() {
    this.attachmentfile = null;
    this.attachmentfileName = '';
  }
  fileChanged(event) {
    this.attachmentfile = null;
    if(event.target.files.length > 0) {
    this.attachmentfile = event.target.files[0];
     this.attachmentfileName = this.attachmentfile.name;
    //  console.log(this.attachmentfileName);
    }else {
      // console.log(this.attachmentfileName);
    }
  }
  lookupChanged(event) {

  }
}
