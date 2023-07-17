import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaipeiComponent } from './taipei.component';

describe('TaipeiComponent', () => {
  let component: TaipeiComponent;
  let fixture: ComponentFixture<TaipeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaipeiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaipeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
