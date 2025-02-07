import { TestBed } from '@angular/core/testing';

import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers correctly', () => {
    const result = service.add(2, 3);
    expect(result).toBe(5);
  });

  it('should return a negative number when adding a positive and a negative number', () => {
    const result = service.add(5, -3);
    expect(result).toBe(2);
  });

  it('should return zero when adding zero and zero', () => {
    const result = service.add(0, 0);
    expect(result).toBe(0);
  });
});
