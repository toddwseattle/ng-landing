import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivergentComponent } from './divergent.component';

describe('DivergentComponent', () => {
  let component: DivergentComponent;
  let fixture: ComponentFixture<DivergentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivergentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivergentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
