import { NgModule } from '@angular/core';
import { SignaturePadComponent } from './signature-pad/signature-pad';
import { DocumentViewComponent } from './document-view/document-view';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form';
import { SelectSearchableModule } from 'ionic-select-searchable';
@NgModule({
    declarations: [
        SignaturePadComponent,
        DocumentViewComponent,
        DynamicFormComponent],
    imports: [IonicModule, CommonModule, TranslateModule, SelectSearchableModule],
    exports: [
        SignaturePadComponent,
        DocumentViewComponent,
        DynamicFormComponent]
})
export class ComponentsModule { }
