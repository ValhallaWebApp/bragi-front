import { AuthModule } from '@angular/fire/auth';
import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContactIconComponent } from './components/shortcut/contact-icon/contact-icon.component';

//material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { MatInputModule } from '@angular/material/input';         // Per utilizzare gli input di Angular Material
import { MatSelectModule } from '@angular/material/select';       // Per utilizzare i menu a tendina (select)
import { MatFormFieldModule } from '@angular/material/form-field'; // Per utilizzare i contenitori dei campi di input (form-field)
import { MatDialogModule } from '@angular/material/dialog';
import { ContactModule } from './modules/contact/contact.module';

import { FormsModule } from '@angular/forms';

// Firebase e AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Funzione per caricare i file di traduzione
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        BannerComponent,
        FooterComponent
    ],
    bootstrap: [AppComponent],
    exports:[AuthModule],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        ContactModule,
        FormsModule,
        AuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
      ],
        providers: [
          provideHttpClient(withInterceptorsFromDi()),
          // importProvidersFrom(
          //   provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
          //   provideAuth(() => getAuth())
          // )
        ] })
export class AppModule { }
