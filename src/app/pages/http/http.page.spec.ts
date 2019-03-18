import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpPage } from './http.page';

describe('HttpPage', () => {
  let component: HttpPage;
  let fixture: ComponentFixture<HttpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
