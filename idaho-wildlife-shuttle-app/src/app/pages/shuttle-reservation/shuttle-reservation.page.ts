import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shuttle-reservation',
  templateUrl: './shuttle-reservation.page.html',
  styleUrls: ['./shuttle-reservation.page.scss'],
})
export class ShuttleReservationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  create_reservation() {
    this.router.navigate(['home']);
  }

}
