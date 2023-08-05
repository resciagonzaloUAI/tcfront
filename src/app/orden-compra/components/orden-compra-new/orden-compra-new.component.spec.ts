import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraNewComponent } from './orden-compra-new.component';

describe('OrdenCompraNewComponent', () => {
  let component: OrdenCompraNewComponent;
  let fixture: ComponentFixture<OrdenCompraNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraNewComponent]
    });
    fixture = TestBed.createComponent(OrdenCompraNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
