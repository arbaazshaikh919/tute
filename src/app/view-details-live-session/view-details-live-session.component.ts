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

  List = '';
  selectionListForm:FormGroup;

  constructor(private dataService: UserService, private router: Router, private route: ActivatedRoute, private FormBuilder:FormBuilder) { 
    this.renderSelectionListForm();
    this.getSubjectLessonRecurrences();
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
      Items.rercurrences.forEach((videoItems) => {
        this.videoLiveLessons = videoItems.lessons
        this.videoLiveLessons.forEach(element => {
          this.videoLiveLessonBucket.push(element);
        });
      });
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
    const selectedVideoIds = this.selectionListForm.value.List
      .map((v, i) => v ? this.videoLiveLessonBucket[i] : null)
      .filter(v => v !== null);
    this.videoLiveLessonBucketList.splice(0, this.videoLiveLessonBucketList.length)
    this.videoLiveLessonBucketList.push(selectedVideoIds)
  }
  
}
