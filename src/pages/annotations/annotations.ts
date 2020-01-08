import { Component, OnInit, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Slides } from 'ionic-angular';
import { ContentService } from '../../services/content.service';
import { LoadingService } from '../../services/loading-service';
import { SignaturePadComponent } from '../../components/signature-pad/signature-pad';
import { DocumentService } from '../../services/document.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast-service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AnnotationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annotations',
  templateUrl: 'annotations.html',
})
export class AnnotationsPage implements OnInit{
@ViewChild(Slides) slides: Slides;
@Output() showsave = new EventEmitter();
public documentId = undefined;
public dataImage;
public currentPage;
public displayImage;
@ViewChild('signature') signaturePad: SignaturePadComponent;
public imageannotationURL= [];
public signatureDisabled;
public signatureIsEmpty = false;
public canvasWidth;
public canvasheight;
public signUrl;
public allSavedAnnotaion = [];
public widthof;
public animateClass: any;
public pageValue = 1;
public showZoom = 'true';
  constructor(public navCtrl: NavController, public navParams: NavParams,private cs: ContentService,
    private us: UserService,private loading:LoadingService, private ds: DocumentService,
    private tr: ToastService, private platform: Platform, public events: Events, private translate: TranslateService) {
    this.documentId = this.navParams.get('docId');
    platform.ready().then((readySource) => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
      if(platform.is('ipad')){
        this.canvasWidth = platform.width() * 0.58;
        this.canvasheight = platform.height();
        this.widthof = this.canvasWidth;
        if(this.platform.isLandscape()) {
          this.canvasWidth = platform.width() * 0.65;
          this.canvasheight = this.canvasheight * 2;
        }
        } else{
        this.canvasWidth = platform.width() - 50 ;
        this.canvasheight = platform.height();
        this.widthof = this.canvasWidth;
        if(this.platform.isLandscape()) {
          this.canvasheight = this.canvasheight * 2;
        }
        }
        if(platform.is('tablet')) {
          if(this.platform.isLandscape()) {
            this.canvasWidth = this.platform.width() * 0.62;
            this.canvasheight = this.platform.height() * 2;
          }
        }
    });
    events.subscribe('shareObject', (objects) => {
      // console.log('Welcome', objects.save);
     if(objects.save === 'ok') {
      this.saveImageAnnotations();
     } else {
       if(objects.save === 'clear') {
      this.delete();
       }
     }
     if(objects.enable === 'true') {
       this.signatureDisabled = 'write';
       this.showZoom = 'false';
     }
  });
  events.subscribe('imageObjects', (image) => {
    this.pageValue = image.pageNo;
   this.ionViewWillEnter();

  });
  this.animateClass = { 'zoom-in': true };
  }
  ionViewWillEnter() {
    this.cs.getPreviewPage(this.documentId, this.pageValue).subscribe(data => {this.preview(data);}, error =>{} );
    this.showsave.emit(this.signatureIsEmpty);
  }
ngOnInit() {
 this.loading.show();
 this.cs.getPreviewPage(this.documentId, this.pageValue).subscribe(data => {this.preview(data); this.loading.hide();}, error => this.loading.hide() );
this.showsave.emit(this.signatureIsEmpty);
this.slides.lockSwipes(true);
}
preview(data) {
  this.ds.getAnnotations(this.documentId).subscribe( resdata => this.getPreviewImage(data,resdata) );
}
getPreviewImage(data, resdata) {
  if(resdata._body !== '') {
  this.allSavedAnnotaion = [];
  this.allSavedAnnotaion = JSON.parse(resdata._body);
  }
  this.imageannotationURL = [];
  if(data._body !== '' || data._body !== undefined) {
    // this.canvasWidth = document.getElementById('myP').clientWidth - 20;
    this.dataImage = JSON.parse(data._body);
    if(this.dataImage != '')
        {
          this.currentPage = this.dataImage.pageNo;
          this.displayImage = "data:Image/png;base64,"+ this.dataImage.image;
          // this.signaturePad.fromDataURL = this.displayImage;
          const url = {
             url: this.ds.downloadPreviewPage(this.documentId , this.currentPage)
            // url: 'http://192.168.1.34:8080/Productiviti/resources/DocumentService/downloadPreviewPage?id=08EFA731-37BF-4952-9492-04278F003511&page=1&empno=1'
            };
          // this.signaturePad.fromDataURL = this.displayImage;
        let  tempUrl = [];
        tempUrl.push(url);
            for (let index = 0; index < this.allSavedAnnotaion.length; index++) {
              if (this.allSavedAnnotaion[index].type === 'IMAGE' && this.allSavedAnnotaion[index].pageNo === this.currentPage) {
                const url1 = {
                url: this.ds.downloadAnnotation(this.allSavedAnnotaion[index].imageId , 1)
                };
                tempUrl.push(url1);
              }
          }
            // this.signatureDisabled = 'readonly';
            // console.log(url);
            this.imageannotationURL = tempUrl;
            let btns = {
              btnshow: "true",
              annoatateBtns: "false"
          }

          this.events.publish("shareObjectforadd", btns, 2);
              if(this.signaturePad !== undefined) {
              this.signaturePad.clear();
              }
          this.signatureDisabled = 'readonly';
            if(this.signaturePad !== undefined) {
          this.signaturePad.fromDataURL(this.imageannotationURL);
            }

        }
      }
}
getAllAnnotation(data) {
  this.allSavedAnnotaion = [];
  this.allSavedAnnotaion = JSON.parse(data._body);
  for (
    let index = 0; index < this.allSavedAnnotaion.length; index++) {
    if (this.allSavedAnnotaion[index].type === 'IMAGE' && this.allSavedAnnotaion[index].pageNo === this.currentPage) {
      const url2 = {
      url: this.ds.downloadAnnotation(this.allSavedAnnotaion[index].imageId , 1)
      };
      this.imageannotationURL.push(url2);
  }
}
}
  ionViewDidLoad() {
    // console.log('ionViewDidLoad AnnotationsPage');
  }
  firstPage(first) {
    this.loading.show();
  this.cs.getPreviewPage(this.documentId  , first).subscribe(data => {  this.preview(data); this.loading.hide();} , error => {this.loading.hide();});
}
previousPage(prev) {
  if(prev > 0) {
    this.loading.show();
  this.cs.getPreviewPage(this.documentId  , prev).subscribe(data => {  this.preview(data);this.loading.hide(); } , error => {this.loading.hide();});
  }
}
nextPage(forward) {
  if((forward-1) < this.dataImage.pageCount) {
    this.loading.show();
  this.cs.getPreviewPage(this.documentId  , forward).subscribe(data => {  this.preview(data);this.loading.hide(); } , error => {this.loading.hide();});
  }
}
lastPage(last) {
  this.loading.show();
  this.cs.getPreviewPage(this.documentId  , last).subscribe(data => {  this.preview(data); this.loading.hide();} , error => {this.loading.hide();});
}
addAnnotaions() {

}
drawComplete(event) {
  // will be notified of szimek/signature_pad's onEnd event
  this.signatureIsEmpty = true;
  // this.showsave.emit(this.signatureIsEmpty);
  // this.events.publish('true', this.signatureIsEmpty);
  // console.log(this.signaturePad.toDataURL());
  let params = {
    signatureIsEmpty: "true",
}

this.events.publish("shareObject", params, 1);
}
saveImageAnnotations() {
  if(this.signaturePad !== undefined) {
  this.signUrl = this.signaturePad.toDataURL();
  const byteCharacters  = atob(this.signUrl.replace('data:image/png;base64,', ''));
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray] , { type: 'image/png' } );
        // saveAs(blob, this.activityinfo.refNo);
          let string: String;
          string = this.us.getCurrentUser().EmpNo + '-imageAnnoatation.png';
        const docInfo = {
         docclass: 'ProductivitiDocument',
         props: [{
           'name': 'Document Title',
           'symName': 'DocumentTitle',
           'dtype': 'STRING',
           'mvalues': [ string ],
           'mtype': 'N',
           'len': 255,
           'rOnly': 'false',
           'hidden': 'false',
           'req': 'false'
         }],
         accessPolicies: []
       };
        const formData = new FormData();
       formData.append('DocInfo', JSON.stringify(docInfo));
      // formData.append('file', scannedPdfName);
       formData.append('document', blob , this.us.getCurrentUser().EmpNo + '-imageAnnoatation.png');
        this.ds.addDocument(formData).subscribe(data => this.digitalSignAnnotation(data));
}
}
delete() {
  if(this.signaturePad !== undefined) {
  this.signaturePad.clear();
  this.signatureDisabled = "readonly";
  this.showZoom = 'true';
  this.sendFalse();
  }
}
digitalSignAnnotation(data) {
  this.sendFalse();
  this.signatureIsEmpty = false;
  this.signaturePad.clear();
  this.signatureDisabled = "readonly";
  this.showZoom = 'true';
    const image = {
      docId: this.documentId,
   imageId: data._body,
   type: 'IMAGE',
   empNo: this.us.getCurrentUser().EmpNo,
   xPos: 0,
   yPos: 0,
   userName: this.us.getCurrentUser().userLogin,
   pageNo: this.currentPage
   };
  //  this.annotationid++;
   this.ds.saveAnnotation(image).subscribe(resdata => this.savedAnnotation(resdata , data._body) );
}
savedAnnotation(resdata, dataid) {
this.tr.presentToast(this.translate.instant('Saved Annotation'));
  // this.imageannotationURL = [];
  // const url = {
  //   url: this.ds.downloadPreviewPage(this.documentId , this.currentPage)
  //   };
  //   let tempUrl = [];
  //   tempUrl.push(url);
  // for (let index = 0; index < this.allSavedAnnotaion.length; index++) {
  //     if (this.allSavedAnnotaion[index].type === 'IMAGE' && this.allSavedAnnotaion[index].pageNo === this.currentPage) {
  //       const url1 = {
  //       url: this.ds.downloadAnnotation(this.allSavedAnnotaion[index].imageId , 1)
  //       };
  //       tempUrl.push(url1);
  //     }
  // }
  // const url2 = {
  //   url: this.ds.downloadAnnotation(dataid , 1)
  //   };
  //   tempUrl.push(url2);
  //    this.imageannotationURL = tempUrl;
  this.cs.getPreviewPage(this.documentId, this.currentPage).subscribe(data => {this.preview(data)});
}
sendFalse() {
  let params = {
    signatureIsEmpty: "false",
}
this.events.publish("shareObject", params, 1);
}
}
