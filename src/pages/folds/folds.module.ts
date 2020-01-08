import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoldsPage } from './folds';

@NgModule({
  declarations: [
    FoldsPage,
  ],
  imports: [
    IonicPageModule.forChild(FoldsPage),
  ],
  exports: [
    FoldsPage
  ]
})
export class FoldsPageModule {}
