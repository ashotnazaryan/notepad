import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNotificationsComponent } from './notes-notifications.component';

describe('NotesNotificationsComponent', () => {
  let component: NotesNotificationsComponent;
  let fixture: ComponentFixture<NotesNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
