import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { MyApp } from './app.component';
import { AppSettings } from '../services/app-settings'
import { ToastService } from '../services/toast-service'
import { LoadingService } from '../services/loading-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';
import { UserService } from '../services/user.service';
import { HttpInterceptor } from '../services/interceptor.service';
import { WorkService } from '../services/work.service';
import { SigninPageModule } from '../pages/signin/signin.module';
import { GlobalService } from '../services/global.service';
import { ActivityPageModule } from '../pages/activity/activity.module';
import { SchemaService } from '../services/schema.service';
import { DocumentService } from '../services/document.service';
import { InboxComponentModule } from '../components/inbox/inbox.module';
import { SentPageModule } from '../pages/sent/sent.module';
import { DraftsPageModule } from '../pages/drafts/drafts.module';
import { ContentService } from '../services/content.service';
import { DocumentPageModule } from '../pages/document/document.module';
import { AddDocumentPageModule } from '../pages/add-document/add-document.module';
import { FolderPermissionsPageModule } from '../pages/folder-permissions/folder-permissions.module';
import { CheckinFilePageModule } from '../pages/checkin-file/checkin-file.module';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { PropertiesPageModule } from '../pages/properties/properties.module';
import { PropertyPageModule } from '../pages/property/property.module';
import { AnnotationsPageModule } from '../pages/annotations/annotations.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../components/components.module';
import { File } from '@ionic-native/file';
import { SearchPageModule } from '../pages/search/search.module';
import { ShowAttachmentPageModule } from '../pages/show-attachment/show-attachment.module';
import { SearchWordViewPageModule } from '../pages/search-word-view/search-word-view.module';
import { ArchivePageModule } from '../pages/archive/archive.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ShowannotationlistPageModule } from '../pages/showannotationlist/showannotationlist.module';
import { ConfigurationService } from '../services/configuration.service';
import { AddUrlPageModule } from '../pages/add-url/add-url.module';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CreatePageModule } from '../pages/create/create.module';
import { IntegrationService } from '../services/integration.service';
import { DynamicFormModule } from '../components/dynamic-form/dynamic-form.module';
import { SimpleFormPageModule } from '../pages/simple-form/simple-form.module';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HomePageModule, SigninPageModule, ActivityPageModule, InboxComponentModule, SentPageModule, DynamicFormModule,
    DraftsPageModule, DocumentPageModule, AddDocumentPageModule, FolderPermissionsPageModule, CheckinFilePageModule, PropertiesPageModule, PropertyPageModule, AnnotationsPageModule,
    BrowserAnimationsModule, ComponentsModule, SearchPageModule, ShowAttachmentPageModule, SearchWordViewPageModule, ArchivePageModule, AddDocumentPageModule,
    ShowannotationlistPageModule, AddUrlPageModule, CreatePageModule, SimpleFormPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar, SplashScreen,
    ToastService, LoadingService, UserService, HttpInterceptor, WorkService, GlobalService, SchemaService, DocumentService, ContentService, FileTransfer,
    FileTransferObject, AndroidPermissions, IntegrationService,
    File, ConfigurationService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {
}
