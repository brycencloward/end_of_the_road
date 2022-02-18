import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { register, registerFail, registerSuccess } from 'src/store/register/register.actions';
import { registerReducer } from 'src/store/register/register.reducers';
import { RegisterPageModule } from './register.module';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule, // RouterTestingModule.withRoutes([{ path: "home", loadChildren: () => import('./../../pages/home/home.module').then( m => m.HomePageModule) }])
        ReactiveFormsModule,
        RegisterPageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("register", registerReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  });

  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();

    clickRegister();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeFalsy();
    })
  });

  it('given form is valid, when user clicks on register, then register', () => {
    fixture.detectChanges();

    populateForm();

    clickRegister();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
    })
  });

  it('given form is valid, when user clicks on register, then show loading', () => {
    fixture.detectChanges();

    populateForm();

    clickRegister();

    store.select("loading").subscribe(state => {
      expect(state.show).toBeTruthy();
    })
  });

  it('should hide loading component when registration successful', () => {
    fixture.detectChanges();
    
    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerSuccess());

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    })
  });

  it('should go to home page when registration successful', () => {
    fixture.detectChanges();

    spyOn(router, 'navigate');
    
    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerSuccess());

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should hide loading component when registration fail', () => {
    fixture.detectChanges();
    
    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerFail({error: {message: 'any message'}}));

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    })
  });

  it('should show error when registration fail', () => {
    fixture.detectChanges();

    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    
    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerFail({error: {message: 'any message'}}));

    expect(toastController.create).toHaveBeenCalled();
  });

  function clickRegister() {
    page.querySelector('ion-button').click();
  }

  function populateForm() {
    component.registerForm.getForm().get('name').setValue('anyName');
    component.registerForm.getForm().get('email').setValue('any@email.com');
    component.registerForm.getForm().get('password').setValue('anyPassword');
    component.registerForm.getForm().get('repeatPassword').setValue('anyPassword');
    component.registerForm.getForm().get('phone').setValue('anyPhone');
    component.registerForm.getForm().get('address').get('street').setValue('any street');
    component.registerForm.getForm().get('address').get('city').setValue('any city');
    component.registerForm.getForm().get('address').get('state').setValue('any state');
    component.registerForm.getForm().get('address').get('zipCode').setValue('any zip code');
    component.registerForm.getForm().get('address').get('number').setValue('any number');
  }
});
