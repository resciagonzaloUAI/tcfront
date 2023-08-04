import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresArticulosComponent } from './proveedores-articulos.component';

describe('NotaPedidoNewComponent', () => {
  let component: ProveedoresArticulosComponent;
  let fixture: ComponentFixture<ProveedoresArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedoresArticulosComponent],
    });
    fixture = TestBed.createComponent(ProveedoresArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
