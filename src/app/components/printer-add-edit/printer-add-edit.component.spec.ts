import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterAddEditComponent } from './printer-add-edit.component';

describe('PrinterAddEditComponent', () => {
  let component: PrinterAddEditComponent;
  let fixture: ComponentFixture<PrinterAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrinterAddEditComponent]
    });
    fixture = TestBed.createComponent(PrinterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
