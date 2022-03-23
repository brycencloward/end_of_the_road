import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { logout } from 'src/store/login/login.actions';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private auth: AngularFireAuth,
    private store: Store<AppState>, private loginAuth: AuthGuard) { }

  ngOnInit() {
    this.loginAuth.canLoad();
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
