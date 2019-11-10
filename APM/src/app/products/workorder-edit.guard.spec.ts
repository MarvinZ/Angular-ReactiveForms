import { TestBed, async, inject } from '@angular/core/testing';

import { WorkorderEditGuard } from './workorder-edit.guard';

describe('WorkorderEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkorderEditGuard]
    });
  });

  it('should ...', inject([WorkorderEditGuard], (guard: WorkorderEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
