import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FolderPermissionsPage } from './folder-permissions';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FolderPermissionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FolderPermissionsPage),TranslateModule
  ],
})
export class FolderPermissionsPageModule {}
