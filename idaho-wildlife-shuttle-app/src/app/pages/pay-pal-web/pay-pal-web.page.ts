import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
            .then(function(details) {
              // Show a success message to the buyer
              alert('Payment Successful ' + details.payer.name.given_name + '!');

              const auth = getAuth();
    
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const userEmail = user.email;

                  var reservation_number: string = "0";

                  const resRef = this.firestore.collection('users').doc(userEmail).collection('reservations');
                  // Another potential avenue for querying dates/timestamps for comparison.
                  // const dateQuery = resRef.where('date', '<=', currentDate);

                  resRef.get().toPromise().then((querySnapshot) => {
                    const tempDoc = querySnapshot.docs.map((doc) => {
                      return { id: doc.id, date: doc.get('date'), price: doc.get('price'), isPayed: doc.get('isPayed'), ...doc.data() }
                    });

                    // TODO: find a way to pass the id of the reservation that has been
                    // payed for and store it in a local variable, then loop through the
                    // reservations collection and ascertain the details of the matching
                    // reservation, then update the 'isPayed' boolean to true upon successful
                    // payment.
                    for(let i = 0; i < tempDoc.length; i++) {
                      if(tempDoc[i].id == this.id) {
                        this.firestore.collection('users').doc(userEmail).collection('reservations').doc(reservation_number).update({
                          isPayed: true
                        });
                      }
                    }
                  });
                }
              });
            }).catch(err => {
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
