import { TestBed } from '@angular/core/testing';
import { CanActivate, CanActivateFn } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { AuthGuard } from './auth.guard';

// describe('AuthGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => new AuthGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
  });

  it('should be created', () => {
    const guard: CanActivate = TestBed.inject(AuthGuard);
    expect(guard).toBeTruthy();
  });
});
