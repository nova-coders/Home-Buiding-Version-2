import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconfirmComponent } from './modalconfirm.component';

describe('ModalconfirmComponent', () => {
  let component: ModalconfirmComponent;
  let fixture: ComponentFixture<ModalconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalconfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
