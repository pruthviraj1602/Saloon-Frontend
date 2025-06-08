import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStylishComponent } from './edit-stylish.component';

describe('EditStylishComponent', () => {
  let component: EditStylishComponent;
  let fixture: ComponentFixture<EditStylishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStylishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStylishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
