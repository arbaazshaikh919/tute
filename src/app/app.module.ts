import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { EmbedVideo } from 'ngx-embed-video';
//import { map, filter, switchMap } from 'rxjs/operators';
import 'rxjs';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoverComponent } from './layout/discover/discover.component';
import { HomeConfigService } from './home-config.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DiscoverComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, EmbedVideo.forRoot()
  ],
  providers: [CookieService,HomeConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
