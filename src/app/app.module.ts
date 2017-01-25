import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { MenuAddPage } from '../pages/menu-add/menu-add';
import { OrderPage } from '../pages/order/order';
import { BillPage } from '../pages/bill/bill';
import { MapsPage } from '../pages/maps/maps';

const firebaseConfig = {
  apiKey: "AIzaSyC4NxrYYEzopXAcKvDQFE0vqlIY17w2YMg",
  authDomain: "menugo-9df18.firebaseapp.com",
  databaseURL: "https://menugo-9df18.firebaseio.com",
  storageBucket: "menugo-9df18.appspot.com"
}

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AboutPage,
    ContactPage,
    HomePage,
    MenuPage,
    OrderPage,
    BillPage,
    MapsPage,
    MenuAddPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AboutPage,
    ContactPage,
    HomePage,
    MenuPage,
    OrderPage,
    BillPage,
    MapsPage,
    MenuAddPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage
  ]
})
export class AppModule { }
