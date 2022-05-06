import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HomePage } from 'src/app/pages/home/home.page';
import { AppState } from 'src/store/AppState';
import { logout } from 'src/store/login/login.actions';
import { MainFooterComponent } from '../main-footer/main-footer.component';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {}

  logout() {
    HomePage.guest = "true";
    MainFooterComponent.guest = "true";

    console.log(HomePage.guest);
    console.log(MainFooterComponent.guest);
    
    this.store.dispatch(logout());

    this.router.navigate(['login']);

    // .catch((e) => console.log(e.message));
  }

}
