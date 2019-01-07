import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { RegisterComponent } from './layout/register/register.component';
import { DiscoverComponent } from './layout/discover/discover.component'
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: 'header',
    component:HeaderComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'discover',
    component: DiscoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HeaderComponent, FooterComponent,RegisterComponent,HomeComponent,DiscoverComponent]