import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.debugElement.nativeElement;
  }));

  it('should create a form on initialization', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  });

  it('should redirect to the home page after clicking "login"', () => {
    spyOn(router, 'navigate');

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should redirect to the registration page after clicking "register"', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover the email or password', () => {
    fixture.detectChanges();

    component.form.get('email').setValue("valid@email.com");

    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  });

  it('should be loading while recovering password', () => {
    fixture.detectChanges();

    store.dispatch(recoverPassword());

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  });

  it('should hide loading when password has successfully been recovered', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    
    store.dispatch(recoverPassword());

    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error message when recovery error', () => {
    spyOn(toastController, 'create');
    
    fixture.detectChanges();

    store.dispatch(recoverPassword());

    store.dispatch(recoverPasswordFail({error: "message"}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });
});
