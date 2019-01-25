import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, Form } from '@angular/forms';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-recorded-session',
  templateUrl: './recorded-session.component.html',
  styleUrls: ['./recorded-session.component.css']
})
export class RecordedSessionComponent implements OnInit {
  
  // Form Field Declaration
  Syllabus = null;
  classes = null;
  Subject = null;
  advanceFilterForm: FormGroup;
  selectionListForm: FormGroup;

  // Based Variable Declaration
  public selectionCheck: boolean = false;
  public activeBothClass: boolean = false;
  public activeLiveClass: boolean = false;
  public activeRecorededClass: boolean = false;
  public showTotalBanner: boolean = false;

  public sessionAPIURL:string = null;
  public sampleVideoURL:string = null;
  public sesstionType:string = null;
  public SearchedRes:any;
  public selectionBuget = [];
  public selectionBugetList = [];
  public _sessType: any;
  public _Syllabus: any;
  public _Class: any;
  public _Subject: any;

  public subTotal = null;
  public discount = null;
  public total = null;

  public BaseURL = "http://dev.tute.in/api/Lesson/GetLessionList?";

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private dataService: UserService, 
    private FormBuilder: FormBuilder) {
    this.renderAdvanceFilterForm();
    this.renderSelectionListForm();
  }
  
  ngOnInit() {
    document.getElementById('video-dialog').style.display = 'none';
    this.route.queryParams.subscribe((QueryParams) => {
      this._sessType = QueryParams['_sessTy'] 
      this._Syllabus = QueryParams['_sylB'] 
      this._Class = QueryParams['_cls'] 
      this._Subject =  QueryParams['_suB']
    });

    this.parseGetStarted();
  }

  public renderAdvanceFilterForm(){
    this.advanceFilterForm = this.FormBuilder.group({
      Syllabus: new FormControl('0', [Validators.required, Validators.minLength(2)]),
      classes: new FormControl('01', [Validators.required, Validators.maxLength(1)]),
      Subject: new FormControl('0', [Validators.required, Validators.minLength(2)]),
    });
  }

  public getSessionType(SessionType:string){
    if (SessionType === 'Recorded') {
      this.activeRecorededClass = true;
      this.activeBothClass = false;
      this.activeLiveClass = false;
      this.sesstionType = 'Recoreded';
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=${this.advanceFilterForm.controls.Subject.value}&lessonType=1`;
    } else if (SessionType === 'Live') {
      this.activeLiveClass = true;
      this.activeBothClass = false;
      this.activeRecorededClass = false;
      this.sesstionType = 'Live';
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=${this.advanceFilterForm.controls.Subject.value}&lessonType=2`;
    } else if (SessionType === 'Both') {
      this.activeLiveClass = false;
      this.activeRecorededClass = false;
      this.sesstionType = 'Live & Recoreded';
      this.activeBothClass = true;
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.advanceFilterForm.controls.Syllabus.value}&classes=${this.advanceFilterForm.controls.classes.value}&subject=${this.advanceFilterForm.controls.Subject.value}&lessonType=3`;
    }
    this.parseRequiredAPI(this.sessionAPIURL);
  }

  public parseRequiredAPI(_URL:string){
    this.dataService.getDataLiveSession(_URL).subscribe((res) => {
      this.SearchedRes = res.response.model.table;
      this.selectionBugetList.splice(1);
      this.SearchedRes.forEach((item) => {
        this.selectionBugetList.push(item);
        this.renderSelectionListForm();
      })
    });
  }

  //Selection List Logic
  public renderSelectionListForm(){
    this.selectionListForm = this.FormBuilder.group({
      List: this.addSelectionList(),
    });

  }
  public addSelectionList(){
    const ListArr = this.selectionBugetList.map((element) => {
      return this.FormBuilder.control(false);
    });
    return this.FormBuilder.array(ListArr);
  }

  get selectionList(){
    return this.selectionListForm.get('List');
  }

  public checkSelectionList(){
    this.selectionList.controls.forEach((items, index) => {
      if (items.value === true) {
        let bucketData = {
          id: this.selectionBugetList[index].id,
          discount: this.selectionBugetList[index].discount,
          totalprice: this.selectionBugetList[index].price,
          totalseats: this.selectionBugetList[index].totalseats
        }
        this.subTotal += bucketData.totalprice;
        this.discount = bucketData.discount;
        let totalDiscount = (this.discount * this.subTotal ) / 100;
        this.total = this.subTotal - totalDiscount;
        this.selectionBuget.push(bucketData);
        this.showTotalBanner = true;
      } else if (items.value === false){
        this.total -= this.subTotal - (this.discount * this.subTotal) / 100;
        this.discount -= this.selectionBugetList[index].discount;
        this.subTotal -= this.selectionBugetList[index].price;        
        this.selectionBuget.splice(index, 1);
      }
    });
    console.log(this.selectionBuget);
  }

  // Dialog Logic
  public dialogClose(){
    document.getElementById('video-dialog').style.display = 'none';
  }

  public dialogOpen(_URL){
    document.getElementById('video-dialog').style.display = 'block';
    this.sampleVideoURL = _URL;
  }

  public parseGetStarted(){
    
    this._sessType;
    this._Syllabus;
    this._Class;
    this._Subject;
    if (this._sessType != '' && this._Syllabus != '' && this._Class != '' && this._Subject){
      this.advanceFilterForm.controls.Syllabus.setValue(this._Syllabus);
      this.advanceFilterForm.controls.Subject.setValue(this._Subject);
      this.advanceFilterForm.controls.classes.setValue(this._Class);
      if (this._sessType == 1) {
        this.activeRecorededClass = true;
        this.getSessionType('Recoreded');
      } else if (this._sessType == 2) {
        this.activeLiveClass = true;
        this.getSessionType('Live');
      }
    }
  }

}
