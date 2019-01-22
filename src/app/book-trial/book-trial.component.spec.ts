import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTrialComponent } from './book-trial.component';

describe('BookTrialComponent', () => {
  let component: BookTrialComponent;
  let fixture: ComponentFixture<BookTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
