import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaPedidoNewComponent } from './nota-pedido-new.component';

describe('NotaPedidoNewComponent', () => {
  let component: NotaPedidoNewComponent;
  let fixture: ComponentFixture<NotaPedidoNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaPedidoNewComponent]
    });
    fixture = TestBed.createComponent(NotaPedidoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
