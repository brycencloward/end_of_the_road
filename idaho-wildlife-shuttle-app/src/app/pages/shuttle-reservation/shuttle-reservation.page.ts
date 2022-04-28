import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPalWebPage } from '../pay-pal-web/pay-pal-web.page';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as moment from 'moment';

@Component({
  selector: 'app-shuttle-reservation',
  templateUrl: './shuttle-reservation.page.html',
  styleUrls: ['./shuttle-reservation.page.scss'],
})

// TODO: export date, time, location, accomodations, and/or package details to Firestore collections for the current user
export class ShuttleReservationPage implements OnInit {
  constructor(private router: Router, private loginAuth: AuthGuard,
              private firestore: AngularFirestore) { }

  public form = [
      { package: 'A', description: 'Any eastside trailhead shuttle; to include Tin Cup, Redfish Lake, Iron Creek, etc. -- Sawtooth National Recreation Area -- Pickup and drop off', 
      price: '195.00' },
      { package: 'B', description: 'Sawtooth Lodge to/from any eastside trailhead -- Drop-off and pickup shuttle price for 3 people', 
      price: '245.00' },
      { package: 'C', description: 'Boundry Creek to/from Stanley -- Drop-off and pickup shuttle price for 3 people', 
      price: '345.00' },
      { package: 'D', description: 'Sun Valley airport to/from Stanley -- Drop off and pickup shuttle price for 3 people', 
      price: '255.00'},
      { package: 'E', description: 'Boise airport to/from Stanley area -- Drop off and pickup shuttle price for up to 3 people', 
      price: '365.00'},
      { package: 'F', description: 'Custom shuttle deposit; to be arranged over the phone', 
      price: '80.00'}
    ];  

  isClicked: false;
  
  cost: string = "0.00";
  name: string = "No package selected.";
  id: string;

  // Date picker:
  dateValue = (moment(new Date())).format('DD-MMM-YYYY HH:mm:ss');
  formattedString = (moment(this.dateValue).format('DD-MMM-YYYY HH:mm'));
  showpicker = false;

  dateChanged(value){
    this.dateValue = (moment(value)).format('DD-MMM-YYYY HH:mm:ss');
    this.formattedString = (moment(value)).format('DD-MMM-YYYY HH:mm');
  }

  ngOnInit() {
    this.loginAuth.canLoad();
  }

  create_reservation() {
    // Optional functionality for redirecting users
    // to the payment page immediately upon creating
    // a shuttle reservation.
    /*if(this.item != "No package selected."){
      this.router.navigate(['pay-pal-web']);
    }*/
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userEmail = user.email;

        var reservation_name: string;
        var reservation_number: number = 0;

        const resRef = this.firestore.collection('users').doc(userEmail).collection('reservations');
        // Another potential avenue for querying dates/timestamps for comparison.
        // const dateQuery = resRef.where('date', '<=', currentDate);

        resRef.get().toPromise().then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, date: doc.get('date'), price: doc.get('price'), ...doc.data() }
          });

          // console.log(tempDoc);

          // The algorithm below is a solution to 
          // replacing the first placeholder reservation
          if(tempDoc[0].price == "N/A") {
            reservation_number = 0;
          } else { 
            for(let i = 0; i < tempDoc.length; i++) {
              if(Number(tempDoc[i].id) > reservation_number) {
                reservation_number = Number(tempDoc[i].id);
              }
            }
          }

          reservation_number++;
          // console.log("reservation_number: ", reservation_number);
          reservation_name = String(reservation_number);
          // console.log("reservation_name: ", reservation_name);

          this.firestore.collection('users').doc(userEmail).collection('reservations').doc(reservation_name).set({
            description: this.name, price: this.cost, date: this.dateValue, isPayed: false
          });
        });
      } else {
        console.log("No user currently signed in.");
      }
    });

    this.router.navigate(['home']);
  }

  changeCurrentPackage(event) {
    var reservation: string = event.detail.value;

    // Regular expression checking for anything
    // following an underscore:
    var re = /_.*/g;
    var details;

    details = reservation.replace(re, "");
    this.name = details;
    console.log(this.name);

    // Regular expression checking for anything
    // followed by an underscore:
    re = /.*_/g;

    details = reservation.replace(re, "");
    this.cost = details;
    console.log(this.cost);
  }

  pay_now(){
    if(this.name != "No package selected."){
      PayPalWebPage.cost = this.cost;
      PayPalWebPage.item = this.name;
      PayPalWebPage.id   = this.id;

      this.router.navigate(['pay-pal-web']);
    }
  }
}
