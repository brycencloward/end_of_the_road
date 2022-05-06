import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {

  constructor(private router: Router) { }

  static guest: string = "true";
  guestStatus: string = MainFooterComponent.guest;

  ngOnInit() {}

  cancelation_policy() {
    this.router.navigate(['cancelpolicy']);
  }

  signIn() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
