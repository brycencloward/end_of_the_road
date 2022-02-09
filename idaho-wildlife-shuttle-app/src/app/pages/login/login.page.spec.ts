import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/model/user/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
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
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
    authService = TestBed.get(AuthService);

    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.debugElement.nativeElement;
  }));

  it('should create a form on initialization', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  });

  it('should redirect to the registration page after clicking "register"', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover the email or password on forgot email or password', () => {
    spyOn(authService, 'recoverEmailPassword').and.returnValue(new Observable(() => { }));
    
    fixture.detectChanges();

    component.form.get('email').setValue("valid@email.com");

    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
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
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    
    fixture.detectChanges();

    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: "message"}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should show loading and start login when logging in', () => {
    spyOn(authService, 'login').and.returnValue(new Observable(() => { }));

    fixture.detectChanges();

    component.form.get('email').setValue('valid@email.com');
    component.form.get('password').setValue('anyPassword');

    page.querySelector('#loginButton').click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  });

  it('should hide loading and send user to home page when user has logged in', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));

    fixture.detectChanges();
    
    component.form.get('email').setValue('valid@email.com');
    component.form.get('password').setValue('anyPassword');
  
    page.querySelector('#loginButton').click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should hide loading and show error message when user failed to login', () => {
    spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    
    component.form.get('email').setValue('error@email.com');
    component.form.get('password').setValue('anyPassword');
  
    page.querySelector('#loginButton').click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });
});
