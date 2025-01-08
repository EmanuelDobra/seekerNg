import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmRequestService {
  readonly RAG_ENDPOINT: Signal<string> = signal('http://127.0.0.1:8000/api/rag/completions'); 
  readonly MODEL_ENDPOINT: Signal<string> = signal('http://localhost:1234/v1/models');
  readonly API_KEY: Signal<string> = signal('');

  httpClient = inject(HttpClient);

  askQuestion(questionz: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    });
  
    const body = {
      text: questionz,
    };
  
    return this.httpClient.post(this.RAG_ENDPOINT(), body, { headers });
  }

  getAiModel(): Observable<any> {
    return this.httpClient.get(this.MODEL_ENDPOINT());
  }
}
