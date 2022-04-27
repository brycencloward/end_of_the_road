import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

  userName: string = HomePage.username;
  userEmail: string = HomePage.useremail;

  /* reservation_names = {};
  reservation_dates = {};
  reservation_descriptions = {};
  reservation_prices = {};
  payment_statuses = {}; */

  public form: any = [];

  ngOnInit() {
    this.loginAuth.canLoad();

    const currentDate = new Date();
    console.log(currentDate.toDateString());

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
            this.populateReservations(tempDoc[i].id, tempDoc[i].date, tempDoc[i].description, tempDoc[i].price, tempDoc[i].isPayed);
          }

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

  populateReservations(reservation_name: string, reservation_date: string, reservation_description: string, reservation_price: string, payment_status: string) {
    /* this.reservation_names += reservation_name;
    this.reservation_dates += reservation_date;
    this.reservation_descriptions += reservation_description;
    this.reservation_prices += reservation_price;
    this.payment_statuses += payment_status; */

    this.form += {  name: reservation_name, date: reservation_date,
                   description: reservation_description, price: reservation_price,
                   status: payment_status };

    console.log(this.form[0].name);
  }
}
