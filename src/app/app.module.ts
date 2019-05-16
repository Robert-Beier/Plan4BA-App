import { NgModule, LOCALE_ID, Injectable, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as Sentry from '@sentry/browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { authProviders } from './app.routes';
import { AuthService } from './shared/auth/auth.service';
import { LecturesService } from './shared/data/lectures/lectures.service';
import { MealsService } from './shared/data/meals/meals.service';
import { TokenInterceptorService } from './shared/auth/token-interceptor.service';
import { StoreCredentialsInfoDialogComponent } from './shared/dialogs/store-credentials-info/store-credentials-info-dialog.component';
import { PrivacyPolicyDialogComponent } from './shared/dialogs/privacy-policy/privacy-policy-dialog.component';
import { MaterialModule } from './material-module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { UserService } from './shared/data/user/user.service';
import { LecturesPollingService } from './shared/data/lectures/lectures-polling.service';
import { InfoTextsService } from './shared/data/info-texts/info-texts.service';
import { UserCredentialsDialogComponent } from './shared/dialogs/user-credentials/user-credentials-dialog.component';
import { LinksService } from './shared/data/links/link.service';
import { NotificationsService } from './shared/data/notifications/notifications.service';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeDe);
registerLocaleData(localeEn);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

if (environment.production) {
  Sentry.init({
    dsn:
      'https://a16c84b452b04e7298dacf3e9ef127f0@sentry.plan4ba.ba-leipzig.de//2',
    environment: environment.production ? 'prod' : 'dev',
    release: 'plan4ba@0.3.0'
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    // Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    LoginComponent,
    StoreCredentialsInfoDialogComponent,
    PrivacyPolicyDialogComponent,
    SpinnerComponent,
    UserCredentialsDialogComponent
  ],
  entryComponents: [
    StoreCredentialsInfoDialogComponent,
    PrivacyPolicyDialogComponent,
    UserCredentialsDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService]
    },
    ...(environment.production
      ? [{ provide: ErrorHandler, useClass: SentryErrorHandler }]
      : []),
    LecturesService,
    MealsService,
    authProviders,
    MenuItems,
    UserService,
    LecturesPollingService,
    InfoTextsService,
    LinksService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
