import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = `http://dev.tute.in/`;
  public baseURL=`https://learn.tute.com/`;
  user: any;
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
  public profile:any;
  public rprofile:any;
  public hideElement:boolean = true;
  public hideElement0:boolean =false;
  constructor(private http:Http) { }
  // city and country code service

  public getSubject(): Observable<any>{
    return this.http.get(this.baseURL + 'api/common/GetSubjectNames?')
    .map(res=>res.json());

  }
  public getLevel(): Observable<any>{
    // return this.http.get(this.baseURL + 'api/common/GetLevels').map(res => res.json());
    return this.http.get("https://learn.tute.in/api/common/GetLevels").map(res => res.json());
  }
  public getClass(): Observable<any>{
    // return this.http.get(this.baseURL + 'api/common/GetYears').map(res => res.json());
    return this.http.get("https://learn.tute.in/api/common/GetYears").map(res => res.json());
   // .pipe(map((response: any) =>response.json()));
  }

  public getNetworkInfo() : Observable<any>{
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

  public renderSessionsPost(){
    
  }

}
