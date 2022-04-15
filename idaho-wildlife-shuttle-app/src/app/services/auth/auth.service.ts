import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { Router } from '@angular/router'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  // TODO: figure out and address the bug being caused by the observer
  register(userRegister: UserRegister) : Observable<void> {
    return new Observable<void>(observer => {
      this.auth.createUserWithEmailAndPassword(userRegister.email, userRegister.password).then((result) => {
        result.user.sendEmailVerification();
      });

      observer.next();

      this.firestore.collection('users').doc(userRegister.email).set({
        name: userRegister.name, email: userRegister.email, phone: userRegister.phone,
        address: userRegister.address
      });

      this.firestore.collection('users').doc(userRegister.email).collection('reservations').doc('reservation1').set({
      });
    });
  }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.next(error);
        observer.complete();
      })
    })
  }

  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
        this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUser: firebase.default.auth.UserCredential) => {
          observer.next();
          observer.complete();
        }).catch(error => {
          observer.error(error);
          observer.complete();
        })
      })
    })
  }
}
