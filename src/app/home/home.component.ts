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

  SessionType = null;
  Syllabus = null;
  classes = null;
  Subject = null;
  advanceFilterForm: FormGroup;


  constructor(private router: Router, route: ActivatedRoute, private dataService: UserService, private FormBuilder: FormBuilder) { 
    this.renderAdvanceFilterForm()
  }
   
  ngOnInit() { }

  public renderAdvanceFilterForm() {
    this.advanceFilterForm = this.FormBuilder.group({
      SessionType: new FormControl('01', [Validators.required, Validators.maxLength(1)]),
      Syllabus: new FormControl('0', [Validators.required, Validators.minLength(2)]),
      classes: new FormControl('0', [Validators.required]),
      Subject: new FormControl('0', [Validators.required, Validators.minLength(2)]),
    });
  }

  public renderSearchResults(){
    let session = null;
    if (this.advanceFilterForm.valid){
      if (this.advanceFilterForm.controls.SessionType.value == 1){
        session = 'recordedSession';
      } else if (this.advanceFilterForm.controls.SessionType.value == 2){
        session = 'liveSession';
      }
      this.router.navigate([`/${session}`], {
        queryParams:{
          '_sessTy' : this.advanceFilterForm.controls.SessionType.value,
          '_sylB': this.advanceFilterForm.controls.Syllabus.value,
          '_cls': this.advanceFilterForm.controls.classes.value,
          '_suB': this.advanceFilterForm.controls.Subject.value,
        }
      })
    }else{
      alert('Please fill all required fields');
    }
  }

}
