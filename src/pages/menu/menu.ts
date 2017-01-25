import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MenuAddPage } from '../menu-add/menu-add';

import { Storage } from '@ionic/storage';

/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  menuList: FirebaseListObservable<any>;
  menus = [];
  menusPlus = [];
  finalMenu = [];
  hasSent: boolean;
  hasNEW: boolean;;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _af: AngularFire,
    public menuCrtl: MenuController,
    public _storage: Storage) {
    this.menus = [];
    this.doClearLocalStorage();
    this.loadingMenuWithKey();
    menuCrtl.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewDidEnter() {
    this.getAndStorageHasNEWValue()
      .then(()=>{
        console.log(this.hasNEW);
        console.log('hasNEW just got and stored');
        return this.removeHasNEWFromLocalStorage();
      }).then(()=>{
        console.log('hasNEW just removed from LS');
        return this.updateMenuListWithCount();
      }).then(()=>{
        console.log('menuList just updated count');
        return this.addHasNEWToLocalStorage(this.hasNEW);
      }).then(()=>{
        console.log('added hasNEW back');
        console.log('ALl DONE');
      })
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

  updateMenuListWithCount() {
    return this._storage.forEach((val, keyId, num) => {
      console.log(num, keyId, val);
      let i = this.menus.map(menu => menu.key).indexOf(keyId);
      this.menus[i].count = val;
    });
  }

  addHasNEWToLocalStorage(val) {
    return this._storage.set('hasNEW', val);
  }

  loadingMenuWithKey() {
    this._af.database.list('/menus').subscribe(
      menus => {
        menus.forEach(menu => {
          // console.log(menu.$key);
          let menuItem = {
            menu: menu,
            key: menu.$key,
            count: 0,
            countPlus: 0
          };
          this.menus.push(menuItem);
        });
        console.log(this.menus);
      }
    )
  }

  addMenu() {
    this.navCtrl.push(MenuAddPage);
  }

  tapToIncrease(key, index) {
    console.log(key, ' clicked');
    this.increaseOne(key, index);
  }

  increaseOne(key, index) {
    let count = parseInt(this.menus[index].count);
    let newCount = count + 1;
    this.menus[index].count = newCount;
    console.log(this.menus[index].count);
    this.setLocalStorage(key, newCount);
    this.setLocalStorage('hasNEW', true)
    this.hasNEW = true;
    console.log('this.hasNEW just set to: ',this.hasNEW);
    this.getAllStorage();

  }

  doClearLocalStorage() {
    this._storage.clear();
  }
  
  setLocalStorage(key, value){
    this._storage.ready().then(()=>{
      this._storage.set(key, value);
    })
  }

  getAllStorage(){
    this._storage.ready().then(()=>{
      console.log('==== getAllStorage====')
      this._storage.forEach((val, key,num)=>{
        console.log(num, key, val);
      })
    })
  }
  getLocalStorage(key): any{
    this._storage.ready().then(()=>{
      let result = this._storage.get(key).then(result =>{
        console.log(result);
        return result;
      })
    })
  }

}
