import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraRespuestaComponent } from './orden-compra-respuesta.component';

describe('OrdenCompraNewComponent', () => {
  let component: OrdenCompraRespuestaComponent;
  let fixture: ComponentFixture<OrdenCompraRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraRespuestaComponent],
    });
    fixture = TestBed.createComponent(OrdenCompraRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
