import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs/operators';

export const httpSpinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const spinnerService = inject(SpinnerService);

  spinnerService.showSpinner();

  return next(req).pipe(
    finalize(() => spinnerService.hideSpinner()) // Hide the spinner after the request is complete
  );
};
