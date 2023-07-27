import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoComponent } from './remito.component';

describe('RemitoComponent', () => {
  let component: RemitoComponent;
  let fixture: ComponentFixture<RemitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemitoComponent]
    });
    fixture = TestBed.createComponent(RemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
