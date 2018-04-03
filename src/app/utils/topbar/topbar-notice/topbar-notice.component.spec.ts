import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarNoticeComponent } from './topbar-notice.component';

describe('TopbarNoticeComponent', () => {
  let component: TopbarNoticeComponent;
  let fixture: ComponentFixture<TopbarNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
