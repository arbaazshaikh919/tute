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
 
  constructor(public router: Router,private dataService : UserService){
    this.bootStrapLoaders();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home' || event.url === '/') {
       
          this.dataService.hideElement = true;
          this.dataService.hideElement0 = false;

        } else {
          this.dataService.hideElement = false;
          this.dataService.hideElement0 = true;
        }
      }
    });

  }
  ngOnInit() {
  }

  public bootStrapLoaders(){

    // Fetching API Request
    this.dataService.getSubject().subscribe((response) => {
      this.dataService.subject = response.response;
    }, err => {
      console.log('Subjects', err);
    });


    this.dataService.getClass().subscribe((response) => {
      this.dataService.class = response.response;
    }, err => {
      console.log('class', err);
    });

    this.dataService.getLevel().subscribe((response) => {
      this.dataService.level = response.response;
    }, err => {
      console.log('class', err);
    });

    // Getting Network Information
    this.dataService.getNetworkInfo().subscribe((response) => {
      console.log('Network Info', response);
    }, err => {
      console.log('Network Info', err);
    });
  }
}
