// import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';

import { PaperComponent } from './paper.component';

describe('PaperComponent', () => {
  let component: PaperComponent;
  let fixture: ComponentFixture<PaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [PaperComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create paper component', () => {
    expect(component).toBeTruthy();
  });
});
