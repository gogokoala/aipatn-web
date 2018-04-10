import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPowerEditorComponent } from './account-power-editor.component';

describe('AccountPowerEditorComponent', () => {
  let component: AccountPowerEditorComponent;
  let fixture: ComponentFixture<AccountPowerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPowerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPowerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
