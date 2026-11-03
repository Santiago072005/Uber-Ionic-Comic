import { TestBed } from '@angular/core/testing';
import { Uber } from './uber';

describe('Uber', () => {
  let service: Uber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Uber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
