import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryDialogComponent } from './grocery-dialog.component';

describe('GroceryDialogComponent', () => {
  let component: GroceryDialogComponent;
  let fixture: ComponentFixture<GroceryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
