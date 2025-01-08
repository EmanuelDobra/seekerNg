import { Component, inject, signal } from '@angular/core';
import { LlmRequestService } from '../../services/llm-request.service';
import { ThemeService } from '../../services/theme.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rag-chat',
  imports: [FormsModule, NgClass, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './rag-chat.component.html',
  styleUrl: './rag-chat.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RagChatComponent {
  // Signals
  title = signal('');
  hasTitle = signal(false);
  userQuestion = signal('');
  chatResponse = signal('');
  pdf = signal('default.pdf'); // need to fetch from seekerPy instead

  // Services
  llmRequest = inject(LlmRequestService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.getAiModel();
  }

  askQuestion(question: string): void {
    this.llmRequest.askQuestion(question).subscribe(res => this.chatResponse.set(res));
  }

  attachPdf(pdfName: string = "not-yet-implemented.pdf :("): void {
    this.pdf.set(pdfName);
  }

  getAiModel(): void {
    this.llmRequest.getAiModel().pipe(
      map(res => {
        this.title.set(res.data[0].id);
        this.hasTitle.set(true);
      })
    ).subscribe();
  }
}
