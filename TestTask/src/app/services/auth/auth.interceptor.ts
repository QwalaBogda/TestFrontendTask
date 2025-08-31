import { HttpInterceptorFn } from '@angular/common/http';
import { AuthStore } from './store/auth.store';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);
  const token = auth.getToken();

  if (token) {
    const clone = req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
    return next(clone);
  }
  return next(req);
};