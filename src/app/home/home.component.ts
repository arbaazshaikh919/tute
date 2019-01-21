import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';


declare var $:any;
declare var jQuery: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
 @Input() hideElement:any;
  closeResult: string;

  countrieslist: Array<any> = [];
  // countrieslist=['United States','United Kingdom','German','Ireland','Icelend','Mexico','Canada','SaudiAruba','Africa','Australia']
  constructor(private _router:Router,private formBuilder: FormBuilder,private user: UserService) { 
   
    this.form = this.formBuilder.group({
     search:[null]
    });

  }
   
 

  ngOnInit() {
    console.log( "sdfsafdsf",this.hideElement)
   this.user.getSubject()
   .subscribe((response) => {
    console.log('Subjects', response);
    this.user.subject = response.response;
  },
    err => {
      console.log('Subjects', err);
    }
  );


  this.user.getClass()
  .subscribe((response) => {
   console.log('class', response);
     this.user.level = response.response;
 },
   err => {
     console.log('class', err);
   }
 );

 this.user.getLevel()
 .subscribe((response) => {
  console.log('Level', response);
   this.user.class = response.response;
},
  err => {
    console.log('class', err);
  }
);

  }

  

}
