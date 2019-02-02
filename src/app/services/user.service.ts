import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as cryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = `http://dev.tute.in/`;
  public baseAltURL=`http://dev.tute.in/`;
  public user: any;

  public liveSessionData = [];

  subject = {
    'code':0,
    'message':'',
    'model':{
      'list':[{'value':'','text':''}]
    }
  };
  class = {
    'code':0,
    'message':'',
    'model':{
      'list':[{'value':'','text':'','years':''}]
    }
  };
  level = {
    'code':0,
    'message':'',
    'model':{
      'list':[{'value':'','text':'','years':''}]
    }
  };
  
  staticClasses = {
    "list": [
      {
        "value": 4,
        "text": "Class 4"
      },
      {
        "value": 5,
        "text": "Class 5"
      },
      {
        "value": 6,
        "text": "Class 6"
      },
      {
        "value": 7,
        "text": "Class 7"
      },
      {
        "value": 8,
        "text": "Class 8"
      },
      {
        "value": 9,
        "text": "Class 9"
      }
    
    ]
  };

  staticSubject = {
    "list": [
      {
        "value": 'English',
        "text": "English Language"
      },
      {
        "value": 'Maths',
        "text": "Maths Language"
      },
    ]
  };

  // public lessionFinderPayload = {
  //   "subjectIds": "19", "levelIds": "1", "types": "GROUP", "rating": "", "yearIds": "15", "availability": "", "PublicLevel": "", "skip": 0, "take": 9
  // }

  public profile:any;
  public rprofile:any;
  public hideElement:boolean = true;
  public hideElement0:boolean =false;
  constructor(private http: Http, private HttpClient: HttpClient) { }
  // city and country code service

  public merchant: number = 198502;
  public access_code: string = 'AVAF02GA51CH25FAHC';
  public workingKey: string = 'E8E4C9BD2801F48DF8CE880AC1F11774';

  public testURL = 'https://test.ccavenue.com';
  public productURL = '	https://secure.ccavenue.com';

  public getSubject(): Observable<any>{
    return this.http.get(this.apiUrl + 'api/common/GetSubjectNames?')
    .map(res=>res.json());

  }
  public getLevel(): Observable<any>{
    // return this.http.get(this.baseURL + 'api/common/GetLevels').map(res => res.json());
    return this.http.get("http://dev.tute.in/api/common/GetLevels").map(res => res.json());
  }
  public getClass(): Observable<any>{
    // return this.http.get(this.baseURL + 'api/common/GetYears').map(res => res.json());
    return this.http.get("http://dev.tute.in/api/common/GetYears").map(res => res.json());
   // .pipe(map((response: any) =>response.json()));
  }

  public getNetworkInfo(): Observable<any>{
    return this.http.get('http://learn2.tute.com/api/boot/NetworkInfo?name=uk').map(res=>res.json());
  }
  
  public login(json): Observable<any> {
    const headers = new Headers();
    headers.append('content-type','application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'api/auth' , json, options).map(res=>res.json());
  }

  public register(rjson): Observable<any> {
    const headers = new Headers();
    headers.append('content-type','application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'api/user/AddUser' , rjson, options).map(res=>res.json());
  }

  public getDataLiveSession(_URL:string): Observable<any>{
    return this.http.get(_URL).map(res => res.json());
  }

  public renderPaymentSessionsPost(_URL: string): Observable<any>{
    return this.http.get(_URL).map(res => res.json());
  }

  public renderEncRequest(formData): Observable<any>{
    let stringForEncryption = JSON.stringify(formData); //Now we have one long Json string for encryption
    return cryptoJS.AES.encrypt(stringForEncryption);
  }

  public renderLessonFinder(payLoad): Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('network-zone', 'Europe/London');
    const ParseHeaders = new RequestOptions({ headers: headers });
    return this.http.post(this.baseAltURL + 'api/LessonFinder', payLoad, ParseHeaders).map(res => res.json());
  }

  public renderLesssonFinderPayload(Syllabus, Class, Subject){
    let payLoadData = {
      "subjectIds": `${Subject}`, "levelIds": `${Syllabus}`, "types": "GROUP", "rating": "", "yearIds": `${Class}`, "availability": "", "PublicLevel": "", "skip": 0, "take": 9
    }
    return payLoadData;
  }

  public renderLessons(LessionId):Observable<any>{
    const headers = new Headers();
    headers.append('network-zone', 'Europe/London');
    const ParseHeaders = new RequestOptions({ headers: headers });
    return this.http.get(this.baseAltURL + `api/StudentBooking/GetCourse?id=${LessionId}`, ParseHeaders).map(res => res.json());
  }

}
