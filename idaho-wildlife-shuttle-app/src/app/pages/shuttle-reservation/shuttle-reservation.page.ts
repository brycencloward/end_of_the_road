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
      { package: 'A', description: 'Any eastside trail head shuttle, this includes Tin Cup, Redfish Lake, Iron Creek, ect. -- SNRA -- Pickup and Drop off', 
      price: '195.00' },
      { package: 'B', description: 'Sawtooth Lodge to/from any eastside trailhead -- Drop-off and pickup shuttle price for 3 people', 
      price: '245.00' },
      { package: 'C', description: 'Boundry Creek to/from Stanley -- Drop-off and pickup shuttle price for 3 people', 
      price: '345.00' },
      { package: 'D', description: 'Sun Valley (SUN) airport to/from Stanley  Drop off and pickup shuttle price for 3 people', 
      price: '355.00'},
      { package: 'E', despriction: 'Custom shuttle deposit to be book time and date over the phone', 
      price: '80.00'}
    ];  

  isClicked: false;
  
  cost: string = "250.00";

  ngOnInit() {
  }

  create_reservation() {
    this.router.navigate(['home']);
  }

  changeCost(event) {
    this.cost = event.detail.value;
    //console.log("cost changed to", this.cost);
  }

  pay_now(){
    PayPalWebPage.cost = this.cost;

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
