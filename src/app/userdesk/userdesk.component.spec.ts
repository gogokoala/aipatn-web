import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdeskComponent } from './userdesk.component';

describe('UserdeskComponent', () => {
  let component: UserdeskComponent;
  let fixture: ComponentFixture<UserdeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
