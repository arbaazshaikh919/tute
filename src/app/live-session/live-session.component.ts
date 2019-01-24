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

  // Based Variable Declaration
  public selectionCheck: boolean = false;
  public activeBothClass: boolean = false;
  public activeLiveClass: boolean = false;
  public activeRecorededClass: boolean = false;
  public sesstionType: string = null;

  public sessionAPIURL: string = null;
  public SearchedRes: any;
  public videosBucketList = [];

  public BaseURL = "http://dev.tute.in/api/Lesson/GetLessionList?";

  // Form Field Declaration
  Syllabus = null;
  classes = null;
  Subject = null;
  advanceFilterForm: FormGroup;

  constructor(private dataService: UserService, private FormBuilder: FormBuilder) { 
    this.renderAdvanceFilterForm();
  }

  ngOnInit() {
    
  }

  public renderAdvanceFilterForm() {
    this.advanceFilterForm = this.FormBuilder.group({
      Syllabus: new FormControl('0', [Validators.required, Validators.minLength(2)]),
      classes: new FormControl('01', [Validators.required, Validators.maxLength(1)]),
      Subject: new FormControl('0', [Validators.required, Validators.minLength(2)]),
    });
  }

  public getSessionType(SessionType: string) {
    if (SessionType === 'Recorded') {
      this.activeRecorededClass = true;
      this.activeBothClass = false;
      this.activeLiveClass = false;
      this.sesstionType = 'Recoreded';
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=Maths&lessonType=1`;
    } else if (SessionType === 'Live') {
      this.activeLiveClass = true;
      this.activeBothClass = false;
      this.activeRecorededClass = false;
      this.sesstionType = 'Live';
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=English&lessonType=2`;
    } else if (SessionType === 'Both') {
      this.activeLiveClass = false;
      this.activeRecorededClass = false;
      this.sesstionType = 'Live & Recoreded';
      this.activeBothClass = true;
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=${this.advanceFilterForm.controls.Subject.value}&lessonType=3`;
    }
    this.parseRequiredAPI(this.sessionAPIURL);
  }

  public parseRequiredAPI(_URL: string) {
    this.dataService.getDataLiveSession(_URL).subscribe((res) => {
      this.SearchedRes = res.response.model.table;
      this.videosBucketList.push(res.response.model.table);
    });
    console.log(this.videosBucketList)
  }

}
