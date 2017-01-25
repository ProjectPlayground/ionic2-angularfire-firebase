import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-menu-add',
  templateUrl: 'menu-add.html'
})
export class MenuAddPage {

  menuList: FirebaseListObservable<any>;
  menu = {
    id: '',
    name: '',
    name_en: '',
    price: '',
    size: '',
    photo_url: ''
  };
  constructor(public navCtrl: NavController, public _af: AngularFire, public params: NavParams) {
    this.menuList = _af.database.list('/menus');
    this.menu.id = this.params.get('key');
    this.menu.name = this.params.get('name');
    this.menu.name_en = this.params.get('name_en');
    this.menu.price = this.params.get('price');
    this.menu.size = this.params.get('size');
    this.menu.photo_url = this.params.get('photo_url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAddPage');
  }

  addMenu(id, name, name_en, price, size, photo_url) {
    if (id) {
      this.menuList.update(id, {
        name: name,
        name_en: name_en,
        price: price,
        size: size,
        photo_url: photo_url
      }).then(newMenu => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    } else {
      this.menuList.push({
        name: name,
        name_en: name_en,
        price: price,
        size: size,
        photo_url: photo_url
      }).then(newMenu => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }

}