import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private router: Router, private auth: AngularFireAuth,
    private store: Store<AppState>, private loginAuth: AuthGuard,
    private firestore: AngularFirestore) { }

  static username: string;
  static useremail: string;
  static guest: string = "true"

  userName: string = HomePage.username;
  userEmail: string = HomePage.useremail;

  guestStatus: string = HomePage.guest;

  currentDate: string = String(new Date());

  public form: Array<{}> = [];

  ngOnInit() {
    this.loginAuth.canLoad();

    console.log(this.guestStatus);
    
    const currentDate = new Date();
    // console.log(currentDate.toDateString());

    if(this.guestStatus == "false") {
      const auth = getAuth();
    
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.userEmail = user.email;

          if(user.displayName) {
            console.log(user.displayName);
            this.userName = user.displayName;
          } else {
            console.log(user.email);
            this.userName = user.email;
          }

          const resRef = this.firestore.collection('users').doc(user.email).collection('reservations');

          resRef.get().toPromise().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
              return { id: doc.id, date: doc.get('date'), price: doc.get('price'), description: doc.get('description'), isPayed: doc.get('isPayed'), ...doc.data() }
            });

            for(let i = 0; i < tempDoc.length; i++) {
              this.populateReservationForm(tempDoc[i].id, tempDoc[i].date, tempDoc[i].description, tempDoc[i].price, tempDoc[i].isPayed);
            }

            /* for(let entry of this.form) {
              console.log(entry);
            } */

            console.log(this.form);

            /* console.log(this.reservation_names);
            console.log(this.reservation_dates);
            console.log(this.reservation_descriptions);
            console.log(this.reservation_prices);
            console.log(this.payment_statuses); */

            /* console.log(this.form);
            console.log(this.form.length);
            console.log(this.form.name); */
          });
        } else {
          console.log("No user is currently signed in.");
        }
      });
    }
  }

  ngOnDestroy() {
  }

  reservations() {
    this.router.navigate(['reservations']);
  }

  shuttle_reservation() {
    this.router.navigate(['shuttle-reservation']);
  }

  account() {
    this.router.navigate(['account']);
  }

  populateReservationForm(reservation_name: string, reservation_date: string, reservation_description: string, reservation_price: string, payment_status: string) {
    /* this.reservation_names += reservation_name;
    this.reservation_dates += reservation_date;
    this.reservation_descriptions += reservation_description;
    this.reservation_prices += reservation_price;
    this.payment_statuses += payment_status; */
    var date_status: string = "finished";

    // This small algorithm checks if the date stored in the reservation
    // takes place after the current date, and if so, sets the date_status
    // property to "upcoming," indicating that the reservation has not taken place, yet.
    var currentDate = (moment(new Date())).format('DD-MMM-YYYY HH:mm:ss');
    if(moment(reservation_date).isAfter(currentDate)) {
      date_status = "upcoming";
    }

    var reservation_object = {  "name": reservation_name, "date": reservation_date, 
                                "date_status": date_status, "description": reservation_description, 
                                "price": reservation_price, "payment_status": payment_status  };

    // This initialization sets the data stored at the position after last in
    // the array of objects to the newly initialized temporary object "reservation_object."
    this.form[this.form.length] = reservation_object;
  }
}
