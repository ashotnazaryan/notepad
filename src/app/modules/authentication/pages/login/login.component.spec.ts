import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSnackBarModule,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {}),
        TranslateModule.forRoot(),
        MatSnackBarModule
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {}
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });
});
