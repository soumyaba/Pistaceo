import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWordViewPage } from './search-word-view';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchWordViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWordViewPage), TranslateModule
  ],
})
export class SearchWordViewPageModule {}
