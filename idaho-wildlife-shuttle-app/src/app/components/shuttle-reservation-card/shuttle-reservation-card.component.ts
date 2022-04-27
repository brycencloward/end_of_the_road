import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPalWebPage } from 'src/app/pages/pay-pal-web/pay-pal-web.page';

@Component({
  selector: 'app-shuttle-reservation-card',
  templateUrl: './shuttle-reservation-card.component.html',
  styleUrls: ['./shuttle-reservation-card.component.scss'],
})
export class ShuttleReservationCardComponent implements OnInit {
  @Input() hasHeader: boolean;
  @Input() hasFooter: boolean;

  @Input() id: string;
  @Input() status: string;
  @Input() startAt: string;
  @Input() reservedAt: string;
  @Input() notes: string;
  @Input() payment: string;
  @Input() isPayed: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  payNow() {
    var cost: string = this.payment;
    var name: string = this.notes;
    var id: string   = this.id;

    console.log(cost, name, id);

    PayPalWebPage.cost = cost;
    PayPalWebPage.item = name;
    PayPalWebPage.id   = id;

    this.router.navigate(['pay-pal-web']);
  }
}
