import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { DynamicFormComponent } from './dynamic-form';

@NgModule({
    declarations: [
        // DynamicFormComponent,
    ],
    imports: [
        // IonicPageModule.forChild(DynamicFormComponent),
        TranslateModule, SelectSearchableModule
    ],
})
export class DynamicFormModule { }
