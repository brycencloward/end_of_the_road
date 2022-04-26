import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';
import { getAuth, updateEmail, updatePassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { FormBuilder } from '@angular/forms';
import { AccountPageForm } from './form/account.page.form';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  accountForm: AccountPageForm;

  constructor(private loginAuth: AuthGuard, private formBuilder: FormBuilder,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.loginAuth.canLoad();

    this.createForm();
  }

  private createForm() {
    this.accountForm = new AccountPageForm(this.formBuilder);
  }

  update() {
    const auth = getAuth();

    if(this.accountForm.getForm().valid) {
      if(this.accountForm.getForm().value.name) {
        updateProfile(auth.currentUser, {
          displayName: this.accountForm.getForm().value.name, photoURL: ""
        }).then(() => {
          // Profile updated!
          this.firestore.collection('users').doc(auth.currentUser.email).update({
            name: this.accountForm.getForm().value.name
          });
          console.log("Display name successfully updated.");
          // ...
        }).catch((error) => {
          // An error occurred
          console.log(error);
          // ...
        });
      }

      if(this.accountForm.getForm().value.email) {
        updateEmail(auth.currentUser, this.accountForm.getForm().value.email).then(() => {
          // Email updated!
          console.log("Email address successfully updated.");
          // ...
        }).catch((error) => {
          // An error occurred
          console.log(error);
          // ...
        });
      }

      if(this.accountForm.getForm().value.password) {
        updatePassword(auth.currentUser, this.accountForm.getForm().value.password).then(() => {
          // Update successful.
          console.log("Password successfully updated.");
        }).catch((error) => {
          // An error ocurred
          console.log(error);
          // ...
        });
      }

      if(this.accountForm.getForm().value.phone) {
        this.firestore.collection('users').doc(auth.currentUser.email).update({
          phone: this.accountForm.getForm().value.phone
        });

        console.log("Phone number successfully updated.");
      }

      if(this.accountForm.getForm().get('address').value.street) {
        this.firestore.collection('users').doc(auth.currentUser.email).update({
          street: this.accountForm.getForm().get('address').value.street
        });

        console.log("Street address successfully updated.");
      }

      if(this.accountForm.getForm().get('address').value.city) {
        this.firestore.collection('users').doc(auth.currentUser.email).update({
          city: this.accountForm.getForm().get('address').value.city
        });

        console.log("City successfully updated.");
      }
      
      if(this.accountForm.getForm().get('address').value.state) {
        this.firestore.collection('users').doc(auth.currentUser.email).update({
          state: this.accountForm.getForm().get('address').value.state
        });

        console.log("State successfully updated.");
      }

      if(this.accountForm.getForm().get('address').value.zipCode) {
        this.firestore.collection('users').doc(auth.currentUser.email).update({
          street: this.accountForm.getForm().get('address').value.zipCode
        });

        console.log("Zip code successfully updated.")
      }
    }
  }
}
