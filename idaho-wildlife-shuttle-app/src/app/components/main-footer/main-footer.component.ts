import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  cancelation_policy(){
    this.router.navigate(['cancelpolicy']);
  }

}
