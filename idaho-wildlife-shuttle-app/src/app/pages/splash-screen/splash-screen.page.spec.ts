import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { SplashScreenPage } from './splash-screen.page';

describe('SplashScreenPage', () => {
  let component: SplashScreenPage;
  let fixture: ComponentFixture<SplashScreenPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashScreenPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreenPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should redirect to the login page after buffering', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.ngOnInit();

    tick(1500);

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
});
