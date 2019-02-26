import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuComponent } from './view-menu.component';

describe('ViewMenuPage', () => {
  let component: ViewMenuComponent;
  let fixture: ComponentFixture<ViewMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
