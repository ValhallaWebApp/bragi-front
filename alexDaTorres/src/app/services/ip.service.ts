import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor(private http: HttpClient) {}

  // Utilizzando ipify per ottenere l'indirizzo IP
  getIp(): Observable<string> {
    return this.http.get('https://api.ipify.org?format=json').pipe(
      map((response: any) => response.ip)
    );
  }

  // Utilizzando ip-api per ottenere l'indirizzo IP e altre informazioni
  getGeoInfo(): Observable<any> {
    return this.http.get('http://ip-api.com/json');
  }
}
