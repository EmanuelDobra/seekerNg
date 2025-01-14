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
import { provideMarkdown } from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-rag-chat',
  imports: [FormsModule, NgClass, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MarkdownModule],
  templateUrl: './rag-chat.component.html',
  styleUrl: './rag-chat.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideMarkdown()]
})
export class RagChatComponent {
  // Signals
  modelName = signal(''); // 
  hasFetchedModel = signal(false);
  userQuestion = signal(''); 
  chatResponse = signal('');
  isGeneratingAnswer = signal(false); // are we in the process of fetching AI response?
  pdf = signal('default.pdf'); // TODO: need to fetch from seekerPy instead

  // Give me 5 quotes regarding prayer in the text. Then make a conclusion based on those. Use Markdown please.

  // Services
  llmRequest = inject(LlmRequestService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.getAiModel();
  }

  askQuestion(question: string): void {
    this.isGeneratingAnswer.set(true);
    this.llmRequest.askQuestion(question).subscribe(res => {
      this.isGeneratingAnswer.set(false);
      this.chatResponse.set(res);
    });
  }

  askPdfQuestion(question: string): void {
    this.isGeneratingAnswer.set(true);
    this.llmRequest.askPdfQuestion(question, this.pdf()).subscribe(res => {
      this.isGeneratingAnswer.set(false);
      this.chatResponse.set(res);
    });
  }

  attachPdf(pdfName: string = "ethosCA.pdf"): void {
    if (this.pdf() === 'default.pdf') {
      this.pdf.set('ethosCA.pdf');
    } else {
      this.pdf.set('default.pdf');
    }
    // this.pdf.set(pdfName);
  }

  getAiModel(): void {
    this.llmRequest.getAiModel().pipe(
      map(res => {
        this.modelName.set(res.data[0].id);
        this.hasFetchedModel.set(true);
      })
    ).subscribe();
  }
}
