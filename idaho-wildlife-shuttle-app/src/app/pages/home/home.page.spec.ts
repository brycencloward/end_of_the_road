import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should redirect to the reservations page after clicking "view all..."', () => {
    spyOn(router, 'navigate');

    component.reservations();

    expect(router.navigate).toHaveBeenCalledWith(['reservations']);
  });

  it('should redirect to the shuttle-reservation page after clicking "+"', () => {
    spyOn(router, 'navigate');

    component.shuttle_reservation();

    expect(router.navigate).toHaveBeenCalledWith(['shuttle-reservation']);
  });
});
