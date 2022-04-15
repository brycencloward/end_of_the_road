import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private loginAuth: AuthGuard) { }

  ngOnInit() {
    this.loginAuth.canLoad();
  }

}
