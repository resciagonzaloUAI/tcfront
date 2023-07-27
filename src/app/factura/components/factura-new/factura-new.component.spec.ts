import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaNewComponent } from './factura-new.component';

describe('FacturaNewComponent', () => {
  let component: FacturaNewComponent;
  let fixture: ComponentFixture<FacturaNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaNewComponent]
    });
    fixture = TestBed.createComponent(FacturaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
