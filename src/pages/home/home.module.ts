import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage), ChartsModule, TranslateModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePageModule {

}
