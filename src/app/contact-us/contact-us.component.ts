import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  Name = "";
  Phone = '';
  Email = '';
  description = '';
  contactForm:FormGroup;

  constructor(private FormBuilder: FormBuilder) { 
    this.renderBookTrailForm();
  }
  
  ngOnInit() {
  }
  
  public renderBookTrailForm() {
    this.contactForm = this.FormBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Email: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  public handleFormSubmit() {
    console.log(this.contactForm.controls.Name.value)
    console.log(this.contactForm.controls.Phone.value)
    console.log(this.contactForm.controls.Email.value)
    console.log(this.contactForm.controls.description.value)
  }

}
