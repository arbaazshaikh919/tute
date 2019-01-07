import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';
import { HomeConfigService} from '../../home-config.service';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  yt_iframe_html: any;
  vimeoUrl = 'https://www.youtube.com/watch?v=JBa4VkY6yUA';
   

  constructor( private httpclient: HttpClient, public homeConfigService: HomeConfigService, private embedService: EmbedVideoService) {
    this.yt_iframe_html = this.embedService.embed(this.vimeoUrl);
   }
  
  ngOnInit(): void {
    this.getSubject();
    this.getSyllabus();
    this.getClass();
   }
title = 'app';
  subject : Array<any> = [];
  syllabus : Array<any> = [];
  class : Array<any> = [];
  session : Array<any> = [];
  networkinfo: Array<any> =[];
 
  getSubject() {
    this.homeConfigService.getSubject().subscribe(data => {
     this.subject = data.response.model;
     console.log(this.subject);
   })
  }
  getSyllabus() {
    this.homeConfigService.getClass().subscribe(data => {
     this.syllabus = data.response.model;
     console.log(this.syllabus);
   })
  }
  getClass() {
    this.homeConfigService.getLevel().subscribe(data => {
     this.class = data.response.model;
     console.log(this.class);
   })
  }
  getNetworkInfo() {
    this.homeConfigService.getNetworkInfo().subscribe(data => {
      this.networkinfo = data;
     console.log(this.networkinfo);
   })
  }
  
}
