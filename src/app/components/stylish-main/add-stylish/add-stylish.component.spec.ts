import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStylishComponent } from './add-stylish.component';

describe('AddStylishComponent', () => {
  let component: AddStylishComponent;
  let fixture: ComponentFixture<AddStylishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStylishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStylishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
