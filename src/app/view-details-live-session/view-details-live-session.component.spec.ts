import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsLiveSessionComponent } from './view-details-live-session.component';

describe('ViewDetailsLiveSessionComponent', () => {
  let component: ViewDetailsLiveSessionComponent;
  let fixture: ComponentFixture<ViewDetailsLiveSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsLiveSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsLiveSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
