import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { GroceryNotificationsComponent } from './grocery-notifications.component';

describe('GroceryNotificationsComponent', () => {
  let component: GroceryNotificationsComponent;
  let fixture: ComponentFixture<GroceryNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}, {})],
      declarations: [GroceryNotificationsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create grocery-notifications component', () => {
    expect(component).toBeTruthy();
  });
});
