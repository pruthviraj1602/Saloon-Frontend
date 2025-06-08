import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylishMainComponent } from './stylish-main.component';

describe('StylishMainComponent', () => {
  let component: StylishMainComponent;
  let fixture: ComponentFixture<StylishMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylishMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylishMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
