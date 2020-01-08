import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentPage } from './document';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentPage), ComponentsModule, TranslateModule
  ],
})
export class DocumentPageModule {}
