import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ScrollingModule, ScrollDispatchModule  } from '@angular/cdk/scrolling';

import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppState } from './store/app.state';
import { RouterState } from './store/router.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule } from '@angular/forms';
import { AngularFirestore,  FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { VerifyEmailComponent } from './login/components/verify-email/verify-email.component';


@NgModule({
  declarations: [AppComponent, VerifyEmailComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([
      RouterState,
      AppState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ScrollingModule,
    ScrollDispatchModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    AngularFireAuth,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
