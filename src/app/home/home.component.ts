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

  constructor(private _router:Router,private formBuilder: FormBuilder,private user: UserService) { 
    this.form = this.formBuilder.group({
     search:[null]
    });

  }
   
  ngOnInit() { }

  

}
