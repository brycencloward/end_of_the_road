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

  ngOnInit() {
    this.loginAuth.canLoad();

    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        if(user.displayName) {
          console.log(user.displayName);
          this.userName = user.displayName;
        } else {
          console.log(user.email);
          this.userName = user.email;
        }
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
}
