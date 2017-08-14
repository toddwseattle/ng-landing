import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetsComponent } from './social-nets.component';

describe('SocialNetsComponent', () => {
  let component: SocialNetsComponent;
  let fixture: ComponentFixture<SocialNetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialNetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
