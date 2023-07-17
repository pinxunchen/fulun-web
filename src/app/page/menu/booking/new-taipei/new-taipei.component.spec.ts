import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaipeiComponent } from './new-taipei.component';

describe('NewTaipeiComponent', () => {
  let component: NewTaipeiComponent;
  let fixture: ComponentFixture<NewTaipeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaipeiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaipeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
