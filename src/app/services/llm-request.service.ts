import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PdfQuestion } from '../interfaces/pdf-question';

@Injectable({
  providedIn: 'root'
})
export class LlmRequestService {
  readonly QUESTION_API: Signal<string> = signal('http://127.0.0.1:8000/api/rag/completions'); 
  readonly MODEL_ENDPOINT: Signal<string> = signal('http://localhost:1234/v1/models');
  readonly API_KEY: Signal<string> = signal('');

  httpClient = inject(HttpClient);

  askQuestion(question: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    });
  
    const body: PdfQuestion = {
      question: question,
      pdf: 'quotes.pdf',
    };
  
    return this.httpClient.post(this.QUESTION_API(), body, { headers });
  }

  askPdfQuestion(question: any, pdf: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    });
  
    const body: PdfQuestion = {
      question: question,
      pdf: pdf,
    };
  
    return this.httpClient.post(this.QUESTION_API(), body, { headers });
  }

  getAiModel(): Observable<any> {
    return this.httpClient.get(this.MODEL_ENDPOINT());
  }
}
