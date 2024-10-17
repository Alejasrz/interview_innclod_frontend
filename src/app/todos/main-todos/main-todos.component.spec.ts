import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTodosComponent } from './main-todos.component';

describe('MainTodosComponent', () => {
  let component: MainTodosComponent;
  let fixture: ComponentFixture<MainTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
