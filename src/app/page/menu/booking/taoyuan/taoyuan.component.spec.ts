import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoyuanComponent } from './taoyuan.component';

describe('TaoyuanComponent', () => {
  let component: TaoyuanComponent;
  let fixture: ComponentFixture<TaoyuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoyuanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoyuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
