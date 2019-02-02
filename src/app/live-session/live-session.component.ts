import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
  public isLiveSession: boolean = false;
  public activeRecorededClass: boolean = false;
  public sesstionType: string = null;

  public sessionAPIURL: string = null;
  public SearchedRes: any;
  public videosBucketList = [];
  public getPayLoad = null;


  public fetchedSubjectName = null;
  public fetchedSubjectId = null;
  public fetchedSyllabusName = null;
  public fetchedSyllabusId = null;

  public _sessType: any;
  public _Syllabus: any;
  public _Class: any;
  public _Subject: any;

  public BaseURL = "http://dev.tute.in/api/Lesson/GetLessionList?";

  // Form Field Declaration
  Syllabus = null;
  classes = null;
  hdnSubject = null;
  Subject = null;
  advanceFilterForm: FormGroup;

  constructor(private dataService: UserService, private FormBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.renderAdvanceFilterForm();
    // console.log(this.dataService.renderLesssonFinderPayload('1', '15', '19').subjectIds)
  }

  ngOnInit() {
    this.route.queryParams.subscribe((QueryParams) => {
      this._sessType = QueryParams['_sessTy']
      this._Syllabus = QueryParams['_sylB']
      this._Class = QueryParams['_cls']
      this._Subject = QueryParams['_suB']
    });
    this.parseGetStarted();
  }

  public renderAdvanceFilterForm() {
    this.advanceFilterForm = this.FormBuilder.group({
      Syllabus: new FormControl('0', [Validators.required]),
      classes: new FormControl('0', [Validators.required]),
      Subject: new FormControl('0', [Validators.required]),
    });
  }

  public getSudjectDetails() {
    this.fetchedSubjectId = this.advanceFilterForm.controls.Subject.value.split(" ")[0];
    this.fetchedSubjectName = this.advanceFilterForm.controls.Subject.value.split(" ")[1];
  }

  public getSyllabusDetails() {
    this.fetchedSyllabusId = this.advanceFilterForm.controls.Syllabus.value.split(" ")[0];
    this.fetchedSyllabusName = this.advanceFilterForm.controls.Syllabus.value.split(" ")[1];
  }

  public getSessionType(SessionType: string) {
    if (this.advanceFilterForm.controls.Syllabus.value != '0' && this.advanceFilterForm.controls.classes.value != '0' && this.advanceFilterForm.controls.Subject.value) {
      if (SessionType === 'Recorded') {
        this.activeRecorededClass = true;
        this.activeBothClass = false;
        this.activeLiveClass = false;
        this.sesstionType = 'Recoreded';
        this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=Maths&lessonType=1`;
        this.isLiveSession = false;
        this.parseRequiredAPI(this.sessionAPIURL);
      } else if (SessionType === 'Live') {
        this.activeLiveClass = true;
        this.activeBothClass = false;
        this.activeRecorededClass = false;
        this.sesstionType = 'Live';
        this.getPayLoad = this.dataService.renderLesssonFinderPayload(this.fetchedSyllabusId, this.advanceFilterForm.controls.classes.value, this.fetchedSubjectId);
        this.parseLiveSessionAPI();
      } else if (SessionType === 'Both') {
        this.activeLiveClass = false;
        this.activeRecorededClass = false;
        this.sesstionType = 'Live & Recoreded';
        this.activeBothClass = true;
        this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=${this.advanceFilterForm.controls.Subject.value}&lessonType=3`;
        this.isLiveSession = true;
        this.parseRequiredAPI(this.sessionAPIURL);
      }
    } else {
      alert('Please fill all required fields');
      this.advanceFilterForm.getError;
    }
  }

  public parseLiveSessionAPI() {
    const searchFilterParams = Object.keys(this.getPayLoad).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.getPayLoad[key]);
    }).join('&');
    this.dataService.renderLessonFinder(searchFilterParams).subscribe((data) => {
      this.dataService.liveSessionData.splice(0, this.dataService.liveSessionData.length);
      data.response.model.forEach(items => {
        this.dataService.renderLessons(items.courseId).subscribe((data) => {
          this.dataService.liveSessionData.push(data.response.model);
          // console.log(this.dataService.liveSessionData);
          this.isLiveSession = true;
        });
      });
    });
  }

  public parseRequiredAPI(_URL: string) {
    this.dataService.getDataLiveSession(_URL).subscribe((res) => {
      this.SearchedRes = res.response.model.table;
    });
  }

  public parseGetStarted() {
    if (this._sessType != '' && this._Syllabus != '' && this._Class != '' && this._Subject) {
      this.advanceFilterForm.controls.Syllabus.setValue(this._Syllabus);
      this.advanceFilterForm.controls.Subject.setValue(this._Subject);
      this.advanceFilterForm.controls.classes.setValue(this._Class);
      this.getSudjectDetails();
      this.getSyllabusDetails();
      if (this._sessType == 1) {
        this.activeRecorededClass = true;
        this.getSessionType('Recoreded');
      } else if (this._sessType == 2) {
        this.activeLiveClass = true;
        this.getSessionType('Live');
      }
    }
  }

  public renderViewDetails(detailsId, lessonName) {
    this.router.navigate([`/viewDetails`], {
      queryParams: {
        '_sessTy': this.sesstionType,
        '_sylB': this.fetchedSyllabusName,
        '_cls': this.advanceFilterForm.controls.classes.value,
        '_suB': this.fetchedSubjectName,
        '_detId': detailsId,
        '_leSsN': lessonName,
      }
    });
  }

}
