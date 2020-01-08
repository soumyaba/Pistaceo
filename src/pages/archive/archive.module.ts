import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivePage } from './archive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ArchivePage,
  ],
  imports: [
    IonicPageModule.forChild(ArchivePage), TranslateModule
  ],
})
export class ArchivePageModule {}
