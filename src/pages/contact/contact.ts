import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  tempVal: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _storage: Storage
    ) {}

  ionViewDidLoad() {
    this._storage.ready().then(()=>{
      this.assignValue();
      this.getValue().then(()=>{
        console.log('tempVal in inViewDidLoad(): ', this.tempVal);
      })
      
    })
  }

  assignValue(){
    return this._storage.set('myKey', 'MYVALUE');
  }

  getValue(){
    
    return this._storage.get('myKey').then(val=>{
      this.tempVal = val;
      console.log('tempVal in getVal(): ', this.tempVal);
    })
  }

  

}
