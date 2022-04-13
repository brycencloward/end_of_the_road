import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { logout } from 'src/store/login/login.actions';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore'

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

    const userRef = this.firestore.collection('users').doc(this.userEmail);
    console.log(this.userEmail);

    userRef.get().toPromise().then((doc) => {
      if(doc.exists) {
        console.log("Document data: ", doc.data());
        
        this.userName = doc.get('name');
        console.log(this.userName);
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error retrieveing document: ", error);
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

  logout() {
    this.store.dispatch(logout());

    this.router.navigate(['login']);

    // .catch((e) => console.log(e.message));
  }
}
