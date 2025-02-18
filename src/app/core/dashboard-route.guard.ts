import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthStore } from '@app/shared/auth-store';

export const dashboardRouteGuard: CanActivateChildFn = (_childRoute, state) => {
  const authService = inject(AuthStore);
  const router = inject(Router);

  if (authService.loggedIn()) {
    return true;
  }

  router.navigate(['/'], { queryParams: { redirect: state.url } });
  return false;
};
