import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylaterComponent } from './paylater.component';

describe('PaylaterComponent', () => {
  let component: PaylaterComponent;
  let fixture: ComponentFixture<PaylaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaylaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
