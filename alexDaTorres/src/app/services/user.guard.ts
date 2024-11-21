import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkIfClient();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkIfClient();
  }

  private checkIfClient(): Observable<boolean> {
    return this.authService.getUserRole().pipe(
      take(1),
      map((role) => {
        if (role === 'client' || role=='admin') {
          return true; // Allow access for clients
        } else {
          this.router.navigate(['/']); // Redirect to unauthorized page or admin dashboard
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
