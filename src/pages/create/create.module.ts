import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePage } from './create';
import { TranslateModule } from '@ngx-translate/core';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { DynamicFormModule } from '../../components/dynamic-form/dynamic-form.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePage), TranslateModule, SelectSearchableModule, ComponentsModule
  ],
})
export class CreatePageModule { }
