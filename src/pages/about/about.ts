import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.doActionByAction();
    Promise.all([
      this.doAction1(),
      this.doAction2(),
      this.doAction3(),
      this.doAction4()
    ])
    .then(()=> console.log('all action run at same time'))
    .catch((err)=> console.log('err: ', err))
  }

  doActionByAction(){
    this.doAction1()
    .then(()=>{
      console.log('Action1 done');
      return this.doAction2();
    })
    .then(()=>{
      console.log('Action2 done');
      return this.doAction3();
    })
    .then(()=>{
      console.log('Action3 done');
      return this.doAction4();
    })
    .then(()=> console.log('All done'))
    .catch((err)=> console.log(' err occured: ', err))
  }

  doAction1(){
    console.log('do st with Action1');
    return new Promise((resolve, reject)=>{
      resolve();
      reject();
    })
  }

  doAction2(){
    console.log('do st with Action2');
    return new Promise((resolve, reject)=>{
      resolve();
      reject();
    })
  }

  doAction3(){
    console.log('do st with Action3');
    return new Promise((resolve, reject)=>{
      resolve();
      reject();
    })
  }

  doAction4(){
    console.log('do st with Action4');
    return new Promise((resolve, reject)=>{
      resolve();
      reject();
    })
  }
}
