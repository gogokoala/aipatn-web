import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMngComponent } from './roles-mng.component';

describe('RolesMngComponent', () => {
  let component: RolesMngComponent;
  let fixture: ComponentFixture<RolesMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
