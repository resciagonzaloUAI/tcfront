import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaPedidoComponent } from './nota-pedido.component';

describe('NotaPedidoComponent', () => {
  let component: NotaPedidoComponent;
  let fixture: ComponentFixture<NotaPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaPedidoComponent]
    });
    fixture = TestBed.createComponent(NotaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
