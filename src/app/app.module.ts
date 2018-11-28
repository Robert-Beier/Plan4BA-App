import { NgModule } from '@angular/core';
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
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    AuthService,
    SidenavService,
    LecturesService,
    MealsService,
    authProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
