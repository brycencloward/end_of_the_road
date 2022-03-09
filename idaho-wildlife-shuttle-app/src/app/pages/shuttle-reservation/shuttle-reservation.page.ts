import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPalWebPageModule } from '../pay-pal-web/pay-pal-web.module';
import { PayPalWebPage } from '../pay-pal-web/pay-pal-web.page';
import { AppState } from 'src/store/AppState';
import { ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-shuttle-reservation',
  templateUrl: './shuttle-reservation.page.html',
  styleUrls: ['./shuttle-reservation.page.scss'],
})


export class ShuttleReservationPage implements OnInit {

  constructor(private router: Router) { }

  public form = [
      { package: 'A', description: 'White Cloud Wilderness out of Salmon River -- 0.5-day shuttle -- Drop-off and pickup', 
      price: '250.00' },
      { package: 'B', description: 'Sawtooth National Forest through Frank Church Wilderness -- 1.5-day tour -- Drop-off and pickup shuttle', 
      price: '500.00' },
      { package: 'C', description: 'Snake River to Bear Creek -- 3-day backpacking trip -- Point-to-point shuttle', 
      price: '1000.00' }
    ];  

  isClicked: false;
  
  cost: string = "0.00";

  item: string = "No package selected."

  ngOnInit() {
  }

  create_reservation() {
    this.router.navigate(['home']);
  }

  changeCost(event) {
    this.cost = event.detail.value;
    this.item = event.detail.name;
    console.log(this.item);
    //console.log("cost changed to", this.cost);
  }

  pay_now(){
    PayPalWebPage.cost = this.cost;
    PayPalWebPage.item = this.item;

    this.router.navigate(['pay-pal-web']);
  }
  
}

export class dateAndTime {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';
  dateValue2 = '';

  constructor() {}
  
  confirm() {
    this.datetime.confirm();
  }
  
  reset() {
    this.datetime.reset();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
}
