import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-book-trial',
  templateUrl: './book-trial.component.html',
  styleUrls: ['./book-trial.component.css']
})
export class BookTrialComponent implements OnInit {

  Name = "";
  Phone = '';
  Email = '';
  Board= '';
  Class = '';
  Subject = '';
  bookTrailForm:FormGroup;
  
  constructor(private dataService: UserService, private FormBuilder:FormBuilder) { 
    this.renderBookTrailForm();
  }

  ngOnInit() {
  }

  public renderBookTrailForm(){
    this.bookTrailForm = this.FormBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Email: new FormControl('', [Validators.required]),
      Board: new FormControl('', [Validators.required]),
      Class: new FormControl('', [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
    });
  }

  public handleFormSubmit(){
    console.log(this.bookTrailForm.controls.Name.value)
    console.log(this.bookTrailForm.controls.Phone.value)
    console.log(this.bookTrailForm.controls.Email.value)
    console.log(this.bookTrailForm.controls.Board.value)
    console.log(this.bookTrailForm.controls.Class.value)
    console.log(this.bookTrailForm.controls.Subject.value)
  }

}
