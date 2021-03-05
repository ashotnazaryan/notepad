import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { NotesNotificationsComponent } from './notes-notifications.component';

describe('NotesNotificationsComponent', () => {
  let component: NotesNotificationsComponent;
  let fixture: ComponentFixture<NotesNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}, {})],
      declarations: [NotesNotificationsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create notes-notifications component', () => {
    expect(component).toBeTruthy();
  });
});
