import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from './activity';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityPage),FormsModule, ReactiveFormsModule, SelectSearchableModule, ComponentsModule,
     TranslateModule
  ],
})
export class ActivityPageModule {}
