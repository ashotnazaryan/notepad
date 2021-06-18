import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { SharedModule } from '@shared/shared.module';
import { GroceryDialogComponent } from './grocery-dialog.component';

// TODO move to the shared mock
export class MatDialogMock {
  open(): { afterClosed: () => Observable<{ action: boolean }> } {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('GroceryDialogComponent', () => {
  let component: GroceryDialogComponent;
  let fixture: ComponentFixture<GroceryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({}, {}),
        TranslateModule.forRoot()
      ],
      declarations: [GroceryDialogComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create grocery-dialog component', () => {
    expect(component).toBeTruthy();
  });
});
