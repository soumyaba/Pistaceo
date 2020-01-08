import { IService } from './IService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class MapsService implements IService {

    constructor(private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'maps';

    getTitle = (): string => 'Maps';

    getAllThemes = (): Array<any> => {
        return [
            { "title": "GMAPS + Location  Details", "theme": "layout1" },
            { "title": "GMAPS + About Us", "theme": "layout2" },
            { "title": "Full Screen View", "theme": "layout3" }
        ];
    };

    getDataForTheme = (menuItem: any): any => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    //GMAPS + Location  Details data
    getDataForLayout1 = (): any => {
        return {
            "headerTitle": "GMAPS + Location  Details",
            "title": "Museum of Modern Art",
            "reviews": "4.12 (78 reviews)",
            "contentTitle": "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
            "contentDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus semper elit platea; Velit aptent euismod pede euismod facilisis? In ultrices venenatis mauris. Consequat gravida pretium ligula lectus; Lacus natoque elit elit: Imperdiet cursus fermentum suspendisse; Cum iaculis venenatis!",
            "icon": "checkmark-circle",
            "location": "Design street, New York, USA",
            "time": "8:00 to 16:00 working days",
            "phone": "33 222 11",
            "webSite": "www.csform.com",
            "email": "dev@csform.com",
            "iconsStars": [
                {
                    "iconActive": "icon-star",
                    "iconInactive": "icon-star-outline",
                    "isActive": true
                },
                {
                    "iconActive": "icon-star",
                    "iconInactive": "icon-star-outline",
                    "isActive": true
                },
                {
                    "iconActive": "icon-star",
                    "iconInactive": "icon-star-outline",
                    "isActive": true
                },
                {
                    "iconActive": "icon-star",
                    "iconInactive": "icon-star-outline",
                    "isActive": true
                },
                {
                    "iconActive": "icon-star",
                    "iconInactive": "icon-star-outline",
                    "isActive": false
                }
            ],
            "map": {
                "lat": 40.712562,
                "lng": -74.005911,
                "zoom": 15,
                "mapTypeControl": true,
                "streetViewControl": true
            }
        };
    };

    //GMAPS + About Us data
    getDataForLayout2 = (): any => {
        return {
            "headerTitle": "GMAPS + About Us",
            "title": "Creative Studio Form",
            "titleDescription": "Design & Development agency",
            "contentTitle": "About us",
            "contentDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus semper elit platea; Velit aptent euismod pede euismod facilisis? In ultrices venenatis mauris. Consequat gravida pretium ligula lectus; Lacus natoque elit elit: Imperdiet cursus fermentum suspendisse; Cum iaculis venenatis!",
            "icon": "checkmark-circle",
            "location": "Design street, New York, USA",
            "time": "8:00 to 16:00 working days",
            "phone": "33 222 11",
            "webSite": "www.csform.com",
            "email": "dev@csform.com",
            "titleMap": "Here we are :",
            "map": {
                "lat": 40.712562,
                "lng": -74.005911,
                "zoom": 15,
                "mapTypeControl": true,
                "streetViewControl": true
            }
        };
    };

    //Full Screen View data
    getDataForLayout3 = (): any => {
        return {
            "title": "Your location",
            "headerTitle": "Full Screen View",
            "map": {
                "lat": 40.712562,
                "lng": -74.005911,
                "zoom": 15,
                "mapTypeControl": true,
                "streetViewControl": true
            }
        };
    };


    getEventsForTheme = (menuItem: any): any => {
      var that = this;
        return {
            'onRates': function (index: number) {
                  that.toastCtrl.presentToast("Rates " + (index + 1));
            }
        };
    };

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: [],
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    };

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                // this.af
                //     .object('maps/' + item.theme)
                //     .valueChanges()
                //     .subscribe(snapshot => {
                //         that.loadingService.hide();
                //         observer.next(snapshot);
                //         observer.complete();
                //     }, err => {
                //         that.loadingService.hide();
                //         observer.error([]);
                //         observer.complete();
                //     });
            });
        } else {
            return new Observable(observer => {
                that.loadingService.hide();
                observer.next(this.getDataForTheme(item));
                observer.complete();
            });
        }
    }
}
