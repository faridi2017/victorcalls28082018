import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemptestComponent } from './temptest.component';

describe('TemptestComponent', () => {
  let component: TemptestComponent;
  let fixture: ComponentFixture<TemptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
