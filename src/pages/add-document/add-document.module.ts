import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDocumentPage } from './add-document';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDocumentPage), TranslateModule
  ],
})
export class AddDocumentPageModule {}
