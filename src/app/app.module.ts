import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { authProviders } from './app.routes';
import { AuthService } from './shared/auth/auth.service';
import { SidenavService } from './shared/sidenav/sidenav.service';
import { LecturesService } from './shared/lectures/lectures.service';
import { MealsService } from './shared/meals/meals.service';
import { MonthlyCalendarComponent } from './shared/monthly-calendar/monthly-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DailyLecturesComponent } from './shared/daily-lectures/daily-lectures.component';
import { DailyLecturesListComponent } from './shared/daily-lectures-list/daily-lectures-list.component';
import { TokenInterceptorService } from './shared/token-interceptor/token-interceptor.service';

registerLocaleData(localeDe);

// Add an icon to the library for convenient access in other components
library.add(faCoffee, faAngleLeft, faAngleRight);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    CalendarComponent,
    MonthlyCalendarComponent,
    DailyLecturesComponent,
    DailyLecturesListComponent,
  ],
  entryComponents: [
    DailyLecturesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    SidenavService,
    LecturesService,
    MealsService,
    authProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
