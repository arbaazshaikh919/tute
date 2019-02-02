import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { FooterpageComponent } from './footerpage/footerpage.component';

// User Service Files Imports
import { UserService } from './services/user.service';

//Components imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookTrialComponent } from './book-trial/book-trial.component';
import { LiveSessionComponent } from './live-session/live-session.component';
import { recorededSessionModule } from './recorded-session/recorded-session.module';
import { RecordedSessionComponent } from './recorded-session/recorded-session.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { ViewDetailsLiveSessionComponent } from './view-details-live-session/view-details-live-session.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LiveSessionComponent,
    BookTrialComponent,
    RecordedSessionComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    ViewDetailsLiveSessionComponent,
    // FooterpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    recorededSessionModule,
    NgxPageScrollModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
