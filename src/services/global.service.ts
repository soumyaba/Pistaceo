import { Injectable } from "../../node_modules/@angular/core";
import { Events } from "ionic-angular";

@Injectable()
export class GlobalService {
  // public baseUrl = 'http://192.168.1.34:8080/Productiviti/resources/';
  // public baseUrl = 'http://106.51.66.219:9080/CMS/resources/';
  //  public baseUrl = 'http://106.51.66.219:9080/Productiviti/resources/';
  //  public baseUrl = 'http://106.51.66.219/Productiviti/resources/';
  // public  baseUrl = 'http://106.51.66.219:4000/Productiviti/resources/';/
  //  public  baseUrl = 'http://106.51.66.219:8080/Productiviti/resources/';
  // http://106.51.66.219:8080/Productiviti/resources/
  public baseUrl = window.localStorage.getItem('baseurls');

  //  for 24 from outside
  constructor(public events: Events) {
    // events.subscribe('shareObject', (amt) => {
    //   if(amt !== undefined) {
    //   localStorage.setItem('baseurls', amt.value);
    //   this.baseUrl = localStorage.getItem('baseurls');
    //   }
    // });
    // this.baseUrl = window.localStorage.getItem('baseurls');
    // console.log(this.baseUrl);
    if (localStorage.getItem('baseurls') === null || localStorage.getItem('baseurls') === 'null' || localStorage.getItem('baseurls') === undefined) {
      localStorage.setItem('baseurl', 'https://www.pistaceo.com/pistaceo/resources/');
      this.baseUrl = 'https://www.pistaceo.com/pistaceo/resources/';
    }
  }
  setURL() {
    this.baseUrl = window.localStorage.getItem('baseurls');
  }
}