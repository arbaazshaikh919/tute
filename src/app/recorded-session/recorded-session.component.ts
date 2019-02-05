import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, Form } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
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

  accessCode = null;
  orderid = null;
  currency = null;
  amount = null;
  redirect_url = null;
  cancel_url = null;
  renderFinalPayForm:FormGroup;

  List = null;
  selectionListForm: FormGroup;


  // Based Variable Declaration
  public selectionCheck: boolean = false;
  public activeBothClass: boolean = false;
  public activeLiveClass: boolean = false;
  public activeRecorededClass: boolean = false;
  public showTotalBanner: boolean = false;
  public isAvailable: boolean = false;

  public sessionAPIURL:string = null;
  public sampleVideoURL:string = null;
  public sesstionType:string = null;
  public SearchedRes:any;
  public selectionBucket = [];
  public selectionBucketList = [];
  public _sessType: any;
  public _Syllabus: any;
  public _Class: any;
  public _Subject: any;

  public fetchedSubjectName = null;
  public fetchedSubjectId = null;
  public fetchedSyllabusName = null;
  public fetchedSyllabusId = null;

  public subTotal = null;
  public discount = null;
  public total = null;

  //Payment Releated Variable Declaration
  public triggerURL = null;
  public orderId = null;
  public encRequest = null;

  public BaseURL = "http://dev.tute.in/api/Lesson/GetLessionList?";

  constructor(
    private route: ActivatedRoute, 
    private dataService: UserService, 
    private FormBuilder: FormBuilder) {
    this.renderAdvanceFilterForm();
    this.renderSelectionListForm();
    this.renderPaymentForm();
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

  public getSessionType(SessionType:string){
    this.getSudjectDetails();
    this.getSyllabusDetails();
    if (SessionType === 'Recorded') {
      this.activeRecorededClass = true;
      this.activeBothClass = false;
      this.activeLiveClass = false;
      this.sesstionType = 'Recorded';
      // this.sessionAPIURL = "http://dev.tute.in/api/Lesson/GetLessionList?syllabus=CBSE&classes=6&subject=Maths&lessonType=1"
      this.sessionAPIURL = this.BaseURL + `syllabus=${this.fetchedSyllabusName}&classes=${this.advanceFilterForm.controls.classes.value}&subject=${this.fetchedSubjectName}&lessonType=1`;
    }
    this.parseRequiredAPI(this.sessionAPIURL);
  }

  public parseRequiredAPI(_URL:string){
    this.dataService.getDataLiveSession(_URL).subscribe((res) => {
      this.SearchedRes = res.response.model.table;
      this.selectionBucketList.splice(0, this.selectionBucketList.length);
      if(this.SearchedRes == ''){
        this.isAvailable = false;
      }else{
        this.isAvailable = true;
        this.SearchedRes.forEach((item) => {
          this.selectionBucketList.push(item);
          this.renderSelectionListForm();
        })
      }
    });
  }

  //Selection List Logic
  public renderSelectionListForm(){
    const controls = this.selectionBucketList.map(cont => new FormControl(false));
    this.selectionListForm = this.FormBuilder.group({
      List: new FormArray(controls)
    });
  }

  public checkSelectionList(){
    this.subTotal = 0;
    this.discount = 0;
    this.total = 0;
    const selectedVideoIds = this.selectionListForm.value.List
      .map((v, i) => v ? this.selectionBucketList[i] : null)
      .filter(v => v !== null);
    this.selectionBucket.splice(0, this.selectionBucket.length);
    this.selectionBucket.push(selectedVideoIds)
    selectedVideoIds.forEach(items => {
      this.subTotal += items.price;
      this.discount = items.discount;
    });
    let totalDiscount = (this.discount * this.subTotal) / 100;
    this.total = this.subTotal - totalDiscount;
    this.showTotalBanner = true;
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
    if (this._sessType != '' && this._Syllabus != '' && this._Class != '' && this._Subject){
      this.advanceFilterForm.controls.Syllabus.setValue(this._Syllabus);
      this.advanceFilterForm.controls.Subject.setValue(this._Subject);
      this.advanceFilterForm.controls.classes.setValue(this._Class);
      if (this._sessType == 1) {
        this.activeRecorededClass = true;
        this.getSessionType('Recorded');
      } else if (this._sessType == 2) {
        this.activeLiveClass = true;
        this.getSessionType('Live');
      }
    }
  }

  public renderPaymentForm(){
    this.renderFinalPayForm = this.FormBuilder.group({
      accessCode: new FormControl(),
      orderid: new FormControl(),
      currency: new FormControl(),
      amount: new FormControl(),
      redirect_url: new FormControl(),
      cancel_url: new FormControl(),
    });
  }
  public paymentHandler(){
    this.orderId = Math.floor((Math.random() * 100000000000) + 1);
    if (this.total != null && this.advanceFilterForm.valid){
      this.triggerURL = `${this.dataService.testURL}/transaction/transaction.do?command=initiateTransaction`;
      let rawFormData = document.forms['renderFinalPayForm'];
      let formData = `access_code=${rawFormData.access_code.value}&orderid=${rawFormData.orderid.value}&currency=${rawFormData.currency.value}&amount=${rawFormData.amount.value}&redirect_url=${rawFormData.redirect_url.value}&cancel_url=${rawFormData.cancel_url.value}`;
      let stringForEncryption = JSON.stringify(formData); //Converting Json string for encryption
      this.encRequest = window.btoa(stringForEncryption);
      document.forms['renderFinalPayForm'].action = this.triggerURL;
      document.forms['renderFinalPayForm'].method = 'POST';
      document.forms['renderFinalPayForm'].submit();
    }
  }

}
