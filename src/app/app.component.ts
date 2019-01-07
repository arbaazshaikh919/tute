import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tute';
 // cookieValue = 'UNKNOWN';
  constructor() {}

  ngOnInit() {
    
  }
 
}
