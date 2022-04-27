import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, recoverPassword } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';
import { HomePage } from '../home/home.page';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private store: Store<AppState>, private toastController: ToastController,
    private navController: NavController) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);

      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggleLoading(loginState);
    })
  }

  ngOnDestroy() {
      if (this.loginStateSubscription) {
        this.loginStateSubscription.unsubscribe();
      }
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if (loginState.isLoggedIn) {
      this.navController.navigateRoot('home');
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: "bottom",
        duration: 3000,
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if (loginState.isRecoveredPassword) {;
      const toaster = await this.toastController.create({
        position: "bottom",
        duration: 3000,
        message: "Recovery email sent",
        color: "secondary"
      });
      toaster.present();
    }
  }

  forgotEmailOrPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email').value}));
  }

  login() {
    this.store.dispatch(login({email: this.form.get('email').value, password: this.form.get('password').value})); // dispatch the user-entered values to the NgRx side effect (function)

    var useremail: string = this.form.get('email').value; // set the temporary email to the email entered by the user
    HomePage.useremail = useremail; // pass the temporary email to the home page

    var re = /@.*/g; // re == regular expression; this is going to look for all instances of the '@' symbol, followed by 0 or more of any characters

    var username = useremail.replace(re, ""); // default case; replaces anything matching the above regular expression with NULL
    HomePage.username = username; // default case; sets the username displayed on the home page to the suffix of the same user's email address
  }

  register() {
    this.router.navigate(['register']);
  }

  debug() {
    this.router.navigate(['home']);
  }
}
