import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-pal-web',
  templateUrl: './pay-pal-web.page.html',
  styleUrls: ['./pay-pal-web.page.scss'],
})

export class PayPalWebPage {
  paymentAmount: string = PayPalWebPage.cost;
  itemName: string = PayPalWebPage.item;

  currency: string = 'USD';
  currencyIcon: string = 'USD';

  static cost: string;
  static item: string;

  constructor(private router: Router, private loginAuth: AuthGuard) {
    let _this = this;

    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              // Show a success message to the buyer
              alert('Payment Successfull ' + details.payer.name.given_name + '!');
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }

  toHome(){
    this.router.navigate(['reservations']);
  }

  ngOnInit() {
    this.loginAuth.canLoad();
  }
}
