import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent implements OnInit {

  constructor(private _router:Router,private formBuilder: FormBuilder,private user: UserService) { }

  ngOnInit() {
    
  }

}
