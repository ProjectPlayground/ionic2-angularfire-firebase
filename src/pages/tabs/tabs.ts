import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MenuPage } from '../menu/menu';
import { OrderPage } from '../order/order';
import { BillPage } from '../bill/bill';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = MenuPage;
  tab5Root: any = OrderPage;
  tab6Root: any = BillPage;

}
