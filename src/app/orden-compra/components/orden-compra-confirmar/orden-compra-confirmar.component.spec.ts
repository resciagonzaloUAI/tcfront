import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraComfirmarComponent } from './orden-compra-confirmar.component';

describe('OrdenCompraComponent', () => {
  let component: OrdenCompraComfirmarComponent;
  let fixture: ComponentFixture<OrdenCompraComfirmarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraComfirmarComponent],
    });
    fixture = TestBed.createComponent(OrdenCompraComfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
