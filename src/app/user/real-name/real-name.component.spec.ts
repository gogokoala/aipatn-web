import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealNameComponent } from './real-name.component';

describe('RealNameComponent', () => {
  let component: RealNameComponent;
  let fixture: ComponentFixture<RealNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
