import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicMngComponent } from './pic-mng.component';

describe('PicMngComponent', () => {
  let component: PicMngComponent;
  let fixture: ComponentFixture<PicMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
