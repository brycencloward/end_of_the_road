import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { AuthGuard } from '../guards/auth/auth-guard.service';

@Component({
  selector: 'app-paypal',
  templateUrl: 'paypal-mobile.page.html',
  styleUrls: ['paypal-mobile.page.scss'],
})
export class PaypalPage {
  constructor(private payPal: PayPal, private loginAuth: AuthGuard) { }

  ngOnInit() {
    this.loginAuth.canLoad();
  }

  paymentAmount: string = PaypalPage.cost;
  itemName: string = PaypalPage.item;

  currency: string = 'USD';
  currencyIcon: string = 'USD';

  static cost: string;
  static item: string;

  payWithPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AUkhgkkc2CU6HUai7lg1_YauhaMiWTnlgaVv8K3u-RIU1ehAQn61rCYKzei-X5ittQx51Axjk0Xm2nmm'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
