import { Component, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DocumentService } from '../../services/document.service';
import { ToastService } from '../../services/toast-service';
import { UserService } from '../../services/user.service';
import { SchemaService } from '../../services/schema.service';
import { IntegrationService } from '../../services/integration.service';
import { WorkService } from '../../services/work.service';
import { LoadingService } from '../../services/loading-service';
import { DummyTable } from '../../app/models/dummy-table.model';

/**
 * Generated class for the DynamicFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.html'
})
export class DynamicFormComponent implements OnChanges {
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  @Input() readOnly;
  @Input() createformtitle;
  @Input() activityType;
  @Input() dynamicFormJSON;
  @Output() formJSONOutput = new EventEmitter();
  @Output() formCancel = new EventEmitter();
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
  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService,
    private menuCtrl: MenuController, private ss: SchemaService, private fb: FormBuilder, private ds: DocumentService,
    private integrationservice: IntegrationService, private us: UserService, private tr: ToastService,
    private loading: LoadingService, private ws: WorkService, public events: Events) {

  }
  formDynamicSubmit(event) {
    for (const inputField of [].slice.call(event.target)) {
      for (const docClass of this.formObject) {
        docClass.sections.forEach(element => {
          if (element.type === 'FORM') {
            for (const cols of element.columns) {
              for (const props of cols.properties) {
                if (inputField.id === props.name) {
                  props.value = [{
                    'value': inputField.value
                  }];
                }
                delete props.dbValue;
                delete props.dbDummyValue;
                delete props.lookupOptions;
                for (const value of props.value) {
                  delete value._$visited;
                }
              }
            }
          } else if (element.type === 'TABLE') {
            for (let iTable = 0; iTable < element.rows.length; iTable++) {
              for (let jTable = 0; jTable < element.rows[iTable].items.length; jTable++) {
                if (inputField.id === (element.rows[iTable].items[jTable].name + jTable)) {
                  element.rows[iTable].items[jTable].value = [{
                    'value': inputField.value
                  }];
                }
                delete element.rows[iTable].items[jTable].dbValue;
                delete element.rows[iTable].items[jTable].dbDummyValue;
                delete element.rows[iTable].items[jTable].lookupOptions;
                delete element.rows[iTable].items[jTable].rOnly;
                delete element.rows[iTable].items[jTable].req;
                delete element.rows[iTable].items[jTable].label;
                delete element.rows[iTable].items[jTable].type;
                delete element.rows[iTable].items[jTable].length;
                delete element.rows[iTable].items[jTable].lookup;
              }
            }
          } else {

          }
        });
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-input'))) {
      for (const docClass of this.formObject) {
        docClass.sections.forEach(element => {
          if (element.type === 'FORM') {
            for (const cols of element.columns) {
              for (const props of cols.properties) {
                if (inputField.id === props.name) {
                  props.value = [{
                    'value': inputField.childNodes[1].value
                  }];
                }
              }
            }
          } else if (element.type === 'TABLE') {
            for (let iTable = 0; iTable < element.rows.length; iTable++) {
              for (let jTable = 0; jTable < element.rows[iTable].items.length; jTable++) {
                if (inputField.id === (element.rows[iTable].items[jTable].name + (element.rows[iTable].row))) {
                  element.rows[iTable].items[jTable].value = [{
                    'value': inputField.children['0'].value
                  }];
                }
              }
            }
          }
        });
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-textarea'))) {
      for (const docClass of this.formObject) {
        docClass.sections.forEach(element => {
          if (element.type === 'FORM') {
            for (const cols of element.columns) {
              for (const props of cols.properties) {
                if (inputField.id === props.name) {
                  props.value = [{
                    'value': inputField.children['0'].value
                  }];
                }
              }
            }
          } else if (element.type === 'TABLE') {
            for (let iTable = 0; iTable < element.rows.length; iTable++) {
              for (let jTable = 0; jTable < element.rows[iTable].items.length; jTable++) {
                if (inputField.id === (element.rows[iTable].items[jTable].name + (element.rows[iTable].row))) {
                  element.rows[iTable].items[jTable].value = [{
                    'value': inputField.children['0'].value
                  }];
                }
              }
            }
          }
        });
      }
    }
    for (const inputField of [].slice.call(event.target.getElementsByTagName('ion-datetime'))) {
      for (const docClass of this.formObject) {
        docClass.sections.forEach(element => {
          if (element.type === 'FORM') {
            for (const cols of element.columns) {
              for (const props of cols.properties) {
                if (inputField.id === props.name) {

                  props.value = [{
                    'value': inputField.textContent
                  }];
                }
              }
            }
          } else if (element.type === 'TABLE') {
            for (let iTable = 0; iTable < element.rows.length; iTable++) {
              for (let jTable = 0; jTable < element.rows[iTable].items.length; jTable++) {
                if (inputField.id === (element.rows[iTable].items[jTable].name + (element.rows[iTable].row))) {
                  element.rows[iTable].items[jTable].value = [{
                    'value': inputField.textContent
                    // children[1].value
                  }];
                }
              }
            }
          }
        });
      }
    }
    this.formJSONOutput.emit(this.formObject);

    // console.log(this.formObject);

    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'FORM') {
          for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
            for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
              //   console.log( this.formObjectSubmit[index].sections[i].columns[j].properties[k].value);
              this.formObjectSubmit[index].sections[i].columns[j].properties[k].value = this.formObject[index].sections[i].columns[j].properties[k].value;
            }
          }
        } else if (this.formObject[index].sections[i].type === 'TABLE') {
          // for (let j = 0; j < this.formObject[index].sections[i].rows.length; j++) {
          //   for (let k = 0; k < this.formObject[index].sections[i].rows[j].items.length; k++) {
          //     this.formObjectSubmit[index].sections[i].rows[j].items[k].value = this.formObject[index].sections[i].rows[j].items[k].value;
          //   }
          // }
          this.formObjectSubmit[index].sections[i] = this.formObject[index].sections[i];
        } else {

        }
      }
    }
  }
  converToUppercase(string) {
    if (string) {
      return string.toUpperCase();
    }
  }
  actionAutoFill(event, prop) {
    if (prop.actions && event.target.value.length > 0 && prop.actions.length > 0) {
      const count = 0;
      this.callAutoFillForActions(event.target.value, prop, count);
    }
  }
  actionAutofillDisabled(event, prop) {
    if (prop.actions && event && prop.actions.length > 0) {
      const count = 0;
      this.callAutoFillForActions(event, prop, count);
    }
  }
  actionAutoFillLookup(event, prop) {
    if (prop.actions && event.length > 0 && prop.actions.length > 0) {
      const count = 0;
      this.callAutoFillForActions(event, prop, count);
    }
  }
  actionAutoFillSTEXTTA(event, prop) {
    if (prop.actions && event.value.name.length > 0 && prop.actions.length > 0) {
      const count = 0;
      this.callAutoFillForActions(event.value.name, prop, count);
    }
  }
  callAutoFillForActions(event, prop, count) {
    if (count < prop.actions.length) {
      if (event) {
        const autoFillComplete = prop.actions[count].autofill;
        autoFillComplete.fillparams = [];
        // autoFillComplete.fillparams.push(event.target.value);
        const value = prop.actions[count].autofill.sql.split('{$');
        const subArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].includes('}')) {
            subArray.push(value[i].split('}')[0]);
          }
        }
        for (let arr = 0; arr < subArray.length; arr++) {
          for (let index = 0; index < this.formObject.length; index++) {
            for (let i = 0; i < this.formObject[index].sections.length; i++) {
              if (this.formObject[index].sections[i].type === 'FORM') {
                for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
                  for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
                    if (this.formObject[index].sections[i].columns[j].properties[k].name === subArray[arr]) {
                      const formControlName = this.formObject[index].sections[i].columns[j].properties[k].name;
                      const fillParamObjct = {
                        key: this.formObject[index].sections[i].columns[j].properties[k].name,
                        value: this.dynamicform.controls[formControlName].value
                      };
                      autoFillComplete.fillparams.push(fillParamObjct);
                    }
                  }
                }
              }
            }
          }
        }
        this.integrationservice.getDBAutoFill(autoFillComplete).subscribe(data => this.getDBAutoFill(data, prop.actions[count]), error => { if (prop.type !== 'DATE') { this.resetDBAutoFill(prop.actions[count]); } });
      }
    }
  }

  getActionDBAutoFill(data, prop, count, event) {
    const keyValuePair = JSON.parse(data._body);
    if (keyValuePair.length > 0) {
      for (let keyindex = 0; keyindex < keyValuePair.length; keyindex++) {
        for (let index = 0; index < this.formObject.length; index++) {
          for (let i = 0; i < this.formObject[index].sections.length; i++) {
            if (this.formObject[index].sections[i].type === 'FORM') {
              for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
                for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
                  if (this.converToUppercase(this.formObject[index].sections[i].columns[j].properties[k].name) === this.converToUppercase(keyValuePair[keyindex].key)) {
                    this.dynamicform.controls[this.formObject[index].sections[i].columns[j].properties[k].name].patchValue(keyValuePair[keyindex].value);
                    this.formObject[index].sections[i].columns[j].properties[k].value = [];
                    this.formObject[index].sections[i].columns[j].properties[k].value.push({ 'value': keyValuePair[keyindex].value });
                  }
                }
              }
            } else {
              for (let a = 0; a < this.formObject[index].sections[i].rows.length; a++) {
                for (let it = 0; it < this.formObject[index].sections[i].rows[a].items.length; it++) {
                  if (this.converToUppercase(this.formObject[index].sections[i].rows[a].items[it].name) === this.converToUppercase(keyValuePair[keyindex].key)) {
                    this.dynamicform.controls[this.formObject[index].sections[i].rows[a].items[it].name + this.formObject[index].sections[i].rows[a].row].patchValue(keyValuePair[keyindex].value);
                    this.formObject[index].sections[i].rows[a].items[it].value = [];
                    this.formObject[index].sections[i].rows[a].items[it].value.push({ 'value': keyValuePair[keyindex].value });
                  }
                }
              }
            }
          }
        }
      }
    }
    // this.callAutoFillForActions(event.target.value, prop, count);
  }
  getDBAutoFill(data, prop) {
    const keyValuePair = JSON.parse(data._body);
    if (keyValuePair.length > 0) {
      for (let keyindex = 0; keyindex < keyValuePair.length; keyindex++) {
        for (let index = 0; index < this.formObject.length; index++) {
          for (let i = 0; i < this.formObject[index].sections.length; i++) {
            if (this.formObject[index].sections[i].type === 'FORM') {
              for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
                for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
                  if (this.converToUppercase(this.formObject[index].sections[i].columns[j].properties[k].name) === this.converToUppercase(keyValuePair[keyindex].key)) {
                    this.dynamicform.controls[this.formObject[index].sections[i].columns[j].properties[k].name].patchValue(keyValuePair[keyindex].value);
                    this.formObject[index].sections[i].columns[j].properties[k].value = [];
                    this.formObject[index].sections[i].columns[j].properties[k].value.push({ 'value': keyValuePair[keyindex].value });
                  }
                }
              }
            } else {
              for (let a = 0; a < this.formObject[index].sections[i].rows.length; a++) {
                for (let it = 0; it < this.formObject[index].sections[i].rows[a].items.length; it++) {
                  if (this.converToUppercase(this.formObject[index].sections[i].rows[a].items[it].name) === this.converToUppercase(keyValuePair[keyindex].key)) {
                    this.dynamicform.controls[this.formObject[index].sections[i].rows[a].items[it].name + this.formObject[index].sections[i].rows[a].row].patchValue(keyValuePair[keyindex].value);
                    this.formObject[index].sections[i].rows[a].items[it].value = [];
                    this.formObject[index].sections[i].rows[a].items[it].value.push({ 'value': keyValuePair[keyindex].value });
                  }
                }
              }
            }
          }
        }
      }
    } else {
      this.resetDBAutoFill(prop);
    }
  }
  resetDBAutoFill(props) {
    for (let keyindex = 0; keyindex < props.autofill.fillprops.length; keyindex++) {
      for (let index = 0; index < this.formObject.length; index++) {
        for (let i = 0; i < this.formObject[index].sections.length; i++) {
          if (this.formObject[index].sections[i].type === 'FORM') {
            for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
              for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
                if (this.formObject[index].sections[i].columns[j].properties[k].name === props.autofill.fillprops[keyindex]) {
                  this.dynamicform.controls[this.formObject[index].sections[i].columns[j].properties[k].name].patchValue(null);
                  this.formObject[index].sections[i].columns[j].properties[k].value = [];
                }
              }
            }
          }
        }
      }
    }
  }
  onSearchAutoStextTATable(event, dBlookUp, sectionValue, columnvalue, propvalue) {
    if (event) {
      dBlookUp.filter = event.text;
      let keyUp: String;
      let newRole = {};
      keyUp = event.text;
      if (keyUp.length > 2) {
        this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].dbValue = [];
        newRole = {
          'value': '',
          'name': event.text
        };
        this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].dbValue.push(newRole);
        setTimeout(() => {
          this.integrationservice.getDBTypeAhead(dBlookUp).subscribe(res => this.assinDBTypeAheadAutoTable(res, sectionValue, columnvalue, propvalue));
        }, 100);
        this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].value = [];
        this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].value.push({ 'name': event.text, 'value': '' });
      }
    }
  }

  assinDBTypeAheadAutoTable(res, sectionValue, columnvalue, propvalue) {
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].rows) {
          for (let j = 0; j < this.formObject[index].sections[i].rows.length; j++) {
            for (let k = 0; k < this.formObject[index].sections[i].rows[j].items.length; k++) {
              if (sectionValue === i && columnvalue === j && propvalue === k) {
                //  this.formObject[index].sections[i].columns[j].properties[k].dbValue = JSON.parse(res._body);
                if ((this.createformtitle === 'Incoming Correspondence' && (this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].name === 'to' || this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].name === 'cc'))
                  || (this.createformtitle === 'Outgoing Correspondence' && this.formObject[0].sections[sectionValue].rows[columnvalue].items[propvalue].name === 'from') || (this.createformtitle === 'Memo')) {
                  this.formObject[0].sections[i].rows[j].items[k].dbValue = [];
                }
                let value;
                value = JSON.parse(res._body);
                for (let val = 0; val < value.length; val++) {
                  const element = {
                    'value': value[val].value,
                    'name': value[val].label
                  };
                  this.formObject[index].sections[i].rows[j].items[k].dbValue.push(element);
                  // this.dropdownList.push(element);
                }
              }
            }
          }
        }
      }
    }
  }

  onSearchAuto(event, dBlookUp, sectionValue, columnvalue, propvalue) {
    dBlookUp.filter = event.text;
    let keyUp: String;
    let newRole = {};
    keyUp = event.text;
    if (keyUp.length > 2) {
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].dbValue = [];
      newRole = {
        'value': '',
        'name': event.text
      };
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].dbValue.push(newRole);
      setTimeout(() => {
        this.integrationservice.getDBTypeAhead(dBlookUp).subscribe(res => this.assinDBTypeAheadAuto(res, sectionValue, columnvalue, propvalue));
      }, 100);
    }
  }
  calculateExpiryDate(event, prop) {
    let value1;
    let value2;
    for (let i = 0; i < this.formObject[0].sections.length; i++) {
      if (this.formObject[0].sections[i].type === 'FORM') {
        for (let a = 0; a < this.formObject[0].sections[i].columns.length; a++) {
          for (let b = 0; b < this.formObject[0].sections[i].columns[a].properties.length; b++) {
            if (this.formObject[0].sections[i].columns[a].properties[b].uitype.uitype === 'ROWEXPIRYDATE') {
              for (let e = 0; e < this.formObject[0].sections[i].columns[a].properties[b].uitype.calc.length; e++) {
                if (this.formObject[0].sections[i].columns[a].properties[b].uitype.calc[e] === prop.name) {
                  if (this.dynamicform.controls[prop.name].value) {
                    value1 = prop;
                  } else {
                    value1 = 'value';
                  }
                }
              }
              for (let aa = 0; aa < this.formObject[0].sections[i].columns.length; aa++) {
                for (let bb = 0; bb < this.formObject[0].sections[i].columns[aa].properties.length; bb++) {
                  if (this.formObject[0].sections[i].columns[aa].properties[bb].uitype.uitype === 'DATE' || this.formObject[0].sections[i].columns[aa].properties[bb].uitype.uitype === 'NUMBER') {
                    for (let ee = 0; ee < this.formObject[0].sections[i].columns[a].properties[b].uitype.calc.length; ee++) {
                      if (this.formObject[0].sections[i].columns[aa].properties[bb].name === this.formObject[0].sections[i].columns[a].properties[b].uitype.calc[ee] && prop.name !== this.formObject[0].sections[i].columns[a].properties[b].uitype.calc[ee]) {
                        if (this.dynamicform.controls[this.formObject[0].sections[i].columns[aa].properties[bb].name].value) {
                          value2 = this.formObject[0].sections[i].columns[aa].properties[bb];
                        } else {
                          value2 = 'value';
                        }
                      }
                    }
                  }
                }
              }
              if (value1 !== 'value' && value2 !== 'value' && (value1 && value2)) {
                if (value1.type === 'DATE') {
                  const thisvalue = this.dynamicform.controls[value1.name].value;
                  const dateFormat = thisvalue.split('-')[1] + '/' + thisvalue.split('-')[2] + '/' + thisvalue.split('-')[0];
                  const date = new Date(dateFormat);
                  date.setDate(date.getDate() + (+this.dynamicform.controls[value2.name].value));
                  const dateFormated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                  let dateValue = new Date(dateFormated).toISOString()
                  const formControlName = this.formObject[0].sections[i].columns[a].properties[b].name;
                  this.dynamicform.controls[formControlName].patchValue(dateValue);
                } else {
                  const thisvalue = this.dynamicform.controls[value2.name].value;
                  const dateFormat = thisvalue.split('-')[1] + '/' + thisvalue.split('-')[2] + '/' + thisvalue.split('-')[0];
                  const date = new Date(dateFormat);
                  date.setDate(date.getDate() + (+this.dynamicform.controls[value1.name].value));
                  const dateFormated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                  let dateValue = new Date(dateFormated).toISOString()
                  const formControlName = this.formObject[0].sections[i].columns[a].properties[b].name;
                  this.dynamicform.controls[formControlName].patchValue(dateValue);
                }
              } else if ((value1 === 'value') || (value2 === 'value')) {
                const formControlName = this.formObject[0].sections[i].columns[a].properties[b].name;
                this.dynamicform.controls[formControlName].patchValue(null);
              }
            }
          }
        }
      }
    }
  }
  eventCalculateForForms(event, section, columns, prop, ind, i, j, k) {
    for (let a = 0; a < this.formObject[0].sections.length; a++) {
      if (this.formObject[0].sections[a].type === 'FORM') {
        for (let b = 0; b < this.formObject[0].sections[a].columns.length; b++) {
          for (let d = 0; d < this.formObject[0].sections[a].columns[b].properties.length; d++) {
            if (this.formObject[0].sections[a].columns[b].properties[d].uitype.uitype === 'MULTIPLICATION' || this.formObject[0].sections[a].columns[b].properties[d].uitype.uitype === 'ROWSUM' || this.formObject[0].sections[a].columns[b].properties[d].uitype.uitype === 'ROWAVG') {
              for (let g = 0; g < this.formObject[0].sections[a].columns[b].properties[d].uitype.calc.length; g++) {
                if (this.formObject[0].sections[i].columns[j].properties[k].name === this.formObject[0].sections[a].columns[b].properties[d].uitype.calc[g]) {
                  this.calculateFormMultiplications(this.formObject[0].sections[a].columns[b].properties[d], a, b, d);
                }
              }
            } else if (this.formObject[0].sections[a].columns[b].properties[d].uitype.uitype === 'ROWSUB' || this.formObject[0].sections[a].columns[b].properties[d].uitype.uitype === 'ROWDIV') {
              for (let g = 0; g < this.formObject[0].sections[a].columns[b].properties[d].uitype.calc.length; g++) {
                if (this.formObject[0].sections[i].columns[j].properties[k].name === this.formObject[0].sections[a].columns[b].properties[d].uitype.calc[g]) {
                  this.calculateFormSumations(this.formObject[0].sections[a].columns[b].properties[d], a, b, d);
                }
              }
            }
          }
        }
      }
    }

  }
  calculateFormMultiplications(subPlace, a, b, d) {
    let value = 0;
    let PatchValue;
    for (let o = 0; o < subPlace.uitype.calc.length; o++) {
      for (let g = 0; g < this.formObject[0].sections.length; g++) {
        if (this.formObject[0].sections[g].type === 'FORM') {
          for (let k = 0; k < this.formObject[0].sections[g].columns.length; k++) {
            for (let l = 0; l < this.formObject[0].sections[g].columns[k].properties.length; l++) {
              if (this.formObject[0].sections[g].columns[k].properties[l].name === subPlace.uitype.calc[o]) {
                const formControl = this.formObject[0].sections[g].columns[k].properties[l].name;
                if (subPlace.uitype.uitype === 'MULTIPLICATION') {
                  value = value * (+this.dynamicform.controls[formControl].value);
                } else if (subPlace.uitype.uitype === 'ROWSUM' || subPlace.uitype.uitype === 'ROWAVG') {
                  value = value + (+this.dynamicform.controls[formControl].value);
                }
              }
            }
          }
        }
      }
    }
    if (subPlace.uitype.uitype === 'ROWAVG') {
      PatchValue = value / subPlace.uitype.calc.length;
      this.dynamicform.controls[subPlace.name].patchValue(PatchValue);
    } else {
      this.dynamicform.controls[subPlace.name].patchValue(value);
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      if (subPlace.uitype.uitype === 'ROWAVG') {
        this.actionAutofillDisabled(PatchValue, subPlace);
      } else {
        this.actionAutofillDisabled(value, subPlace);
      }
    }
  }
  calculateFormSumations(subPlace, a, b, d) {
    let value1 = 0;
    let value2 = 0;
    let valueResult = 0;
    for (let g = 0; g < this.formObject[0].sections.length; g++) {
      if (this.formObject[0].sections[g].type === 'FORM') {
        for (let k = 0; k < this.formObject[0].sections[g].columns.length; k++) {
          for (let l = 0; l < this.formObject[0].sections[g].columns[k].properties.length; l++) {
            if (this.formObject[0].sections[g].columns[k].properties[l].name === subPlace.uitype.calc[0]) {
              const formControl = this.formObject[0].sections[g].columns[k].properties[l].name;
              value1 = this.dynamicform.controls[formControl].value;
            } if (this.formObject[0].sections[g].columns[k].properties[l].name === subPlace.uitype.calc[1]) {
              const formControl = this.formObject[0].sections[g].columns[k].properties[l].name;
              value2 = this.dynamicform.controls[formControl].value;
            }
          }
        }
      }
    }
    if (subPlace.uitype.uitype === 'ROWSUB') {
      valueResult = value2 - value1;
    } else if (subPlace.uitype.uitype === 'ROWDIV') {
      if (value1 !== 0) {
        valueResult = value2 / value1;
      } else {
        valueResult = 0;
      }
    }
    this.dynamicform.controls[subPlace.name].patchValue(valueResult);
    if (subPlace.actions && subPlace.actions.length > 0) {
      this.actionAutofillDisabled(valueResult, subPlace);
    }
  }
  eventFormCalculated(event, section, columns, prop, ind, i, j, k) {
    for (let a = 0; a < this.formObject[0].sections.length; a++) {
      if (this.formObject[0].sections[a].type === 'FORM') {
        for (let b = 0; b < this.formObject[0].sections[a].columns.length; b++) {
          for (let d = 0; d < this.formObject[0].sections[a].columns[b].properties.length; d++) {
            if (this.formObject[0].sections[a].columns[b].properties[d].uitype.uitype === 'ROWDATEDIFF') {
              for (let g = 0; g < this.formObject[0].sections[a].columns[b].properties[d].uitype.calc.length; g++) {
                if (this.formObject[0].sections[i].columns[j].properties[k].name === this.formObject[0].sections[a].columns[b].properties[d].uitype.calc[g]) {
                  this.calculateFormDateDiff(this.formObject[0].sections[a].columns[b].properties[d], a, b, d);
                }
              }
            }
          }
        }
      }
    }
  }

  actuallFormat(event, i, j, k, isDD) {
    const d = new Date(Date.parse(event));
    let newDate;
    if (isDD === 'ddmmyy') {
      newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    } else {
      newDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
    const formControlName = this.formObject[0].sections[i].columns[j].properties[k].name;
    this.dynamicform.controls[formControlName].patchValue(newDate);
  }
  focusElement(event) {
    // window.setTimeout(function () {
    //   document.getElementById(event.target.id).focus();
    // }, 0);
  }
  eventCalculated(event, row, rowItem, rowpos, itemind, secionIndex, isDleted) {
    if (isDleted === 'false') {
      for (let it = 0; it < row.items.length; it++) {
        if (row.items[it].uitype.uitype === 'MULTIPLICATION' || row.items[it].uitype.uitype === 'ROWAVG' || row.items[it].uitype.uitype === 'ROWSUM') {
          for (let t = 0; t < row.items[it].uitype.calc.length; t++) {
            if (rowItem.name === row.items[it].uitype.calc[t]) {
              this.RowMulCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
              break;
            }
          }
        } else if (row.items[it].uitype.uitype === 'ROWSUB' || row.items[it].uitype.uitype === 'ROWDIV') {
          for (let a = 0; a < row.items[it].uitype.calc.length; a++) {
            if (rowItem.name === row.items[it].uitype.calc[a]) {
              this.rowSubCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
              break;
            }
          }
        } else if (row.items[it].uitype.uitype === 'ROWDATEDIFF') {
          this.rowDateDifferenceCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
        }
      }
    } else { }
    if (rowItem.uitype.colcalc) {
      if (rowItem.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, rowItem);
      } else if (rowItem.uitype.colcalc.type === 'MUL') {
        this.colMulCalculate(secionIndex, itemind, rowpos, row, rowItem);
      } else if (rowItem.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, rowItem);
      }
    }
    // setTimeout(() => {
    //   this.colCalcFooter(secionIndex, itemind, rowpos, row, rowItem);
    // }, 0);
  }

  rowSubCalculate(row, rowItem, rowpos, itemind, secionIndex, subPlace, type) {
    let value = 0;
    let first = 0;
    let second = 0;
    for (let a = 0; a < this.formObject[0].sections[secionIndex].rows[rowpos].items.length; a++) {
      if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[0]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        first = (+this.dynamicform.controls[formControl].value);
      } if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[1]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        second = (+this.dynamicform.controls[formControl].value);
      }
    }
    if (second > first || first > second || first === second) {
      if (type === 'ROWSUB') {
        value = second - first;
      } else if (type === 'ROWDIV' && first !== 0) {
        value = second / first;
      }
    } else {
      value = 0;
    }
    const valueControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
    this.dynamicform.controls[valueControl].patchValue(value);
    for (let it = 0; it < row.items.length; it++) {
      if (row.items[it].uitype.uitype === 'MULTIPLICATION' || row.items[it].uitype.uitype === 'ROWAVG' || row.items[it].uitype.uitype === 'ROWSUM') {
        for (let t = 0; t < row.items[it].uitype.calc.length; t++) {
          if (this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name === row.items[it].uitype.calc[t]) {
            this.RowDisabledMulCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
            break;
          }
        }
      } else if (row.items[it].uitype.uitype === 'ROWSUB' || row.items[it].uitype.uitype === 'ROWDIV') {
        for (let a = 0; a < row.items[it].uitype.calc.length; a++) {
          if (this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name === row.items[it].uitype.calc[a]) {
            this.rowDisabledSubCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
            break;
          }
        }
      }
    }
    if (subPlace.uitype.colcalc) {
      if (subPlace.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, subPlace);
      } else if (subPlace.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, subPlace);
      }
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      this.actionAutofillDisabled(value, subPlace);
    }
    //  break;
  }
  RowMulCalculate(row, rowItem, rowpos, itemind, secionIndex, subPlace, type) {
    let value;
    let calValue;
    if (type === 'MULTIPLICATION') {
      value = 1;
    } else {
      value = 0;
    }
    for (let t = 0; t < subPlace.uitype.calc.length; t++) {
      for (let a = 0; a < this.formObject[0].sections[secionIndex].rows[rowpos].items.length; a++) {
        if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[t]) {
          const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
          if (type === 'ROWSUM' || type === 'ROWAVG') {
            value = value + (+this.dynamicform.controls[formControl].value);
          } else if (type === 'MULTIPLICATION') {
            value = value * (+this.dynamicform.controls[formControl].value);
          } else { }
        }
      }
    }
    const valueControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
    if (type === 'ROWAVG') {
      calValue = (value / (+subPlace.uitype.calc.length));
      this.dynamicform.controls[valueControl].patchValue(calValue);
    } else {
      this.dynamicform.controls[valueControl].patchValue(value);
    }
    for (let it = 0; it < row.items.length; it++) {
      if (row.items[it].uitype.uitype === 'MULTIPLICATION' || row.items[it].uitype.uitype === 'ROWAVG' || row.items[it].uitype.uitype === 'ROWSUM') {
        for (let t = 0; t < row.items[it].uitype.calc.length; t++) {
          // if (row.items[it].uitype.colcalc && row.items[it].uitype.colcalc.copyto) {
          //   const fcname = row.items[it].name + (9090 + secionIndex);
          //   this.patchCopytoValue(this.dynamicform.controls[fcname].value, row.items[it]);
          // }
          if (this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name === row.items[it].uitype.calc[t]) {
            this.RowDisabledMulCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
            break;
          }
        }
      } else if (row.items[it].uitype.uitype === 'ROWSUB' || row.items[it].uitype.uitype === 'ROWDIV') {
        for (let a = 0; a < row.items[it].uitype.calc.length; a++) {
          if (this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name === row.items[it].uitype.calc[a]) {
            this.rowDisabledSubCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
            break;
          }
        }
      }
    }
    if (subPlace.uitype.colcalc) {
      if (subPlace.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, subPlace);
      } else if (subPlace.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, subPlace);
      }
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      if (type === 'ROWAVG') {
        this.actionAutofillDisabled(calValue, subPlace);
      } else {
        this.actionAutofillDisabled(value, subPlace);
      }
    }
  }
  rowDateDifferenceCalculate(row, rowItem, rowpos, itemind, secionIndex, subPlace, type) {
    let value = 0;
    let first = 0;
    let second = 0;
    for (let a = 0; a < this.formObject[0].sections[secionIndex].rows[rowpos].items.length; a++) {
      if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[0]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        if (typeof (this.dynamicform.controls[formControl].value) === 'string') {
          const dateString = this.dynamicform.controls[formControl].value;
          let two;
          if (this.ddmmyy) {
            const convertFormat = dateString.split('/');
            two = new Date([convertFormat[1], convertFormat[0], convertFormat[2]].join('/'));
          } else {
            two = new Date(dateString);
          }
          // value2 = this.dynamicform.controls[formControl].value.setHours(0, 0, 0, 0);
          first = (+two.setHours(0, 0, 0, 0));
        } else {
          first = (+ this.dynamicform.controls[formControl].value);
        }
      } if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[1]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        if (typeof (this.dynamicform.controls[formControl].value) === 'string') {
          const dateString = this.dynamicform.controls[formControl].value;
          let two;
          if (this.ddmmyy) {
            const convertFormat = dateString.split('/');
            two = new Date([convertFormat[1], convertFormat[0], convertFormat[2]].join('/'));
          } else {
            two = new Date(dateString);
          }
          // value2 = this.dynamicform.controls[formControl].value.setHours(0, 0, 0, 0);
          second = (+two.setHours(0, 0, 0, 0));
        } else {
          second = (+ this.dynamicform.controls[formControl].value);
        }
      }
    }
    // console.log(value);
    if (second > first || first > second || first === second) {
      const diffInMs: number = (second) - (first);
      value = diffInMs / (24 * 1000 * 3600);
    } else {
      value = 0;
    }
    const valueControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
    this.dynamicform.controls[valueControl].patchValue(value);
    for (let it = 0; it < row.items.length; it++) {
      if (row.items[it].uitype.uitype === 'ROWDATEDIFF') {
        for (let a = 0; a < row.items[it].uitype.calc.length; a++) {
          if (row.items[it].uitype.calc[a] === this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name) {
            this.rowDisabledDateDifferenceCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].type);
          }
        }
      }
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      this.actionAutofillDisabled(value, subPlace);
    }
    if (subPlace.uitype.colcalc) {
      if (subPlace.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, rowItem);
      } else if (subPlace.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, rowItem);
      }
    }

    // break;
  }
  calculateFormDateDiff(patchDiff, a, b, d) {
    let value1 = 0;
    let value2 = 0;
    let valueDiff = 0;
    for (let g = 0; g < this.formObject[0].sections.length; g++) {
      if (this.formObject[0].sections[g].type === 'FORM') {
        for (let k = 0; k < this.formObject[0].sections[g].columns.length; k++) {
          for (let l = 0; l < this.formObject[0].sections[g].columns[k].properties.length; l++) {
            if (this.formObject[0].sections[g].columns[k].properties[l].name === patchDiff.uitype.calc[0]) {
              const formControl = this.formObject[0].sections[g].columns[k].properties[l].name;
              if (typeof (this.dynamicform.controls[formControl].value) === 'string') {
                const dateString = this.dynamicform.controls[formControl].value;
                let two;
                if (this.ddmmyy) {
                  const convertFormat = dateString.split('/');
                  two = new Date([convertFormat[1], convertFormat[0], convertFormat[2]].join('/'));
                } else {
                  two = new Date(dateString);
                }
                // value2 = this.dynamicform.controls[formControl].value.setHours(0, 0, 0, 0);
                value1 = (+two.setHours(0, 0, 0, 0));
              } else {
                value1 = (+ this.dynamicform.controls[formControl].value);
              }
              if (this.formObject[0].sections[g].columns[k].properties[l].actions) {
                this.actionAutofillDisabled(value1, this.formObject[0].sections[g].columns[k].properties[l]);
              }
            } if (this.formObject[0].sections[g].columns[k].properties[l].name === patchDiff.uitype.calc[1]) {
              const formControl = this.formObject[0].sections[g].columns[k].properties[l].name;
              if (typeof (this.dynamicform.controls[formControl].value) === 'string') {
                const dateString = this.dynamicform.controls[formControl].value;
                let two;
                if (this.ddmmyy) {
                  const convertFormat = dateString.split('/');
                  two = new Date([convertFormat[1], convertFormat[0], convertFormat[2]].join('/'));
                } else {
                  two = new Date(dateString);
                }
                // value2 = this.dynamicform.controls[formControl].value.setHours(0, 0, 0, 0);
                value2 = (+two.setHours(0, 0, 0, 0));
              } else {
                value2 = (+ this.dynamicform.controls[formControl].value);
              }
              if (this.formObject[0].sections[g].columns[k].properties[l].actions) {
                this.actionAutofillDisabled(value2, this.formObject[0].sections[g].columns[k].properties[l]);
              }
            }
          }
        }
      }
    }
    // const date1 = new Date();
    // if (isNaN(value1)) {
    //   value1 = date1.setHours(0, 0, 0, 0);
    // } if (isNaN(value2)) {
    //   value2 = date1.setHours(0, 0, 0, 0);
    // }
    const diffInMs: number = (value2) - (value1);
    valueDiff = diffInMs / (24 * 1000 * 3600);
    const valueControl = this.formObject[0].sections[a].columns[b].properties[d].name;
    this.dynamicform.controls[valueControl].patchValue(valueDiff);
    if (this.formObject[0].sections[a].columns[b].properties[d].actions && this.formObject[0].sections[a].columns[b].properties[d].actions.length > 0) {
      this.actionAutofillDisabled(valueDiff, this.formObject[0].sections[a].columns[b].properties[d]);
    }
  }
  RowDisabledMulCalculate(row, rowItem, rowpos, itemind, secionIndex, subPlace, type) {
    let value = 0;
    let calValue;
    for (let t = 0; t < subPlace.uitype.calc.length; t++) {
      for (let a = 0; a < this.formObject[0].sections[secionIndex].rows[rowpos].items.length; a++) {
        if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[t]) {
          const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
          if (type === 'ROWSUM' || type === 'ROWAVG') {
            value = value + (+this.dynamicform.controls[formControl].value);
            // this.patchCopytoValue(value, subPlace);
          } else if (type === 'MULTIPLICATION') {
            value = value * (+this.dynamicform.controls[formControl].value);
            // this.patchCopytoValue(value, subPlace);
          } else { }
        }
      }
    }
    const valueControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
    if (type === 'ROWAVG') {
      calValue = (value / (+subPlace.uitype.calc.length));
      this.dynamicform.controls[valueControl].patchValue(calValue);
    } else {
      this.dynamicform.controls[valueControl].patchValue(value);
    }
    if (subPlace.uitype.colcalc) {
      if (subPlace.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, subPlace);
      } else if (subPlace.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, subPlace);
      }
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      if (type === 'ROWAVG') {
        this.actionAutofillDisabled(calValue, subPlace);
      } else {
        this.actionAutofillDisabled(value, subPlace);
      }
    }
  }
  rowDisabledSubCalculate(row, rowItem, rowpos, itemind, secionIndex, subPlace, type) {
    let value = 0;
    let first = 0;
    let second = 0;
    for (let a = 0; a < this.formObject[0].sections[secionIndex].rows[rowpos].items.length; a++) {
      if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[0]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        first = (+this.dynamicform.controls[formControl].value);
      } if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[1]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        second = (+this.dynamicform.controls[formControl].value);
      }
    }
    if (second > first || first > second || first === second) {
      if (type === 'ROWSUB') {
        value = second - first;
      } else if (type === 'ROWDIV' && first !== 0) {
        value = second / first;
      }
    } else {
      value = 0;
    }
    const valueControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
    this.dynamicform.controls[valueControl].patchValue(value);
    if (subPlace.uitype.colcalc) {
      if (subPlace.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, subPlace);
      } else if (subPlace.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, subPlace);
      }
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      this.actionAutofillDisabled(value, subPlace);
    }

  }
  rowDisabledDateDifferenceCalculate(row, rowItem, rowpos, itemind, secionIndex, subPlace, type) {
    let value = 0;
    let first = 0;
    let second = 0;
    for (let a = 0; a < this.formObject[0].sections[secionIndex].rows[rowpos].items.length; a++) {
      if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[0]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        if (typeof (this.dynamicform.controls[formControl].value) === 'string') {
          const dateString = this.dynamicform.controls[formControl].value;
          let two;
          if (this.ddmmyy) {
            const convertFormat = dateString.split('/');
            two = new Date([convertFormat[1], convertFormat[0], convertFormat[2]].join('/'));
          } else {
            two = new Date(dateString);
          }
          // value2 = this.dynamicform.controls[formControl].value.setHours(0, 0, 0, 0);
          first = (+two.setHours(0, 0, 0, 0));
        } else {
          first = (+ this.dynamicform.controls[formControl].value);
        }
      } if (this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name === subPlace.uitype.calc[1]) {
        const formControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[a].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
        if (typeof (this.dynamicform.controls[formControl].value) === 'string') {
          const dateString = this.dynamicform.controls[formControl].value;
          let two;
          if (this.ddmmyy) {
            const convertFormat = dateString.split('/');
            two = new Date([convertFormat[1], convertFormat[0], convertFormat[2]].join('/'));
          } else {
            two = new Date(dateString);
          }
          // value2 = this.dynamicform.controls[formControl].value.setHours(0, 0, 0, 0);
          second = (+two.setHours(0, 0, 0, 0));
        } else {
          second = (+ this.dynamicform.controls[formControl].value);
        }
      }
    }
    // console.log(value);
    if (second > first || first > second || first === second) {
      const diffInMs: number = (second) - (first);
      value = diffInMs / (24 * 1000 * 3600);
    } else {
      value = 0;
    }
    const valueControl = this.formObject[0].sections[secionIndex].rows[rowpos].items[itemind].name + this.formObject[0].sections[secionIndex].rows[rowpos].row;
    this.dynamicform.controls[valueControl].patchValue(value);
    if (subPlace.uitype.colcalc) {
      if (subPlace.uitype.colcalc.type === 'SUM') {
        this.colSumCalculate(secionIndex, itemind, rowpos, row, rowItem);
      } else if (subPlace.uitype.colcalc.type === 'AVERAGE') {
        this.colAvgCalculate(secionIndex, itemind, rowpos, row, rowItem);
      }
    }
    if (subPlace.actions && subPlace.actions.length > 0) {
      this.actionAutofillDisabled(value, subPlace);
    }
  }
  colSumCalculate(si, itmind, rowpos, row, rowItem) {
    let colValue = 0;
    for (let ri = 0; ri < this.formObject[0].sections[si].rows.length; ri++) {
      if (ri < (this.formObject[0].sections[si].rows.length - 1)) {
        const formctrl = this.formObject[0].sections[si].rows[ri].items[itmind].name + this.formObject[0].sections[si].rows[ri].row;
        colValue = colValue + (+this.dynamicform.controls[formctrl].value);
      } else if (ri === (this.formObject[0].sections[si].rows.length - 1) && itmind !== 0) {
        const formcrl = this.formObject[0].sections[si].rows[ri].items[itmind].name + this.formObject[0].sections[si].rows[ri].row;
        this.dynamicform.controls[formcrl].patchValue(colValue);
        this.patchCopytoValue(colValue, rowItem);
      } else { }

    }
    // this.colCalcFooter(si, itmind, rowpos, row, rowItem);
  }
  patchCopytoValue(colValue, rowItem) {
    if (rowItem.uitype.colcalc.copyto) {
      for (let a = 0; a < this.formObject[0].sections.length; a++) {
        if (this.formObject[0].sections[a].type === 'FORM') {
          for (let b = 0; b < this.formObject[0].sections[a].columns.length; b++) {
            for (let c = 0; c < this.formObject[0].sections[a].columns[b].properties.length; c++) {
              if (this.formObject[0].sections[a].columns[b].properties[c].name === rowItem.uitype.colcalc.copyto) {
                const formCName = this.formObject[0].sections[a].columns[b].properties[c].name;
                this.dynamicform.controls[formCName].patchValue(colValue);
                this.eventCalculateForForms('event', 'section', 'columns', 'prop', 'ind', a, b, c);
                break;
              }
            }
          }
        }
      }
    }
  }
  colMulCalculate(si, itmind, rowpos, row, rowItem) {
    let colValue = 1;
    for (let ri = 0; ri < this.formObject[0].sections[si].rows.length; ri++) {
      for (let rt = 0; rt < this.formObject[0].sections[si].rows[ri].items.length; rt++) {
        if (this.formObject[0].sections[si].rows[ri].items[rt].uitype.colcalc && ri < (this.formObject[0].sections[si].rows.length - 1) && rt === itmind) {
          const formctrl = this.formObject[0].sections[si].rows[ri].items[rt].name + this.formObject[0].sections[si].rows[ri].row;
          // if (this.dynamicform.controls[formctrl].value) {
          colValue = colValue * (+this.dynamicform.controls[formctrl].value);
          // }
        } else if (this.formObject[0].sections[si].rows[ri].items[rt].uitype.colcalc && ri === (this.formObject[0].sections[si].rows.length - 1) && rt === itmind) {
          const formcrl = this.formObject[0].sections[si].rows[ri].items[rt].name + this.formObject[0].sections[si].rows[ri].row;
          this.dynamicform.controls[formcrl].patchValue(colValue);
        } else { }
      }
    }
  }
  colAvgCalculate(si, itmind, rowpos, row, rowItem) {
    let colValue = 0;
    for (let ri = 0; ri < this.formObject[0].sections[si].rows.length; ri++) {
      for (let rt = 0; rt < this.formObject[0].sections[si].rows[ri].items.length; rt++) {
        if (this.formObject[0].sections[si].rows[ri].items[rt].uitype.colcalc && ri < (this.formObject[0].sections[si].rows.length - 1) && rt === itmind) {
          const formctrl = this.formObject[0].sections[si].rows[ri].items[rt].name + this.formObject[0].sections[si].rows[ri].row;
          if (this.dynamicform.controls[formctrl].value) {
            colValue = (colValue + (+this.dynamicform.controls[formctrl].value));
          }
        } else if (this.formObject[0].sections[si].rows[ri].items[rt].uitype.colcalc && ri === (this.formObject[0].sections[si].rows.length - 1) && rt === itmind && itmind !== 0) {
          const formcrl = this.formObject[0].sections[si].rows[ri].items[rt].name + this.formObject[0].sections[si].rows[ri].row;
          this.dynamicform.controls[formcrl].patchValue(colValue / (this.formObject[0].sections[si].rows.length - 1));
          const avg = colValue / (this.formObject[0].sections[si].rows.length - 1);
          this.patchCopytoValue(avg, rowItem);
        } else { }
      }
    }
  }
  dbLookupDropdownTable(event, pos, ind) {
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'TABLE') {
          this.formObject[index].sections[i].rows[pos].items[ind].value = [];
          for (const selected of this.formObject[index].sections[i].rows[pos].items[ind].lookupOptions) {
            if (event === selected.value) {
              const select = {
                name: selected.label,
                value: selected.value
              };
              this.formObject[index].sections[i].rows[pos].items[ind].value.push(select);
              break;
            }
          }
        }
      }
    }
  }
  selectSingleTable(event, ind, sec, col, prop) {
    this.formObject[0].sections[sec].rows[col].items[prop].value = [];
    this.formObject[0].sections[sec].rows[col].items[prop].value.push(event);
  }
  removeExistingTableRow(sectionIndex, row, pos) {
    for (let index = 0; index < row.items.length; index++) {
      this.dynamicform.removeControl(row.items[index].name + row.row);
    }
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'TABLE' && i === sectionIndex) {
          this.formObject[index].sections[i].rows.splice(pos, 1);
          this.formObjectSubmit[index].sections[i].rows.splice(pos, 1);
        }
        if (this.formObject[index].sections[i].rows && i === sectionIndex) {
          for (let rowsindex = 0; rowsindex < this.formObject[index].sections[i].rows.length; rowsindex++) {
            for (let rid = 0; rid < this.formObject[index].sections[i].rows[rowsindex].items.length; rid++) {
              const itemFormControlName = this.formObject[index].sections[i].rows[rowsindex].items[rid].name + this.formObject[index].sections[i].rows[rowsindex].row;
              if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.uitype === 'AUTONUMBER' && this.formObject[index].sections[i].rows[rowsindex].row !== (9090 + sectionIndex)) {
                // console.log( this.dynamicform.value.itemFormControlName);
                this.dynamicform.controls[itemFormControlName].patchValue(rowsindex + 1);
              } else { }
              // console.log();
              if ((this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.uitype === 'ROWSUM' || this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.uitype === 'MULTIPLICATION'
                || this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.uitype === 'ROWAVG') && this.formObject[index].sections[i].rows[rowsindex].items[rid].colcalc) {
                // for (let t = 0; t < this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.calc.length; t++) {
                //   if (rowItem.name === row.items[it].uitype.calc[t]) {
                //     this.RowMulCalculate(row, rowItem, rowpos, it, secionIndex, row.items[it], row.items[it].uitype.uitype);
                //     break;
                //   }
                // }
                if (this.formObject[index].sections[i].rows[rowsindex].items[rid].colcalc.uitype.uitype === 'SUM') {
                  this.colSumCalculate(i, rid, rowsindex, this.formObject[index].sections[i].rows, this.formObject[index].sections[i].rows[rowsindex].items[rid]);
                } else if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.colcalc.type === 'MUL') {
                  this.colMulCalculate(i, rid, rowsindex, this.formObject[index].sections[i].rows, this.formObject[index].sections[i].rows[rowsindex].items[rid]);
                } else if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.colcalc.type === 'AVERAGE') {
                  this.colAvgCalculate(i, rid, rowsindex, this.formObject[index].sections[i].rows, this.formObject[index].sections[i].rows[rowsindex].items[rid]);
                }
              } else { }
              if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.colcalc) {
                if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.colcalc.type === 'SUM') {
                  setTimeout(() => {
                    this.colSumCalculate(i, rid, rowsindex, this.formObject[index].sections[i].rows, this.formObject[index].sections[i].rows[rowsindex].items[rid]);
                  }, 0);
                } else if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.colcalc.type === 'MUL') {
                  setTimeout(() => {
                    this.colMulCalculate(i, rid, rowsindex, this.formObject[index].sections[i].rows, this.formObject[index].sections[i].rows[rowsindex].items[rid]);
                  }, 0);
                } else if (this.formObject[index].sections[i].rows[rowsindex].items[rid].uitype.colcalc.type === 'AVERAGE') {
                  setTimeout(() => {
                    this.colAvgCalculate(i, rid, rowsindex, this.formObject[index].sections[i].rows, this.formObject[index].sections[i].rows[rowsindex].items[rid]);
                  }, 0);
                }
              }

            }
          }
        }
      }
    }
  }
  assinDBTypeAheadAuto(res, sectionValue, columnvalue, propvalue) {
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
          for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
            if (sectionValue === i && columnvalue === j && propvalue === k) {
              //  this.formObject[index].sections[i].columns[j].properties[k].dbValue = JSON.parse(res._body);
              if ((this.createformtitle === 'Incoming Correspondence' && (this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].name === 'to' || this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].name === 'cc'))
                || (this.createformtitle === 'Outgoing Correspondence' && this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].name === 'from') || (this.createformtitle === 'Memo')) {
                this.formObject[0].sections[i].columns[j].properties[k].dbValue = [];
              }
              let value;
              value = JSON.parse(res._body);
              for (let val = 0; val < value.length; val++) {
                const element = {
                  'id': value[val].value,
                  'name': value[val].label
                };
                this.formObject[index].sections[i].columns[j].properties[k].dbValue.push(element);
                //       console.log(this.formObject[index].sections[i].columns[j].properties[k].dbValue);
                // this.dropdownList.push(element);
              }
            }
          }
        }
      }
    }
  }
  dbLookupDropdown(event, ind, i, j, k) {
    if (this.formObject.length > 0) {
      let selected;
      this.formObject[ind].sections[i].columns[j].properties[k].value = [];
      for (const select of this.formObject[0].sections[i].columns[j].properties[k].lookupOptions) {
        if (event === select.value) {
          selected = {
            name: select.name,
            value: select.value
          };
          this.formObject[ind].sections[i].columns[j].properties[k].value.push(selected);
          break;
        }
      }
      if (this.formObject[0].sections[i].columns[j].properties[k].name === 'category') {
        for (let p = 0; p < this.formObject.length; p++) {
          for (let q = 0; q < this.formObject[p].sections.length; q++) {
            for (let r = 0; r < this.formObject[p].sections[q].columns.length; r++) {
              for (let s = 0; s < this.formObject[p].sections[q].columns[r].properties.length; s++) {
                if (selected.name === 'CEO') {
                  if (this.createformtitle === 'Incoming Correspondence' && this.formObject[p].sections[q].columns[r].properties[s].type === 'MTEXTTA') {
                    if (this.formObject[p].sections[q].columns[r].properties[s].name === 'to') {
                      this.formObject[p].sections[q].columns[r].properties[s].value = [];
                      const element = {
                        'value': '100',
                        'name': 'CEO Office'
                      };
                      const itemList = {
                        'id': '100',
                        'name': 'CEO Office'
                      };
                      this.formObject[p].sections[q].columns[r].properties[s].dbDummyValue.push(itemList);
                      this.formObject[p].sections[q].columns[r].properties[s].dbValue.push(element);
                    }
                  }
                }
                if (this.formObject[p].sections[q].columns[r].properties[s].name === 'privacy') {
                  if (selected.name === 'CEO' || selected.name === 'QCB') {
                    this.dynamicform.patchValue({ privacy: 3 });
                    this.formObject[p].sections[q].columns[r].properties[s].value = [];
                    this.formObject[p].sections[q].columns[r].properties[s].value.push({
                      name: 'Restricted',
                      value: 3
                    });
                    //   this.formObject[p].sections[q].columns[r].properties[s].value.push(3);
                  } else if (selected.name === 'Technical' || selected.name === 'Legal' || selected.name === 'Government') {
                    this.dynamicform.patchValue({ privacy: 2 });
                    this.formObject[p].sections[q].columns[r].properties[s].value = [];
                    this.formObject[p].sections[q].columns[r].properties[s].value.push({
                      name: 'Restricted',
                      value: 2
                    });
                  } else {
                    this.dynamicform.patchValue({ privacy: 1 });
                    this.formObject[p].sections[q].columns[r].properties[s].value = [];
                    this.formObject[p].sections[q].columns[r].properties[s].value.push({
                      name: 'Public',
                      value: 1
                    });
                  }
                }
                if (this.formObject[p].sections[q].columns[r].properties[s].name === 'priority') {
                  if (selected.name === 'CEO' || selected.name === 'QCB' || selected.name === 'Legal') {
                    this.dynamicform.patchValue({ priority: 3 });
                    this.formObject[p].sections[q].columns[r].properties[s].value = [];
                    this.formObject[p].sections[q].columns[r].properties[s].value.push({
                      name: '',
                      value: 3
                    });
                  } else {
                    this.dynamicform.patchValue({ priority: 1 });
                    this.formObject[p].sections[q].columns[r].properties[s].value = [];
                    this.formObject[p].sections[q].columns[r].properties[s].value.push({
                      name: '',
                      value: 1
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  onSearchAutoStextTA(event, dBlookUp, sectionValue, columnvalue, propvalue) {
    dBlookUp.filter = event.text;
    let keyUp: String;
    let newRole = {};
    keyUp = event.text;
    if (keyUp.length > 2) {
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].dbValue = [];
      newRole = {
        'value': '',
        'name': event.text
      };
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].dbValue.push(newRole);
      setTimeout(() => {
        this.integrationservice.getDBTypeAhead(dBlookUp).subscribe(res => this.assinDBTypeAheadAuto(res, sectionValue, columnvalue, propvalue), error => console.log(error));
      }, 100);
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].value = [];
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].value.push({ 'name': event.text, 'value': '' });
    }
  }
  onSearchedStextTA(event, dBlookUp, sectionValue, columnvalue, propvalue) {
    dBlookUp.filter = event.text;
    let keyUp: String;
    let newRole = {};
    keyUp = event.text;
    if (keyUp.length > 2) {
      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].dbValue = [];
      newRole = {
        'id': -10000000,
        'name': event.text
      };

      this.formObject[0].sections[sectionValue].columns[columnvalue].properties[propvalue].dbValue.push(newRole);
      setTimeout(() => {
        this.integrationservice.getDBTypeAhead(dBlookUp).subscribe(res => this.assinDBTypeAheadAuto(res, sectionValue, columnvalue, propvalue), error => console.log(error));
      }, 100);
    }
  }
  selctedMultiple(event, ind, sec, col, prop) {
    console.log(event);
    if (this.formObject[ind].sections[sec].columns[col].properties[prop].value.length > 0) {
      for (const value of this.formObject[ind].sections[sec].columns[col].properties[prop].value) {
        if (value.name !== event.text) {
          this.formObject[ind].sections[sec].columns[col].properties[prop].value.push(event);
        }
      }
    } else {
      this.formObject[ind].sections[sec].columns[col].properties[prop].value.push(event);
    }
  }
  unselectMultiple(event, ind, sec, col, prop) {
    if (this.formObject[ind].sections[sec].columns[col].properties[prop].value.length > 0) {
      for (let a = 0; a < this.formObject[ind].sections[sec].columns[col].properties[prop].value.length; a++) {
        if (this.formObject[ind].sections[sec].columns[col].properties[prop].value[a].name === event.text) {
          this.formObject[ind].sections[sec].columns[col].properties[prop].value.splice(a, 1);
        }
      }
    }
  }
  selectSingle(event, ind, sec, col, prop) {
    console.log(event);
    // this.formObject[ind].sections[sec].columns[col].properties[prop].value = [];
    // this.formObject[ind].sections[sec].columns[col].properties[prop].value.push(event);
    // console.log(this.formObject[ind].sections[sec].columns[col].properties[prop].value);
  }
  selectedSingle(event, ind, i, c, p) {
    // console.log(this.formObject[ind].sections[i].columns[c].properties[p].dbDummyValue);
    // console.log(event);
    let itemList = {
      'value': event.value.id,
      'name': event.value.name
    };
    this.formObject[ind].sections[i].columns[c].properties[p].value = [];
    this.formObject[ind].sections[i].columns[c].properties[p].value.push(itemList);
    // console.log(this.formObject[ind].sections[i].columns[c].properties[p].value);
  }
  selectedMultiple(event, ind, i, c, p) {
    console.log(event.value);
    this.formObject[ind].sections[i].columns[c].properties[p].value = [];
    for (let itemObject = 0; itemObject < event.value.length; itemObject++) {
      let itemList = {
        'value': event.value[itemObject].id,
        'name': event.value[itemObject].name
      };
      this.formObject[ind].sections[i].columns[c].properties[p].value.push(itemList);
    }
    console.log(this.formObject[ind].sections[i].columns[c].properties[p].value);
  }
  addNewTableRow(sectionIndex, isFooter) {
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'TABLE' && i === sectionIndex) {
          let flag = 0;
          let rowheader: any;
          let rowheaderdummy = new DummyTable().rows;
          for (let d = 0; d < this.formObject[index].sections[i].rowheader.length; d++) {
            // let properties  = new Props();
            const properties = Object.assign({}, this.formObject[index].sections[i].rowheader[d]);
            // properties.assign({}, this.formObject[index].sections[i].rowheader[d]);
            // properties = this.formObject[index].sections[i].rowheader[d];
            rowheaderdummy.push(properties);
          }
          // rowheaderdummy.rows = this.formObject[index].sections[i].rowheader;
          if (isFooter === 'footer') {
            this.addFooterRow(sectionIndex, rowheaderdummy);
          } else {
            let rowheadernew = rowheaderdummy;
            const rowItem = {
              row: this.tableRowValue + 1,
              items: []
            };
            // console.log(this.formObject[index].sections[i].rowheader);
            // console.log(rowheadernew);
            for (let j = 0; j < rowheadernew.length; j++) {
              rowheader = rowheadernew[j];
              const itemFormName = rowheadernew[j].name + rowItem.row;
              let sel: any;
              if (rowheadernew[j].uitype.uitype === 'LOOKUP') {
                rowheader.lookup = rowheadernew[j].lookups;
                rowheader.lookupOptions = [];
                rowheader.value = [];
                const select = {
                  name: rowheader.uitype.lookups[0].name,
                  value: rowheader.uitype.lookups[0].value
                };
                sel = select;
                rowheader.value.push(select);
                for (const options of rowheader.uitype.lookups) {
                  const lookupValue = {
                    name: options.name,
                    value: options.value
                  };
                  rowheader.lookupOptions.push(lookupValue);
                }
              }

              if (rowheader.req === 'TRUE') {
                const control: FormControl = new FormControl(sel, Validators.required);
                this.dynamicform.addControl(itemFormName, control);
                if (rowheader.rOnly === 'TRUE') {
                  this.dynamicform.controls[itemFormName].disable();
                } else {

                }
              } else {
                const control: FormControl = new FormControl(sel);
                this.dynamicform.addControl(itemFormName, control);
                if (rowheader.rOnly === 'TRUE') {
                  this.dynamicform.controls[itemFormName].disable();
                } else {

                }
              }
              rowheader.value = [];
              if (rowheadernew[j].uitype.uitype === 'AUTONUMBER') {
                rowheader.value = {
                  value: '' // rowItem.row
                };
                this.dynamicform.controls[itemFormName].patchValue(rowItem.row); // rowItem.row
              }
              if (rowheadernew[j].uitype.uitype === 'LOOKUP') {
                rowheader.value = {
                  value: '' // rowItem.row
                };
                this.dynamicform.controls[itemFormName].patchValue(rowheadernew[j].lookupOptions[0].value); // rowItem.row
              }
              if (rowheadernew[j].uitype.colcalc) {
                if (rowheadernew[j].uitype.colcalc.type !== 'NONE' && rowheadernew[j].uitype.colcalc.type !== '') {
                  flag = 1;
                }
              } else {
              }
              if (rowheadernew[j].uitype.uitype === 'DBLOOKUP') {
                rowheader.lookup = rowheadernew[j].lookups;
                rowheader.lookupOptions = [];
                rowheader.value = [];
                this.integrationservice.getDBLookup(rowheadernew[j].uitype.dblookup).subscribe(res => {
                  if (flag === 1) {
                    this.assignDblookupvalueTableNewRow(res, index, i, (this.formObject[index].sections[i].rows.length - 1), j);
                  } else {
                    this.assignDblookupvalueTableNewRow(res, index, i, (this.formObject[index].sections[i].rows.length), j);
                  }
                }, error => { });
              }
              rowItem.items.push(rowheader);
            }
            // console.log(rowItem);
            if (flag === 1) {
              this.formObject[index].sections[i].rows.splice((this.formObject[index].sections[i].rows.length - 1), 0, rowItem);
              this.formObjectSubmit[index].sections[i].rows.splice((this.formObject[index].sections[i].rows.length - 1), 0, rowItem);
              // console.log(this.formObject);
            } else {

              this.formObject[index].sections[i].rows.push(rowItem);
              this.formObjectSubmit[index].sections[i].rows.push(rowItem);
            }
          }
        }
      }

      this.tableRowValue = this.tableRowValue + 1;
      // console.log(this.formObject);
      // for (let foindex = 0; foindex  < this.formObject.length; foindex++) {
      for (let secindex = 0; secindex < this.formObject[0].sections.length; secindex++) {
        if (this.formObject[0].sections[secindex].type === 'TABLE') {
          for (let rowsindex = 0; rowsindex < this.formObject[0].sections[secindex].rows.length; rowsindex++) {
            for (let rid = 0; rid < this.formObject[0].sections[secindex].rows[rowsindex].items.length; rid++) {
              const itemFormControlName = this.formObject[0].sections[secindex].rows[rowsindex].items[rid].name + this.formObject[0].sections[secindex].rows[rowsindex].row;
              if (this.formObject[0].sections[secindex].rows[rowsindex].items[rid].uitype.uitype === 'AUTONUMBER' && this.formObject[0].sections[secindex].rows[rowsindex].row !== ((9090) + secindex)) {
                this.dynamicform.controls[itemFormControlName].patchValue(rowsindex + 1);
                this.formObject[0].sections[secindex].rows[rowsindex].items[rid].value = [];
                this.formObject[0].sections[secindex].rows[rowsindex].items[rid].value = [{ value: rowsindex + 1 }];
                // console.log(this.formObject[0].sections[secindex].rows[rowsindex].items[rid].value);
                // console.log(this.formObject);
              }
            }
          }
        }
      }
      // }
    }
  }
  addFooterRow(sectionIndex, dummyrow) {
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'TABLE' && i === sectionIndex) {
          //  rowheaderdummy.rows = this.formObject[index].sections[i].rowheader;
          const footerheadernew = dummyrow;
          let footerheader: any;
          const rowItem = {
            row: (9090 + i),
            items: []
          };
          // console.log(rowheadernew);
          for (let j = 0; j < footerheadernew.length; j++) {
            footerheader = footerheadernew[j];
            const itemFormName = footerheader.name + rowItem.row;
            let sel: any;
            if (footerheadernew[j].uitype.uitype === 'LOOKUP') {
              footerheader.lookup = footerheadernew[j].uitype.lookups;
              footerheader.lookupOptions = [];
              footerheader.value = [];
              const select = {
                name: footerheader.uitype.lookups[0].name,
                value: footerheader.uitype.lookups[0].value
              };
              sel = select;
              footerheader.value.push(select);
              for (const options of footerheader.uitype.lookups) {
                const lookupValue = {
                  name: options.name,
                  value: options.value
                };
                footerheader.lookupOptions.push(lookupValue);
              }
            }

            const control: FormControl = new FormControl(sel);
            this.dynamicform.addControl(itemFormName, control);
            // if (rowheader.rOnly === 'TRUE') {
            this.dynamicform.controls[itemFormName].disable();
            // } else {

            // }

            footerheader.value = [];
            if (footerheadernew[j].uitype.uitype === 'AUTONUMBER') {
              footerheader.value = {
                value: '' // rowItem.row
              };
              this.dynamicform.controls[itemFormName].patchValue(''); // rowItem.row
            }
            if (j === 0) {
              footerheader.value = [{
                value: 'Total'
              }];
              this.dynamicform.controls[itemFormName].patchValue('Total');
            }
            rowItem.items.push(footerheader);
          }
          // console.log(rowItem);
          this.formObject[index].sections[i].rows.push(rowItem);
          // this.detectChanged.detectChanges();
          // console.log(this.formObject);
          this.formObjectSubmit[index].sections[i].rows.push(rowItem);
          // console.log(this.formObjectSubmit);
          // this.tableRowValue = this.tableRowValue + 1;
        }
      }
    }
  }

  assignDblookupvalueTableNewRow(res, index, i, tj, k) {
    const value = JSON.parse(res._body);
    for (let val = 0; val < value.length; val++) {
      const elementval = {
        label: value[val].label,
        value: value[val].value
      };
      this.formObject[index].sections[i].rows[tj].items[k].lookupOptions.push(elementval);
    }
    this.dynamicform.controls[(this.formObject[index].sections[i].rows[tj].items[k].name + this.formObject[index].sections[i].rows[tj].row)].patchValue(value[0].value);
    this.formObject[index].sections[i].rows[tj].items[k].value.push(this.formObject[index].sections[i].rows[tj].items[k].lookupOptions[0]);
  }
  ngOnChanges() {
    this.dynamicform = this.fb.group({});
    this.formObjectSubmit = [];
    if (this.dynamicFormJSON && (JSON.parse(this.dynamicFormJSON.length) > 0)) {
      const formData = [];
      formData.push(JSON.parse(this.dynamicFormJSON));
      this.formObjectSubmit.push(JSON.parse(this.dynamicFormJSON));
      for (let index = 0; index < this.formObjectSubmit.length; index++) {
        for (let i = 0; i < this.formObjectSubmit[index].sections.length; i++) {
          if (this.formObjectSubmit[index].sections[i].type === 'FORM') {
            for (let j = 0; j < this.formObjectSubmit[index].sections[i].columns.length; j++) {
              for (let k = 0; k < this.formObjectSubmit[index].sections[i].columns[j].properties.length; k++) {
                if (formData[index].sections[i].columns[j].properties[k].uitype.uitype === 'STEXTTA' || formData[index].sections[i].columns[j].properties[k].uitype.uitype === 'MTEXTTA' || formData[index].sections[i].columns[j].properties[k].uitype.uitype === 'DBLOOKUP') {
                  formData[index].sections[i].columns[j].properties[k].dbValue = [];
                  formData[index].sections[i].columns[j].properties[k].dbDummyValue = [];
                }
                if (formData[index].sections[i].columns[j].properties[k].uitype.uitype === 'DBLOOKUP') {
                  formData[index].sections[i].columns[j].properties[k].lookupOptions = [];
                  this.integrationservice.getDBLookup(formData[index].sections[i].columns[j].properties[k].uitype.dblookup).subscribe(res => this.assignDblookupvalue(res, index, i, j, k));
                }
                if (formData[index].sections[i].columns[j].properties[k].uitype.uitype === 'LOOKUP') {
                  formData[index].sections[i].columns[j].properties[k].lookupOptions = [];
                  if (formData[index].sections[i].columns[j].properties[k].value.length === 0) {
                    formData[index].sections[i].columns[j].properties[k].lookupOptions = [];
                    const select = {
                      name: formData[index].sections[i].columns[j].properties[k].uitype.lookups[0].name,
                      value: formData[index].sections[i].columns[j].properties[k].uitype.lookups[0].value
                    };
                    formData[index].sections[i].columns[j].properties[k].value.push(select);
                  }
                }
                if (formData[index].sections[i].columns[j].properties[k].uitype.uitype === 'LOOKUPCONDITION') {
                  formData[index].sections[i].columns[j].properties[k].lookupOptions = [];
                  if (formData[index].sections[i].columns[j].properties[k].value.length === 0) {
                    formData[index].sections[i].columns[j].properties[k].lookupOptions = [];
                    const select = {
                      name: formData[index].sections[i].columns[j].properties[k].uitype.lookups[0].name,
                      value: formData[index].sections[i].columns[j].properties[k].uitype.lookups[0].value
                    };
                    formData[index].sections[i].columns[j].properties[k].value.push(select);
                  }
                }

                if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.uitype === 'MTEXTTA') {
                  formData[index].sections[i].columns[j].properties[k].dbDummyValue = [];
                  formData[index].sections[i].columns[j].properties[k].dbValue = [];
                  if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].value.length === 0) {
                    formData[index].sections[i].columns[j].properties[k].value = [];
                  } else {
                    for (let l = 0; l < this.formObjectSubmit[index].sections[i].columns[j].properties[k].value.length; l++) {
                      const element = {
                        'value': this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[l].value,
                        'name': this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[l].name
                      };
                      formData[index].sections[i].columns[j].properties[k].dbDummyValue.push(element);
                    }
                  }

                } else if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.uitype === 'STEXTTA') {
                  formData[index].sections[i].columns[j].properties[k].dbDummyValue = [];
                  formData[index].sections[i].columns[j].properties[k].dbValue = [];
                  if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].value.length === 0) {
                    formData[index].sections[i].columns[j].properties[k].value = [];
                    if (this.createformtitle === 'Memo' || this.createformtitle === 'Outgoing Correspondence' || this.createformtitle === 'Outing Correspondence') {
                      if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].name === 'from') {
                        const element = {
                          'value': this.us.getCurrentUser().roles[0].id,
                          'name': this.us.getCurrentUser().roles[0].name
                        };
                        const itemList = {
                          'id': this.us.getCurrentUser().roles[0].id,
                          'name': this.us.getCurrentUser().roles[0].name
                        };
                        formData[index].sections[i].columns[j].properties[k].dbDummyValue = itemList;
                        formData[index].sections[i].columns[j].properties[k].value.push(element);
                      }
                    }
                  } else {
                    for (let l = 0; l < this.formObjectSubmit[index].sections[i].columns[j].properties[k].value.length; l++) {
                      const element = {
                        'id': this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[l].value,
                        'name': this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[l].name
                      };
                      formData[index].sections[i].columns[j].properties[k].dbDummyValue = element;
                    }
                  }
                } else if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.uitype === 'DBLOOKUP') {
                  formData[index].sections[i].columns[j].properties[k].dbDummyValue = [];
                  formData[index].sections[i].columns[j].properties[k].dbValue = [];
                  if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].value === '') {
                    formData[index].sections[i].columns[j].properties[k].value = [];
                  } else {
                    for (let l = 0; l < this.formObjectSubmit[index].sections[i].columns[j].properties[k].value.length; l++) {
                      const element = {
                        'id': this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[l].value,
                        'name': this.formObjectSubmit[index].sections[i].columns[j].properties[k].value[l].name
                      };
                      formData[index].sections[i].columns[j].properties[k].dbDummyValue.push(element);
                    }
                  }
                } else if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.uitype === 'LOOKUP') {
                  this.formObjectSubmit[index].sections[i].columns[j].properties[k].lookupOptions = [];
                  for (const options of this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.lookups) {
                    const lookup = {
                      name: options.name,
                      value: options.value
                    };
                    formData[index].sections[i].columns[j].properties[k].lookupOptions.push(lookup);
                  }
                } else if (this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.uitype === 'LOOKUPCONDITION') {
                  this.formObjectSubmit[index].sections[i].columns[j].properties[k].lookupOptions = [];
                  for (const options of this.formObjectSubmit[index].sections[i].columns[j].properties[k].uitype.lookups) {
                    const lookup = {
                      name: options.name,
                      value: options.value
                    };
                    formData[index].sections[i].columns[j].properties[k].lookupOptions.push(lookup);
                  }
                }
              }
            }
          } else if (formData[index].sections[i].type === 'TABLE') {
            for (let tj = 0; tj < formData[index].sections[i].rows.length; tj++) {
              // this.tableRowValue = this.tableRowValue + formData[index].sections[i].rows.length;
              // formData[index].sections[i].rows[tj].row = this.tableRowValue;
              for (let k = 0; k < formData[index].sections[i].rows[tj].items.length; k++) {
                formData[index].sections[i].rows[tj].items[k].rOnly = formData[index].sections[i].rowheader[k].rOnly;
                formData[index].sections[i].rows[tj].items[k].req = formData[index].sections[i].rowheader[k].req;
                formData[index].sections[i].rows[tj].items[k].name = formData[index].sections[i].rowheader[k].name;
                formData[index].sections[i].rows[tj].items[k].label = formData[index].sections[i].rowheader[k].label;
                formData[index].sections[i].rows[tj].items[k].label = formData[index].sections[i].rowheader[k].label;
                formData[index].sections[i].rows[tj].items[k].type = formData[index].sections[i].rowheader[k].type;
                formData[index].sections[i].rows[tj].items[k].uitype.uitype = formData[index].sections[i].rowheader[k].uitype.uitype;
                formData[index].sections[i].rows[tj].items[k].length = formData[index].sections[i].rowheader[k].length;
                if (formData[index].sections[i].rowheader[k].uitype.uitype === 'LOOKUP') {
                  formData[index].sections[i].rows[tj].items[k].lookup = formData[index].sections[i].rowheader[k].uitype.lookups;
                  formData[index].sections[i].rows[tj].items[k].lookupOptions = [];
                  if (formData[index].sections[i].rows[tj].items[k].value.length === 0) {
                    formData[index].sections[i].rows[tj].items[k].lookupOptions = [];
                    const select = {
                      name: formData[index].sections[i].rowheader[k].uitype.lookups[0].name,
                      value: formData[index].sections[i].rowheader[k].uitype.lookups[0].value
                    };
                    formData[index].sections[i].rows[tj].items[k].value.push(select);
                    for (const options of formData[index].sections[i].rowheader[k].uitype.lookups) {
                      const lookupValue = {
                        name: options.name,
                        value: options.value
                      };
                      formData[index].sections[i].rows[tj].items[k].lookupOptions.push(lookupValue);
                    }
                  } else {
                    formData[index].sections[i].rows[tj].items[k].lookupOptions = [];
                    const select = {
                      name: formData[index].sections[i].rows[tj].items[k].value[0].name,
                      value: formData[index].sections[i].rows[tj].items[k].value[0].value
                    };
                    formData[index].sections[i].rows[tj].items[k].value.push(select);
                    for (const options of formData[index].sections[i].rowheader[k].uitype.lookups) {
                      const lookupValue = {
                        name: options.name,
                        value: options.value
                      };
                      formData[index].sections[i].rows[tj].items[k].lookupOptions.push(lookupValue);
                    }
                  }
                }
                if (formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'STEXTTA' || formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'MTEXTTA' || formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'DBLOOKUP') {
                  formData[index].sections[i].rows[tj].items[k].dbValue = [];
                  formData[index].sections[i].rows[tj].items[k].dbDummyValue = [];
                }
                if (formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'DBLOOKUP') {
                  formData[index].sections[i].rows[tj].items[k].lookupOptions = [];
                  this.integrationservice.getDBLookup(formData[index].sections[i].rows[tj].items[k].uitype.dblookup).subscribe(res => this.assignDblookupvalueTable(res, index, i, tj, k));
                }
                if (formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'ROWSUM' || formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'MULTIPLICATION' || formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'ROWAVG' ||
                  formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'ROWDATEDIFF' || formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'ROWSUB' || formData[index].sections[i].rows[tj].items[k].uitype.uitype === 'ROWDIV') {
                  formData[index].sections[i].rows[tj].items[k].dbValue = [];
                  formData[index].sections[i].rows[tj].items[k].dbDummyValue = [];

                } if (this.formObjectSubmit[index].sections[i].rows[tj].items[k].uitype.uitype === 'DBLOOKUP') {
                  formData[index].sections[i].rows[tj].items[k].dbDummyValue = [];
                  formData[index].sections[i].rows[tj].items[k].dbValue = [];
                  if (this.formObjectSubmit[index].sections[i].rows[tj].items[k].value === '') {
                    formData[index].sections[i].rows[tj].items[k].value = [];
                  } else {
                    for (let l = 0; l < this.formObjectSubmit[index].sections[i].rows[tj].items[k].value.length; l++) {
                      const element = {
                        'id': this.formObjectSubmit[index].sections[i].rows[tj].items[k].value[l].value,
                        'name': this.formObjectSubmit[index].sections[i].rows[tj].items[k].value[l].name
                      };
                      formData[index].sections[i].rows[tj].items[k].dbDummyValue.push(element);
                    }
                  }
                }
                // if (this.formObjectSubmit[index].sections[i].rows[tj].items[k].uitype.uitype === 'LOOKUP') {
                //   this.formObjectSubmit[index].sections[i].rows[tj].items[k].lookupOptions = [];
                //   for (const options of this.formObjectSubmit[index].sections[i].rows[tj].items[k].uitype.lookups) {
                //     const lookup = {
                //       label: options.name,
                //       value: options.value
                //     };
                //     formData[index].sections[i].rows[tj].items[k].lookupOptions.push(lookup);
                //   }
                // }
                if (this.formObjectSubmit[index].sections[i].rows[tj].items[k].uitype.uitype === 'STEXTTA') {
                  formData[index].sections[i].rows[tj].items[k].dbDummyValue = [];
                  formData[index].sections[i].rows[tj].items[k].dbValue = [];
                  if (this.formObjectSubmit[index].sections[i].rows[tj].items[k].value.length === 0) {
                    formData[index].sections[i].rows[tj].items[k].value = [];
                    if (this.createformtitle === 'Memo' || this.createformtitle === 'Outgoing Correspondence' || this.createformtitle === 'Outing Correspondence') {
                      if (this.formObjectSubmit[index].sections[i].rows[tj].items[k].name === 'from') {
                        const element = {
                          'value': this.us.getCurrentUser().roles[0].id,
                          'name': this.us.getCurrentUser().roles[0].name
                        };
                        const itemList = {
                          'id': this.us.getCurrentUser().roles[0].id,
                          'name': this.us.getCurrentUser().roles[0].name
                        };
                        formData[index].sections[i].rows[tj].items[k].dbDummyValue = itemList;
                        formData[index].sections[i].rows[tj].items[k].value.push(element);
                      }
                    }
                  } else {
                    for (let l = 0; l < this.formObjectSubmit[index].sections[i].rows[tj].items[k].value.length; l++) {
                      const element = {
                        'id': this.formObjectSubmit[index].sections[i].rows[tj].items[k].value[l].value,
                        'name': this.formObjectSubmit[index].sections[i].rows[tj].items[k].value[l].name
                      };
                      formData[index].sections[i].rows[tj].items[k].dbDummyValue = element;
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.formObject = formData;
      let flag = 0;
      for (const docClass of this.formObject) {
        docClass.sections.forEach((element, formObjectSecIndex) => {
          if (element.type === 'FORM') {
            if (element.visible === 'TRUE' || element.visible === undefined) {
              if (element.rOnly === 'FALSE' || element.rOnly === undefined) {
                for (const cols of element.columns) {
                  for (const props of cols.properties) {
                    if (props.req === 'TRUE') {
                      const control: FormControl = new FormControl(null, Validators.required);
                      this.dynamicform.addControl(props.name, control);
                    } else {
                      const control: FormControl = new FormControl(null);
                      this.dynamicform.addControl(props.name, control);
                    }
                    if (props.rOnly === 'TRUE') {
                      this.dynamicform.controls[props.name].disable();
                    }
                    if (props.visible === 'FALSE') {
                      this.dynamicform.controls[props.name].disable();
                    }
                  }
                }
              } else {
                for (const cols of element.columns) {
                  for (const props of cols.properties) {
                    const control: FormControl = new FormControl(null);
                    this.dynamicform.addControl(props.name, control);
                    this.dynamicform.controls[props.name].disable();

                  }
                }
              }
            } else {
              for (const cols of element.columns) {
                for (const props of cols.properties) {
                  const control: FormControl = new FormControl(null);
                  this.dynamicform.addControl(props.name, control);
                  this.dynamicform.controls[props.name].disable();

                }
              }
            }
          } else if (element.type === 'TABLE') {
            for (let iTable = 0; iTable < element.rowheader.length; iTable++) {
              for (let jTable = 0; jTable < element.rows.length; jTable++) {
                for (let kTable = 0; kTable < element.rows[jTable].items.length; kTable++) {
                  if (element.rowheader[iTable].name === element.rows[jTable].items[kTable].name) {
                    const formControlName = element.rowheader[iTable].name + element.rows[jTable].row;
                    if (element.rowheader[iTable].req === 'TRUE') {
                      const control: FormControl = new FormControl(null, Validators.required);
                      this.dynamicform.addControl(formControlName, control);
                    } else {
                      const control: FormControl = new FormControl(null);
                      this.dynamicform.addControl(formControlName, control);
                    }
                    if (element.rowheader[iTable].rOnly === 'TRUE' || (element.rows[jTable].row === (9090 + formObjectSecIndex))) {
                      this.dynamicform.controls[formControlName].disable();
                    } else {
                      if (element.rOnly === 'TRUE') {
                        this.dynamicform.controls[formControlName].disable();
                      } else {
                      }
                    }
                    if (element.rowheader[iTable].visible === 'FALSE') {
                      this.dynamicform.controls[formControlName].disable();
                    } else {
                    }


                  }
                }
              }
            }
          } else {

          }

        });
      }
      for (let sceindex = 0; sceindex < this.formObjectSubmit[0].sections.length; sceindex++) {
        if (this.formObjectSubmit[0].sections[sceindex].type === 'FORM') {
          if (this.formObjectSubmit[0].sections[sceindex].visible === 'TRUE' || this.formObjectSubmit[0].sections[sceindex].visible === undefined) {
            if (this.formObjectSubmit[0].sections[sceindex].rOnly === 'FALSE' || this.formObjectSubmit[0].sections[sceindex].rOnly === undefined) {
              for (let col = 0; col < this.formObjectSubmit[0].sections[sceindex].columns.length; col++) {
                for (let prop = 0; prop < this.formObjectSubmit[0].sections[sceindex].columns[col].properties.length; prop++) {
                  if (this.formObjectSubmit[0].sections[sceindex].columns[col].properties[prop].visible === 'TRUE' || this.formObjectSubmit[0].sections[sceindex].columns[col].properties[prop].visible === undefined) {
                    if (this.formObjectSubmit[0].sections[sceindex].columns[col].properties[prop].rOnly === 'TRUE') {
                      // readOnlyProps++;
                      flag = 0;
                    } else {
                      flag = 1;
                      break;
                    }
                    // overAllProps++;
                  }
                }
              }
              if (flag === 1) {
                break;
              }
            }
          }
        } else {
          for (let iTable = 0; iTable < this.formObjectSubmit[0].sections[sceindex].rowheader.length; iTable++) {
            for (let jTable = 0; jTable < this.formObjectSubmit[0].sections[sceindex].rows.length; jTable++) {
              for (let kTable = 0; kTable < this.formObjectSubmit[0].sections[sceindex].rows[jTable].items.length; kTable++) {
                if (this.formObjectSubmit[0].sections[sceindex].rowheader[iTable].name === this.formObjectSubmit[0].sections[sceindex].rows[jTable].items[kTable].name) {
                  if (this.formObjectSubmit[0].sections[sceindex].rOnly === 'FALSE') {
                    if (this.formObjectSubmit[0].sections[sceindex].rowheader[iTable].rOnly === 'TRUE') {
                      flag = 0;
                    } else {
                      flag = 1;
                      break;
                    }
                    if (this.formObjectSubmit[0].sections[sceindex].rowheader[iTable].visible === 'FALSE' || this.formObjectSubmit[0].sections[sceindex].rowheader[iTable].visible === undefined) {
                      flag = 0;
                    } else {
                      flag = 1;
                      break;
                    }
                  } else {
                    flag = 1;
                    break;
                  }

                }
              }
            }
            if (flag === 1) {
              break;
            }
          }
        }
      }
      if (flag === 1) {
        this.submitButton = true;
      } else {
        this.submitButton = false;
      }

      for (const docClass of this.formObject) {
        docClass.sections.forEach((element, sectionIndex) => {
          if (element.type === 'FORM') {
            for (const cols of element.columns) {
              for (const props of cols.properties) {
                if (props.uitype.uitype === 'TEXT') {
                  if (props.value.length !== 0) {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value);
                  }
                } else if (props.uitype.uitype === 'ROWDATEDIFF') {
                  if (props.value.length === 0) {
                    this.dynamicform.controls[props.name].patchValue(0);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  }
                } else if (props.uitype.uitype === 'TEXTAF') {
                  if (props.value.length !== 0) {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value);
                  }
                } else if (props.uitype.uitype === 'LOOKUP') {
                  if (props.value.length !== 0) {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.uitype.lookups[0].value);
                  }

                } else if (props.uitype.uitype === 'LOOKUPCONDITION') {
                  if (props.value.length !== 0) {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.uitype.lookups[0].value);
                  }
                  if (props.uitype.condition !== undefined) {
                    for (let index = 0; index < props.uitype.condition.length; index++) {
                      if (props.uitype.condition[index].val === this.dynamicform.controls[props.name].value) {
                        if (props.uitype.condition[index].show !== undefined) {
                          for (let show = 0; show < props.uitype.condition[index].show.length; show++) {
                            this.showPropsOnScreen(props.uitype.condition[index].show[show]);
                          }
                        }
                        if (props.uitype.condition[index].hide !== undefined) {
                          for (let hide = 0; hide < props.uitype.condition[index].hide.length; hide++) {
                            this.hidePropsOnScreen(props.uitype.condition[index].hide[hide]);
                          }
                        }
                      }
                    }
                  }
                } else if (props.uitype.uitype === 'ROWSUM' || props.uitype.uitype === 'MULTIPLICATION' || props.uitype.uitype === 'ROWAVG' ||
                  props.uitype.uitype === 'ROWSUB' || props.uitype.uitype === 'ROWDIV') {
                  if (props.value.length === 0) {
                    this.dynamicform.controls[props.name].patchValue(null);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  }
                } else if (props.uitype.uitype === 'TIME') {
                  if (props.value.length === 0) {
                    // const date = new Date();
                    // let hours = date.getHours();
                    // let minutes = date.getMinutes();
                    // let seconds = date.getSeconds();
                    // const todays = date.getTime();
                    // this.dynamicform.controls[props.name].patchValue('06:00:00');
                  } else {
                    this.dynamicform.controls[props.name].patchValue(new Date());
                  }
                } else if (props.uitype.uitype === 'DATE') {
                  if (props.value.length === 0) {
                    const today = new Date(); // needs to be resolved helplinks
                    // https://github.com/kekeh/mydatepicker/blob/master/sampleapp/sample-date-picker-access-modifier/sample-date-picker-access-modifier.html
                    let dd = today.getDate();
                    let mm = today.getMonth() + 1; // January is 0!

                    let yyyy = today.getFullYear();
                    if (dd < 10) {
                      dd = 0 + dd;
                    }
                    if (mm < 10) {
                      mm = 0 + mm;
                    }
                    let todays;
                    if (this.ddmmyy) {
                      todays = yyyy + '-' + mm + '-' + dd;
                    } else {
                      todays = mm + '/' + dd + '/' + yyyy;
                    }
                    // const todayValue = new Date(todays).toISOString();
                    this.dynamicform.controls[props.name].patchValue(todays);
                  } else {
                    const value = props.value[0].value.split('/')[2] + '-' + props.value[0].value.split('/')[1] + '-' + props.value[0].value.split('/')[0];
                    this.dynamicform.controls[props.name].patchValue(value);
                  }
                } else if (props.uitype.uitype === 'ROWEXPIRYDATE') {
                  if (props.value.length === 0) {
                  } else {
                    const value = props.value[0].value.split('/')[2] + '-' + props.value[0].value.split('/')[1] + '-' + props.value[0].value.split('/')[0];
                    this.dynamicform.controls[props.name].patchValue(value);
                  }
                } else if (props.uitype.uitype === 'NUMBER') {
                  if (props.value.length !== 0) {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value);
                  }
                } else if (props.uitype.uitype === 'TEXTAREA') {
                  if (props.value.length !== 0) {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value);
                  }
                } else if (props.uitype.uitype === 'DATERANGE') {
                  if (props.value.length === 0) {
                    this.dynamicform.controls[props.name].patchValue(null);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(props.value[0].value);
                  }
                } else if (props.uitype.uitype === 'CHECKBOX') {
                  if (props.value.length === 0) {
                    this.dynamicform.controls[props.name].patchValue(null);
                  } else {
                    this.dynamicform.controls[props.name].patchValue(true);
                  }
                } else { }
              }
            }
          } else if (element.type === 'TABLE') {
            for (let iTable = 0; iTable < element.rows.length; iTable++) {
              for (let jTable = 0; jTable < element.rows[iTable].items.length; jTable++) {
                for (let kTable = 0; kTable < element.rowheader.length; kTable++) {
                  if (element.rowheader[kTable].name === element.rows[iTable].items[jTable].name) {
                    const formControlName = element.rowheader[jTable].name + element.rows[iTable].row;
                    if (element.rows[iTable].items[jTable].uitype.uitype === 'NUMBER') {
                      if (element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'DATE') {
                      if (element.rows[iTable].items[jTable].value === undefined || element.rows[iTable].items[jTable].value.length === 0) {
                        element.rows[iTable].items[jTable].value = [];
                        const today = new Date(); // needs to be resolved helplinks https://github.com/kekeh/mydatepicker/blob/master/sampleapp/sample-date-picker-access-modifier/sample-date-picker-access-modifier.html
                        let dd = today.getDate();
                        let mm = today.getMonth() + 1; // January is 0!
                        let yyyy = today.getFullYear();
                        if (dd < 10) {
                          dd = 0 + dd;
                        }
                        if (mm < 10) {
                          mm = 0 + mm;
                        }
                        const todays = yyyy + '-' + mm + '-' + dd;
                        this.dynamicform.controls[formControlName].patchValue(null);
                      } else {
                        const value = element.rows[iTable].items[jTable].value[0].value.split('/')[2] + '-' + element.rows[iTable].items[jTable].value[0].value.split[1] + '-' + element.rows[iTable].items[jTable].value[0].value.split('/')[0];
                        this.dynamicform.controls[formControlName].patchValue(value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'ROWEXPIRYDATE') {
                      if (element.rows[iTable].items[jTable].value === undefined || element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(null);
                      } else {
                        const value = element.rows[iTable].items[jTable].value[0].value.split('/')[2] + '-' + element.rows[iTable].items[jTable].value[0].value.split[1] + '-' + element.rows[iTable].items[jTable].value[0].value.split('/')[0];
                        this.dynamicform.controls[formControlName].patchValue(value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'TEXT') {
                      if (element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'LOOKUP') {
                      if (element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].uitype.lookups[0].value);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'CHECKBOX') {
                      if (element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(null);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'AUTONUMBER') {
                      if (element.rows[iTable].items[jTable].value.length === 0 && element.rows[iTable].row !== (9090 + sectionIndex)) {
                        this.dynamicform.controls[formControlName].patchValue(iTable + 1);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'ROWSUM' || element.rows[iTable].items[jTable].uitype.uitype === 'MULTIPLICATION' || element.rows[iTable].items[jTable].uitype.uitype === 'ROWAVG' ||
                      element.rows[iTable].items[jTable].uitype.uitype === 'ROWSUB' || element.rows[iTable].items[jTable].uitype.uitype === 'ROWDIV') {
                      if (element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(null);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                      //   let colCalcFlag = 0;
                      //     if (element.rows[iTable].items[jTable].colcalc.type === 'SUM' || element.rows[iTable].items[jTable].colcalc.type === 'AVERAGE') {
                      //       // let colCalcFlag = 0;
                      //      console.log(element.rows[iTable].row);
                      //      console.log(9090 + sectionIndex);
                      //      if ( iTable === sectionIndex) {
                      //       if (element.rows[iTable].row === (9090 + sectionIndex)) {
                      //         colCalcFlag = 0;
                      //         break;
                      //       } else {
                      //         colCalcFlag = 1;
                      //         setTimeout(() => {
                      //           // if (this.footercalled === false) {
                      //           this.addNewTableRow(sectionIndex, 'footer');
                      //           // this.footercalled = true;
                      //           // }
                      //         }, 0);
                      //     }
                      //   }
                      // }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'ROWDATEDIFF') {
                      if (element.rows[iTable].items[jTable].value.length === 0) {
                        this.dynamicform.controls[formControlName].patchValue(0);
                      } else {
                        this.dynamicform.controls[formControlName].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      }
                    } else if (element.rows[iTable].items[jTable].uitype.uitype === 'TEXTAREA') {
                      if (element.rows[iTable].items[jTable].value.length !== 0) {
                        this.dynamicform.controls[element.rows[iTable].items[jTable].name + element.rows[iTable].row].patchValue(element.rows[iTable].items[jTable].value[0].value);
                      } else {
                        this.dynamicform.controls[element.rows[iTable].items[jTable].name + element.rows[iTable].row].patchValue(element.rows[iTable].items[jTable].value);
                      }
                    }
                  }
                }
              }
            }
          }
        });

      }


      if (this.readOnly === 'true') {
        this.dynamicform.disable();
      }
      setTimeout(() => {
        if (this.formObjectSubmit && this.formObjectSubmit.length > 0) {
          for (let sl = 0; sl < this.formObjectSubmit[0].sections.length; sl++) {
            if (this.formObjectSubmit[0].sections[sl].type === 'TABLE') {
              if (this.formObjectSubmit[0].sections[sl].rows[this.formObjectSubmit[0].sections[sl].rows.length - 1].row !== (9090 + sl)) {
                if (this.tableRowValue < this.formObjectSubmit[0].sections[sl].rows[this.formObjectSubmit[0].sections[sl].rows.length - 1].row) {
                  this.tableRowValue = this.formObjectSubmit[0].sections[sl].rows[this.formObjectSubmit[0].sections[sl].rows.length - 1].row;
                }
              } else {
                if (this.tableRowValue < this.formObjectSubmit[0].sections[sl].rows[this.formObjectSubmit[0].sections[sl].rows.length - 2].row) {
                  this.tableRowValue = this.formObjectSubmit[0].sections[sl].rows[this.formObjectSubmit[0].sections[sl].rows.length - 2].row;
                }
              }
              let colCalcFlag = 0;
              let itemColCalcFlag = 0;
              for (let rw = 0; rw < this.formObjectSubmit[0].sections[sl].rows.length; rw++) {
                if (this.formObjectSubmit[0].sections[sl].rows[rw].row === (9090 + sl)) {
                  colCalcFlag = 0;
                  break;
                } else {
                  colCalcFlag = 1;

                }

              }
              if (colCalcFlag === 1) {
                for (let ro = 0; ro < this.formObjectSubmit[0].sections[sl].rows.length; ro++) {
                  for (let it = 0; it < this.formObjectSubmit[0].sections[sl].rows[ro].items.length; it++) {
                    if (this.formObjectSubmit[0].sections[sl].rows[ro].items[it].uitype.colcalc) {
                      if (this.formObjectSubmit[0].sections[sl].rows[ro].items[it].uitype.colcalc.type === 'SUM' || this.formObjectSubmit[0].sections[sl].rows[ro].items[it].uitype.colcalc.type === 'AVERAGE') {
                        itemColCalcFlag = 1;
                        break;
                      } else {
                        itemColCalcFlag = 0;
                      }
                    }
                  }
                }
              }
              if (colCalcFlag === 1 && itemColCalcFlag === 1) {
                this.addNewTableRow(sl, 'footer');
              }
            }
          }
        }
      }, 0);
    }
  }
  assignDblookupvalueTable(res, index, i, tj, k) {
    const value = JSON.parse(res._body);
    for (let val = 0; val < value.length; val++) {
      const elementval = {
        label: value[val].label,
        value: value[val].value
      };
      this.formObject[index].sections[i].rows[tj].items[k].lookupOptions.push(elementval);
    }
    if (this.formObject[index].sections[i].rows[tj].items[k].value.length === 0) {
      this.dynamicform.controls[(this.formObject[index].sections[i].rows[tj].items[k].name + this.formObject[index].sections[i].rows[tj].row)].patchValue(value[0].value);
      this.formObject[index].sections[i].rows[tj].items[k].value.push(this.formObject[index].sections[i].rows[tj].items[k].lookupOptions[0]);
    } else if (this.formObject[index].sections[i].rows[tj].items[k].value.length > 0) {
      this.dynamicform.controls[(this.formObject[index].sections[i].rows[tj].items[k].name + this.formObject[index].sections[i].rows[tj].row)].patchValue(this.formObject[index].sections[i].rows[tj].items[k].value[0].value);
    }
  }
  assignDblookupvalue(res, index, i, j, k) {
    const value = JSON.parse(res._body);
    for (let val = 0; val < value.length; val++) {
      //  if (val === 0 ) {
      //   const elementval = {
      //     'id': value[val].value,
      //   'itemName':  value[val].label
      // };
      //  }
      const elementval = {
        name: value[val].label,
        value: value[val].value

      };
      this.formObject[index].sections[i].columns[j].properties[k].lookupOptions.push(elementval);
    }
    if (this.formObject[index].sections[i].columns[j].properties[k].value.length > 0) {
      this.dynamicform.controls[this.formObject[index].sections[i].columns[j].properties[k].name].patchValue(this.formObject[index].sections[i].columns[j].properties[k].value[0].value);
    }
  }
  showPropsOnScreen(showProp: any) {
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'FORM') {
          for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
            for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
              if (this.formObject[index].sections[i].columns[j].properties[k].name === showProp) {
                if (this.formObject[index].sections[i].columns[j].properties[k].req === 'TRUE') {
                  if (this.formObject[index].sections[i].columns[j].properties[k].value.length === 0) {
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValue(null);
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValidators([Validators.required]);
                  } else {
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValue(this.formObject[index].sections[i].columns[j].properties[k].value[0].value);
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValidators([Validators.required]);
                  }
                } else {
                  if (this.formObject[index].sections[i].columns[j].properties[k].value.length === 0) {
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValue(null);
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValidators([]);
                  } else {
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValue(this.formObject[index].sections[i].columns[j].properties[k].value[0].value);
                    this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).setValidators([]);
                  }
                }
                // if (this.formObject[index].sections[i].columns[j].properties[k].rOnly === 'TRUE') {
                //   this.dynamicform.controls[this.formObject[index].sections[i].columns[j].properties[k].name].disable();
                // }
                // if (this.formObject[index].sections[i].columns[j].properties[k].visible === 'FALSE') {
                //   this.dynamicform.controls[this.formObject[index].sections[i].columns[j].properties[k].name].disable();
                // }
                // this.formObjectSubmit[index].sections[i].columns[j].properties[k].visible = 'TRUE';
                this.formObject[index].sections[i].columns[j].properties[k].visible = 'TRUE';
              }
            }
          }
        }
      }
    }
    // for (let index = 0; index < this.formObject.length; index++) {
    //   for (let i = 0; i < this.formObject[index].sections.length; i++) {
    //     if (this.formObject[index].sections[i].type === 'FORM') {
    //       for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
    //         for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
    //           if (this.formObject[index].sections[i].columns[j].properties[k].name === showProp) {
    //             if (showProp.req === 'TRUE') {
    //               if (this.formObject[index].sections[i].columns[j].properties[k].value.length === 0) {
    //                 const control: FormControl = new FormControl(null,  Validators.required);
    //                 this.dynamicform.addControl(showProp.name, control);
    //               }else {
    //                 const control: FormControl = new FormControl(this.formObject[index].sections[i].columns[j].properties[k].value[0].value,  Validators.required);
    //                 this.dynamicform.addControl(showProp.name, control);
    //               }
    //           } else {
    //             if (this.formObject[index].sections[i].columns[j].properties[k].value.length === 0) {
    //               const control: FormControl = new FormControl(null);
    //               this.dynamicform.addControl(showProp.name, control);
    //             }else {
    //               const control: FormControl = new FormControl(this.formObject[index].sections[i].columns[j].properties[k].value[0].value);
    //               this.dynamicform.addControl(showProp.name, control);
    //             }
    //           }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
  hidePropsOnScreen(showProp) {
    this.dynamicform.removeControl(showProp.name);
    for (let index = 0; index < this.formObject.length; index++) {
      for (let i = 0; i < this.formObject[index].sections.length; i++) {
        if (this.formObject[index].sections[i].type === 'FORM') {
          for (let j = 0; j < this.formObject[index].sections[i].columns.length; j++) {
            for (let k = 0; k < this.formObject[index].sections[i].columns[j].properties.length; k++) {
              if (this.formObject[index].sections[i].columns[j].properties[k].name === showProp) {
                this.formObject[index].sections[i].columns[j].properties[k].visible = 'FALSE';
                this.formObject[index].sections[i].columns[j].properties[k].value = [];
                this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).clearValidators();
                this.dynamicform.get(this.formObject[index].sections[i].columns[j].properties[k].name).updateValueAndValidity();
              }
            }
          }
        }
      }
    }
  }
  cancelForm(vale) {
    // this.segmentChanged(vale);
    this.formCancel.emit(vale);
    this.formObject = [];
  }
}
