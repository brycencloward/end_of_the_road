import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPalWebPageModule } from '../pay-pal-web/pay-pal-web.module';
import { PayPalWebPage } from '../pay-pal-web/pay-pal-web.page';
import { AppState } from 'src/store/AppState';

@Component({
  selector: 'app-shuttle-reservation',
  templateUrl: './shuttle-reservation.page.html',
  styleUrls: ['./shuttle-reservation.page.scss'],
})

export class ShuttleReservationPage implements OnInit {

  constructor(private router: Router) { }

  public form = [
      { package: 'A', description: 'White Cloud Wilderness out of Salmon River -- 0.5-day shuttle -- Drop-off and pickup', 
      price: '250.00', isChecked: false },
      { package: 'B', description: 'Sawtooth National Forest through Frank Church Wilderness -- 1.5-day tour -- Drop-off and pickup shuttle', 
      price: '500.00', isChecked: false },
      { package: 'C', description: 'Snake River to Bear Creek -- 3-day backpacking trip -- Point-to-point shuttle', 
      price: '1000.00', isChecked: false }
    ];  

  isClicked: false;
  
  cost: string = "250.00";

  ngOnInit() {
  }

  create_reservation() {
    this.router.navigate(['home']);
  }

  change(cost) {
    this.cost = "500.00"
  }

  pay_now(){
    PayPalWebPage.cost = this.cost;

    this.router.navigate(['pay-pal-web']);
  }
  
}
