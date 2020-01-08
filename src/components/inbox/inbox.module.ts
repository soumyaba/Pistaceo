import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxComponent } from './inbox';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        InboxComponent,
    ],
    imports: [
        IonicPageModule.forChild(InboxComponent), TranslateModule
    ],
    exports: [
        InboxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class InboxComponentModule { }
