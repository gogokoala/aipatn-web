import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusnsMngComponent } from './busns-mng.component';

describe('BusnsMngComponent', () => {
  let component: BusnsMngComponent;
  let fixture: ComponentFixture<BusnsMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusnsMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusnsMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
