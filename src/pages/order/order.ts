import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Order page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  orderedList = [];
  hasNEW: boolean;
  hasSent: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modCtrl: ModalController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public _storage: Storage,
    public _af: AngularFire) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewDidEnter() {
    this.getAndStorageHasNEWValue()
      .then(() => {
        console.log(this.hasNEW);
        console.log('hasNEW just got and stored');
        return this.removeHasNEWFromLocalStorage();
      })
      .then(() => {
        console.log('hasNEW just removed');
        return this.loadLocalStorage();
      })
      .then(() => {
        console.log('orderedList just updated');
        return this.addHasNEWToLocalStorage(this.hasNEW);
      }).then(() => {
        console.log('hasNEW just inserted back to localStorage');
        console.log('All DONE!');
      })



    // // console.log('ionViewDidEnter come active');
    // this.doLoadLocalStorage();
    // // console.log(this.hasNEW);
    // // this.setLocalStorage('hasNEW', this.hasNEW);
    // this.getAllStorage();
    // this.getLocalStorage('hasNEW');
    // // this.setLocalStorage('hasNEW', false);

    // //1. Load the localStorage
    // this.loadLocalStorage();
    // //2. get and store hasNEW value, 
    // //3. remove hasNew, 
    // //4. update orderList 
    // //5. add hasNew back
    // //

  }

  getAndStorageHasNEWValue() {
    return this._storage.get('hasNEW').then(val => {
      this.hasNEW = val;
      console.log(this.hasNEW);
    })
  }

  removeHasNEWFromLocalStorage() {
    return this._storage.remove('hasNEW')
  }

  addHasNEWToLocalStorage(val) {
    return this._storage.set('hasNEW', val);
  }

  loadLocalStorage() {
    this.orderedList = [];
    return this._storage.forEach((val, keyId, num) => {
      console.log(num, keyId, val);
      let menu = firebase.database().ref('menus/' + keyId);
      menu.on('value', menu => {
        let item = {
          key: keyId,
          menu: menu.val(),
          orderedAmount: val,
          status: 'order accepted',
          color: 'danger'
        }
        this.orderedList.push(item);
      })
    });
  }


  getAllStorage() {
    this._storage.ready().then(() => {
      console.log('==== getAllStorage====')
      this._storage.forEach((val, key, num) => {
        console.log(num, key, val);
      })
    })
  }

  getLocalStorage(key): any {
    this._storage.ready().then(() => {
      let result = this._storage.get(key).then(result => {
        console.log(result);
        this.hasNEW = result;
      })
    })
  }

  alertOrderSent() {
    let alert = this.alertCtrl.create({
      title: 'CONFIRMATION',
      subTitle: 'Your order was sent to our staffs. Thanks!',
      buttons: ['OK']
    });
    alert.present();
    this.hasSent = true;
    this.setLocalStorage('hasNEW', false);
  }

  setLocalStorage(key, value) {
    this._storage.ready().then(() => {
      this._storage.set(key, value);
      console.log(key, ' --> ', value);
    })
  }

  doLoadLocalStorage() {
    this.orderedList = [];
    this._storage.ready().then(() => {

      this._storage.get('hasNEW').then(val => {
        this.hasNEW = val;
        console.log(this.hasNEW);
        if (this.hasNEW) { console.log('hasNEW is true') } else { console.log('hasNEW is not boolean', typeof (this.hasNEW)) };
      })



      this._storage.forEach((val, key, num) => {
        console.log(num, key, val);
      });

      this._storage.remove('hasNEW');

      this._storage.forEach((val, keyId, num) => {
        console.log(num, keyId, val);
        // WITHOUT hasNEW
        let menu = firebase.database().ref('menus/' + keyId);
        menu.on('value', menu => {
          console.log(menu.val());
          let item = {
            key: keyId,
            menu: menu.val(),
            orderedAmount: val,
            status: 'order accepted',
            color: 'danger'
          }
          this.orderedList.push(item);
        })
      });


    })
  }



  decreaseOne(amount, i) {
    let mount = amount - 1;
    this.orderedList[i].orderedAmount = mount;
    this.syncLocalStorage(this.orderedList[i].key, mount);
  }
  increaseOne(amount, i) {
    let mount = amount + 1;
    this.orderedList[i].orderedAmount = mount;
    this.syncLocalStorage(this.orderedList[i].key, mount);
  }

  syncLocalStorage(key, val) {
    this._storage.ready().then(() => {
      this._storage.set(key, val);
    })
  }

}

// @Component({
//   selector: 'modal',
//   // templateUrl: 'profileModal.html'
//   template: `
//     <ion-content padding>
//         <ion-card>

//             <ion-item>
//                 <ion-label>Select your table</ion-label>
//                 <ion-select [(ngModel)]="gender">
//                     <ion-option value="0" selected="true"></ion-option>
//                     <ion-option value="TB1">Table 1</ion-option>
//                     <ion-option value="TB2">Table 2</ion-option>
//                     <ion-option value="TB3">Table 3</ion-option>
//                     <ion-option value="TB4">Table 4</ion-option>
//                     <ion-option value="TB5">Table 5</ion-option>
//                     <ion-option value="TB6">Table 6</ion-option>
//                     <ion-option value="TB7">Table 7</ion-option>
//                     <ion-option value="TB8">Table 8</ion-option>
//                     <ion-option value="TB9">Table 9</ion-option>
//                     <ion-option value="TB10">Table 10</ion-option>
//                 </ion-select>
//             </ion-item>
//             <br>
//             <button ion-button color="danger" (click)="dismiss()">OK</button>
//         </ion-card>
//     </ion-content>

//   `
// })
// export class Profile {
//   constructor(params: NavParams, public viewCtrl: ViewController) {
//    console.log('UserId', params.get('userId'));
//  }

//  dismiss(){
//    this.viewCtrl.dismiss()
//  }


// }

