import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-details-live-session',
  templateUrl: './view-details-live-session.component.html',
  styleUrls: ['./view-details-live-session.component.css']
})
export class ViewDetailsLiveSessionComponent implements OnInit {

  public isActivateCurriculumTab: boolean = true;
  public isActivateBatchesTab: boolean = false;
  public isActivateFAQTab: boolean = false;
  public sessionType  = null;
  public syllabus  = null;
  public class  = null;
  public subject  = null;
  public detailsId  = null;
  public lessonName  = null;

  public videoLiveLessons:any = null;
  public videoLiveLessonBucket = [];
  public videoLiveLessonBucketList = [];
  public showTotalBanner: boolean = false;

  public subTotal: any = null;
  public discount: any = null;
  public total: number = null;

  List = '';
  selectionListForm:FormGroup;
  encRequest: string;
  triggerURL: string;

  constructor(private dataService: UserService, private router: Router, private route: ActivatedRoute, private FormBuilder:FormBuilder) { 
    this.renderSelectionListForm();
    if (this.videoLiveLessons == null){
      this.router.navigate['/home'];
    }
   }

  ngOnInit() { 
    this.route.queryParams.subscribe((params) => {
      this.sessionType = params['_sessTy']
      this.syllabus = params['_sylB']
      this.class = params['_cls']
      this.subject = params['_suB']
      this.detailsId = params['_detId']
      this.lessonName = params['_leSsN']
    });
    this.getSubjectLessonRecurrences();    
    
   }

  public renderTabs(currentTabs){
    if (currentTabs === 'Curriculum'){
      this.isActivateCurriculumTab = true;
      this.isActivateBatchesTab = false;
      this.isActivateFAQTab = false;
    } else if (currentTabs === 'Batches') {
      this.isActivateCurriculumTab = false;
      this.isActivateBatchesTab = true;
      this.isActivateFAQTab = false;
    } else if (currentTabs === 'FAQ') {
      this.isActivateCurriculumTab = false;
      this.isActivateBatchesTab = false;
      this.isActivateFAQTab = true;
    }
  }

  public getSubjectLessonRecurrences(){
    this.dataService.liveSessionData.forEach((Items) => {
      if (Items.id == this.detailsId){
        Items.rercurrences.forEach((videoItems) => {
          this.videoLiveLessons = videoItems.lessons
          this.videoLiveLessons.forEach(element => {
            this.videoLiveLessonBucket.push(element);
          });
        });
      }
    });
    this.renderSelectionListForm();
  }

  public renderSelectionListForm(){
    const controls = this.videoLiveLessonBucket.map(cont => new FormControl(false));
    this.selectionListForm = this.FormBuilder.group({
      List: new FormArray(controls)
    });
  }

  public checkSelectionList() {
    this.subTotal = 0;
    this.discount = 0;
    this.total = 0;
    const selectedVideoIds = this.selectionListForm.value.List
      .map((v, i) => v ? this.videoLiveLessonBucket[i] : null)
      .filter(v => v !== null);
    this.videoLiveLessonBucketList.splice(0, this.videoLiveLessonBucketList.length)
    this.videoLiveLessonBucketList.push(selectedVideoIds)
    selectedVideoIds.forEach(items => {
      this.subTotal += items.cost;
      this.discount = 5;
    });
    let totalDiscount = (this.discount * this.subTotal) / 100;
    this.total = this.subTotal - totalDiscount;
    this.showTotalBanner = true;
  }

  public paymentHandler() {
    if (this.total != null) {
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
