import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaSearchComponent } from './quota-search.component';

describe('QuotaSearchComponent', () => {
  let component: QuotaSearchComponent;
  let fixture: ComponentFixture<QuotaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotaSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
