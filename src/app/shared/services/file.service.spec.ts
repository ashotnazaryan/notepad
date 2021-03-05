import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.inject(FileService);
  });

  it('FileService should be created', () => {
    expect(service).toBeTruthy();
  });
});
