import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shuttle-reservation-card',
  templateUrl: './shuttle-reservation-card.component.html',
  styleUrls: ['./shuttle-reservation-card.component.scss'],
})
export class ShuttleReservationCardComponent implements OnInit {

  @Input() hasHeader: boolean;
  @Input() hasFooter: boolean;

  @Input() status: string;
  @Input() startAt: string;
  @Input() reservedAt: string;
  @Input() notes: string;
  @Input() payment: string;

  constructor() { }

  ngOnInit() {}

}
