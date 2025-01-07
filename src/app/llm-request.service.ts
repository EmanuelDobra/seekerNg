import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmRequestService {
  readonly API_ENDPOINT: Signal<string> = signal('http://localhost:1234/v1/chat/completions'); 
  readonly API_KEY: Signal<string> = signal('');

  httpClient = inject(HttpClient);

  getChatCompletion(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(this.API_ENDPOINT(), data, { headers });
  }
}
