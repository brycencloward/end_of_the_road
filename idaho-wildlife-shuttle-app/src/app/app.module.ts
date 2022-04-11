import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { PayPal } from '@ionic-native/paypal/ngx';
import { AuthService } from './services/auth/auth.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { Capacitor } from '@capacitor/core';
import { provideFirestore, getFirestore, enableIndexedDbPersistence } from '@angular/fire/firestore'
import { provideAuth, getAuth, initializeAuth, indexedDBLocalPersistence } from '@angular/fire/auth'

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ...AppStoreModule,
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebaseConfig);

      if(Capacitor.isNativePlatform) {
        initializeAuth(app, {
          persistence: indexedDBLocalPersistence
        });
      }

      return app;
    }),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore);

      return firestore;
    }),
    StoreDevtoolsModule.instrument ({ maxAge: 25 }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [PayPal,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
