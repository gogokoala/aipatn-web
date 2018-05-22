import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkMngComponent } from './link-mng.component';

describe('LinkMngComponent', () => {
  let component: LinkMngComponent;
  let fixture: ComponentFixture<LinkMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
