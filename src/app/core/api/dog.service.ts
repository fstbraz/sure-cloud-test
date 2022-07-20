import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dog } from './interfaces/dog';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  constructor(private httpClient: HttpClient) {}

  getImage(): Observable<Dog> {
    return this.httpClient
      .get(`${environment.API_URL}/breeds/image/random`)
      .pipe(
        map((response: any) => {
          return {
            link: response.message,
            date: new Date().toLocaleDateString('en-GB'),
            time: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
        })
      );
  }
}
