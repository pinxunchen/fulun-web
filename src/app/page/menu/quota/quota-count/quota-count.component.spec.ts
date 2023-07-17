import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaCountComponent } from './quota-count.component';

describe('QuotaCountComponent', () => {
  let component: QuotaCountComponent;
  let fixture: ComponentFixture<QuotaCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotaCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotaCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
