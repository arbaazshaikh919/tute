import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components Import 
import { HomeComponent } from './home/home.component';
import { BookTrialComponent } from './book-trial/book-trial.component';
import { LiveSessionComponent } from './live-session/live-session.component';
import { RecordedSessionComponent } from './recorded-session/recorded-session.component';
// import { FooterpageComponent } from './footerpage/footerpage.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'liveSession', component: LiveSessionComponent },
  { path: 'bookTrail', component: BookTrialComponent },
  { path: 'recordedSession', component: RecordedSessionComponent }
  // { path: '', component:  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
