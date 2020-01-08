import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnotationsPage } from './annotations';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    AnnotationsPage
  ],
  imports: [
    IonicPageModule.forChild(AnnotationsPage),  CommonModule, ComponentsModule,TranslateModule
  ],
})
export class AnnotationsPageModule {}
