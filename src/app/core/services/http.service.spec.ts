import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BaseHttpService } from './http.service';

describe('BaseHttpService', () => {
  let service: BaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(BaseHttpService);
  });

  it('BaseHttpService should be created', () => {
    expect(service).toBeTruthy();
  });
});
