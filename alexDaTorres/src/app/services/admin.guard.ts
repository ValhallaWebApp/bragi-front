import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkIfAdmin();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkIfAdmin();
  }

  private checkIfAdmin(): Observable<boolean> {
    return this.authService.getUserRole().pipe(
      take(1),
      map((role) => {
        if (role === 'admin') {
          return true; // Allow access for admins
        } else {
          this.router.navigate(['/']); // Redirect to an unauthorized page or home
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}
