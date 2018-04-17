import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncMngComponent } from './func-mng.component';

describe('FuncMngComponent', () => {
  let component: FuncMngComponent;
  let fixture: ComponentFixture<FuncMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
