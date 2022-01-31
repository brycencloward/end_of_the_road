import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ShuttleReservationPage } from './shuttle-reservation.page';

describe('ShuttleReservationPage', () => {
  let component: ShuttleReservationPage;
  let fixture: ComponentFixture<ShuttleReservationPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleReservationPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShuttleReservationPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create a new reservation and redirect to the reservations page upon clicking "create a reservation"', () => {
    spyOn(router, 'navigate');

    component.create_reservation();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
