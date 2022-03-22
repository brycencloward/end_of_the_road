import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  reservations() {
    this.router.navigate(['reservations']);
  }

  shuttle_reservation() {
    this.router.navigate(['shuttle-reservation']);
  }

  logout(){
    this.auth
    .signOut()
    .then(() => this.router.navigate(['login']))
    .catch((e) => console.log(e.message));
  }

}
