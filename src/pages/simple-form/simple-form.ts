import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SimpleFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-simple-form',
  templateUrl: 'simple-form.html',
})
export class SimpleFormPage implements OnInit {
  public templateName: any;
  public responseSelectProps: any;
  public tempelateRender: FormGroup;
  public rtlSupport = 'ltr';
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public translate: TranslateService,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.tempelateRender = this.fb.group({});
    this.templateName = this.navParams.get('templateName');
    this.responseSelectProps = this.navParams.get('responseSelectProps');
    this.fillForms();
  }
  fillForms() {
    if (this.responseSelectProps) {
      for (let index = 0; index < this.responseSelectProps.length; index++) {
        if (this.responseSelectProps[index].req === 'TRUE') {
          const control: FormControl = new FormControl(null, Validators.required);
          this.tempelateRender.addControl(this.responseSelectProps[index].name, control);
        } else {
          const control: FormControl = new FormControl(null);
          this.tempelateRender.addControl(this.responseSelectProps[index].name, control);
        }
      }
      for (let index = 0; index < this.responseSelectProps.length; index++) {
        if (this.responseSelectProps[index].uitype.uitype === 'TEXT') {
          if (this.responseSelectProps[index].value.length !== 0) {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
          } else {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
          }
        } else if (this.responseSelectProps[index].uitype.uitype === 'LOOKUP') {
          if (this.responseSelectProps[index].value.length !== 0) {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
          } else {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].lookups[0].value);
          }
        } else if (this.responseSelectProps[index].uitype.uitype === 'DATE') {
          this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].lookups[0].value);
        } else if (this.responseSelectProps[index].uitype.uitype === 'NUMBER') {
          if (this.responseSelectProps[index].value.length !== 0) {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
          } else {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
          }
        } else if (this.responseSelectProps[index].uitype.uitype === 'TEXTAREA') {
          if (this.responseSelectProps[index].value.length !== 0) {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
          } else {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
          }
        } else if (this.responseSelectProps[index].uitype.uitype === 'CHECKBOX') {
          if (this.responseSelectProps[index].value.length !== 0) {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value[0].value);
          } else {
            this.tempelateRender.controls[this.responseSelectProps[index].name].patchValue(this.responseSelectProps[index].value);
          }
        } else { }
      }
    }
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SimpleFormPage');
  }
  close() {
    this.viewCtrl.dismiss('closed');
  }
  activityComplete(event) {
    for (const inputField of [].slice.call(event.target)) {
      for (let index = 0; index < this.responseSelectProps.length; index++) {
        if (inputField.id === this.responseSelectProps[index].name) {
          this.responseSelectProps[index].value = [
            {
              'value': inputField.value
            }
          ];
        }
        delete this.responseSelectProps[index].dbValue;
        delete this.responseSelectProps[index].dbDummyValue;
        delete this.responseSelectProps[index].lookupOptions;
      }
    }
    for (
      const inputField of [].slice.call(event.target.getElementsByTagName('ion-datetime'))
    ) {
      for (let index = 0; index < this.responseSelectProps.length; index++) {
        if (inputField.id === this.responseSelectProps[index].name) {
          this.responseSelectProps[index].value = [
            {
              'value': inputField.textContent
            }
          ];
        }
      }
    }
    for (
      const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))
    ) {
      for (let index = 0; index < this.responseSelectProps.length; index++) {
        if (inputField.id === this.responseSelectProps[index].name) {
          this.responseSelectProps[index].value = [
            {
              'value': inputField.childNodes[1].value
            }
          ];
        }
      }
    }
    for (
      const inputField of [].slice.call(event.target.getElementsByTagName('ion-textarea'))
    ) {
      for (let index = 0; index < this.responseSelectProps.length; index++) {
        if (inputField.id === this.responseSelectProps[index].name) {
          this.responseSelectProps[index].value = [
            {
              'value': inputField.children['0'].value
            }
          ];
        }
      }
    }
    this.viewCtrl.dismiss(this.responseSelectProps);
  }
  dbLookupDropdown(res, k) {
    this.responseSelectProps.properties[k].value = [];
    this.responseSelectProps.properties[k].value.push({
      label: res.label,
      value: res.value
    });
  }
}
