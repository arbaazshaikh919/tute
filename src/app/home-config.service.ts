import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpEventType,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
const _headers = new HttpHeaders();
    const headers = _headers.append('Content-Type', 'application/json')
                            .append('Access-Control-Allow-Origin','*',)
                            .append('Access-Control-Allow-Methods','*')
                            .append('Access-Control-Allow-Headers','application/json');

@Injectable({
  providedIn: 'root'
})
export class HomeConfigService {
// YOutuve Video Url for chrome.
youtubeUrl = 'https://www.youtube.com/embed/JBa4VkY6yUA';
// Base URL 
 public baseURL="https://learn.tute.com/";
 public apiurl = "api/common/GetSubjectNames?";
//public url="http://learn2.tute.com/api/boot/NetworkInfo?name=uk"

  constructor(private cookieService: CookieService, public http: HttpClient, private embedService: EmbedVideoService) { }
  //console.log(this.embedService.embed(this.youtubeUrl));
  

  getLevel(): Observable<any>{
    // const headers = new Headers();
    // headers.append('Access-Control-Allow-Origin','http://localhost:4200',)
    // const options = new RequestOptions({headers:headers})  
    const httpHeaders = new HttpHeaders ();
    httpHeaders.append('Access-Control-Allow-Origin','http://localhost:4200')            

    return this.http.get(this.baseURL + 'api/common/GetYears?',{ headers: httpHeaders })
    // .pipe(map((response: any) =>response.json()));
    .pipe(map(res => res));
  }
  getClass(): Observable<any>{
   return this.http.get('https://learn.tute.in/api/common/GetLevels?')
    // .pipe(map((response: any) =>response.json()));
    .pipe(map(res => res));
  }
  getSubject(): Observable<any>{
    return this.http.get(this.baseURL + this.apiurl)
    .pipe(map(res => res));
  
  }
  getNetworkInfo() : Observable<any>{
    return this.http.get('http://learn2.tute.com/api/boot/NetworkInfo?name=uk')
    .pipe(map(res => res));
  }
}
