import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import { LoadingService } from '../../services/loading-service';
import { ContentService } from '../../services/content.service';

/**
 * Generated class for the SearchWordViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-word-view',
  templateUrl: 'search-word-view.html',
})
export class SearchWordViewPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  public docId;
  public imageToShow;
  public searchWordPageList;
  public curPage;
  public totalPages;
  public firstPage = false;
  public lastPage = false;
  public searchValue;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingService, private cs: ContentService) {
    this.docId = navParams.get('id');
    this.searchValue = navParams.get('searchValue');
  }
  ngOnInit() {
    this.loading.show();
    this.imageToShow = '';
    this.cs.getSearchPreviewPage(this.docId, 0, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide() }, error => { this.loading.hide() });
  }
  ionViewDidLoad() {

  }
  getsSearchPreviewPage(data) {
    if (data._body) {
      this.searchWordPageList = new Array();
      const previewImage = JSON.parse(data._body);
      for (let index = 0; index < previewImage.pages.length; index++) {
        this.searchWordPageList.push(previewImage.pages[index]);
      }
      this.imageToShow = 'data:image/png;base64,' + previewImage.ti.image;
      console.log(this.imageToShow);
      this.curPage = previewImage.ti.pageNo - 1;
      this.totalPages = previewImage.ti.pageCount;
      this.nextButtonDisplay();
      this.previousButtonDisplay();
    }
  }

  previousButtonDisplay() {
    for (let index = 0; index < this.searchWordPageList.length; index++) {
      if ((this.searchWordPageList[index] === this.curPage + 1 && index > 0) || (this.searchWordPageList[index] < this.curPage + 1)) {
        this.firstPage = true;
        break;
      } else {
        this.firstPage = false;
      }
    }
  }
  nextButtonDisplay() {
    for (let index = 0; index < this.searchWordPageList.length; index++) {
      if ((this.searchWordPageList[index] === this.curPage + 1 && index < this.searchWordPageList.length)) {
        this.lastPage = true;
        break;
      } else if (this.curPage + 1 < this.searchWordPageList[index]) {
        this.lastPage = true;
        break;
      } else {
        this.lastPage = false;
      }
    }
  }
  nextPageClicked() {
    this.loading.show();
    let changedPage;
    for (let index = 0; index < this.searchWordPageList.length; index++) {
      if ((this.searchWordPageList[index] === this.curPage + 1 && index < this.searchWordPageList.length)) {
        this.lastPage = true;
        changedPage = this.searchWordPageList[index + 1];
        break;
      } else if (this.curPage + 1 < this.searchWordPageList[index]) {
        this.lastPage = true;
        changedPage = this.searchWordPageList[index];
        break;
      } else {
        this.lastPage = false;
      }
    }
    this.imageToShow = '';
    this.cs.getSearchPreviewPage(this.docId, changedPage, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide() }, error => { this.loading.hide() });
  }

  close() {
    this.navCtrl.pop();
  }
  previousPageClicked() {
    this.loading.show();
    let changedPage;
    for (let index = 0; index < this.searchWordPageList.length; index++) {
      if (this.searchWordPageList[index] === this.curPage - 1 && index > 0) {
        this.firstPage = true;
        changedPage = this.searchWordPageList[index - 1];
        break;
      } else {
        this.firstPage = false;
      }
    }
    this.imageToShow = '';
    this.cs.getSearchPreviewPage(this.docId, changedPage, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide(); }, error => { this.loading.hide() });
  }
  firstPageShow(first) {
    this.loading.show();
    // this.btnshow = true;
    // this.annoatateBtns = false;
    this.cs.getSearchPreviewPage(this.docId, first, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide() }, error => { this.loading.hide() });
  }
  previousPage(prev) {
    if (prev > 0) {
      this.loading.show();
      // this.btnshow = true;
      // this.annoatateBtns = false;
      this.cs.getSearchPreviewPage(this.docId, prev, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide() }, error => { this.loading.hide() });
    }
  }
  nextPage(forward) {
    // if((forward-1) < this.totalPages) {
    this.loading.show();
    // this.btnshow = true;
    // this.annoatateBtns = false;
    this.cs.getSearchPreviewPage(this.docId, forward, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide() }, error => { this.loading.hide() });
    // }
  }
  lastPageShow(last) {
    this.loading.show();
    // this.btnshow = true;
    // this.annoatateBtns = false;
    this.cs.getSearchPreviewPage(this.docId, last, this.searchValue).subscribe(data => { this.getsSearchPreviewPage(data); this.loading.hide() }, error => { this.loading.hide() });
  }
}
