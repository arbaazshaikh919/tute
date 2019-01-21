import { Component , Input} from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
 
  constructor(public router: Router,private user : UserService)
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home' || event.url === '/') {
       
           this.user.hideElement = true;
           this.user.hideElement0 = false;

        } else {
           this.user.hideElement = false;
           this.user.hideElement0 = true;

        }
      }
    });

  }
  ngOnInit() {
  
  
 this.user.getNetworkInfo()
 .subscribe((response) => {
  console.log('Network Info', response);
  // this.user.subject = response.response;
},
  err => {
    console.log('Network Info', err);
  }
);
  
  }
}
