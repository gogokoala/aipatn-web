import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemngrComponent } from './filemngr.component';

describe('FilemngrComponent', () => {
  let component: FilemngrComponent;
  let fixture: ComponentFixture<FilemngrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemngrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemngrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
