import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
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
  profile:any;
  rprofile:any;
  hideElement:boolean = true;
  hideElement0:boolean =false;
  constructor(private http:Http) { }
  // city and country code service

  getSubject(): Observable<any>{
    return this.http.get(this.baseURL + 'api/common/GetSubjectNames?')
    .map(res=>res.json());

  }
  getLevel(): Observable<any>{
    return this.http.get(this.baseURL + 'api/common/GetYears?',)
    .map(res=>res.json());
  }
  getClass(): Observable<any>{
   return this.http.get(this.baseURL + 'api/common/GetLevels?')
    // .pipe(map((response: any) =>response.json()));
    .map(res=>res.json());
  }

  getNetworkInfo() : Observable<any>{
    return this.http.get('http://learn2.tute.com/api/boot/NetworkInfo?name=uk')
    .map(res=>res.json());
  }
  
  login(json): Observable<any> {
    const headers = new Headers();
        headers.append('content-type','application/json');
        const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'api/auth' ,json,options)
        .map(res=>res.json());
}
register(rjson): Observable<any> {
  const headers = new Headers();
      headers.append('content-type','application/json');
      const options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + 'api/user/AddUser' ,rjson,options)
      .map(res=>res.json());
}

}
