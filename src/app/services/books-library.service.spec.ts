import { TestBed } from '@angular/core/testing';

import { BooksLibraryService } from './books-library.service';

describe('BooksLibraryService', () => {
  let service: BooksLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
