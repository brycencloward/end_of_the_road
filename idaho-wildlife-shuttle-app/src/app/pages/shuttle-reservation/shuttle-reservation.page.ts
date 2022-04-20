import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPalWebPage } from '../pay-pal-web/pay-pal-web.page';
import { ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
  name: string = "";

  //date picker
  dateValue = format(new Date(), 'MMM dd, yyyy, HH:mm');
  formattedString = this.dateValue;
  showpicker = false;

  dateChanged(value){
    this.dateValue =value;
    this.formattedString = format(parseISO(value),'MMM dd, yyyy, HH:mm');
  }

  ngOnInit() {
    this.loginAuth.canLoad();
  }

  create_reservation() {
    /*if(this.item != "No package selected."){
      this.router.navigate(['pay-pal-web']);
    }*/
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userEmail = user.email;
        console.log(userEmail);

        var reservation_name: string;
        var reservation_date: number;

        // TODO: Change data types from strings to default date datatype for comparisons.
        var currentDate = new Date();
        var leastDate;

        const userRef = this.firestore.collection('users').doc(userEmail);
        console.log(userRef);

        const resRef = this.firestore.collection('users').doc(userEmail).collection('reservations');
        // const dateQuery = resRef.where('date', '<=', currentDate);

        resRef.get().toPromise().then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            console.log(doc.id);
            console.log(doc.get('date'));

            if(leastDate == "") {
              leastDate = doc.get('date');
            }

            if(leastDate > currentDate) {
              leastDate = currentDate;
              console.log("The new least date is: ", leastDate);
            }

            return { leastDate }
          });

          var temp;

          console.log(tempDoc);

          this.firestore.collection('users').doc(userEmail).collection('reservations').doc('reservation2').set({
            description: this.name, price: this.cost, date: new Date()
          });
        });

        // TODO: implement current saved reservation count checker and
        // use it to increment the names of the respective documents as
        // they're generated, accordingly.
        userRef.get().toPromise().then((doc) => {
          if(doc.exists) {
            console.log("Document data: ", doc.data());
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error retrieveing document: ", error);
        });
      } else {
        console.log("User is signed out.");
      }
    });    
  }

  changeCurrentPackage(event) {
    var reservation: string = event.detail.value;

    var re = /_.*/g;
    var details;

    details = reservation.replace(re, "");
    this.name = details;
    console.log(this.name);

    re = /.*_/g;

    details = reservation.replace(re, "");
    this.cost = details;
    console.log(this.cost);
    // console.log("cost changed to", this.cost);
  }

  pay_now(){
    if(this.name != "No package selected."){
      PayPalWebPage.cost = this.cost;
      PayPalWebPage.item = this.name;

      this.router.navigate(['pay-pal-web']);
    }
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
