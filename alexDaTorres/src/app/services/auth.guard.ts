// auth.guard.ts - Guard per proteggere le rotte
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  // Controllo di accesso per attivare la rotta
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkUserAuthentication(state.url);
  }

  // Controllo di accesso per caricare il modulo (lazy load)
  canLoad(route: Route | any): Observable<boolean> {
    return this.checkUserAuthentication(route.path);
  }

  // Funzione centrale per verificare l'autenticazione dell'utente
  private checkUserAuthentication(redirectUrl: string): Observable<boolean> {
    return this.authService.getUser().pipe(
      take(1),
      map(user => !!user),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Reindirizza l'utente al login con un messaggio e un returnUrl
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: redirectUrl } });
        }
      })
    );
  }
}
