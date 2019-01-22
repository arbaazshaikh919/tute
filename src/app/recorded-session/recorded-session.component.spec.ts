import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedSessionComponent } from './recorded-session.component';

describe('RecordedSessionComponent', () => {
  let component: RecordedSessionComponent;
  let fixture: ComponentFixture<RecordedSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordedSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
