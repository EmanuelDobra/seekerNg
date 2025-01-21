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
import { MatTabsModule } from '@angular/material/tabs';
import { PdfExtractionService } from '../../services/pdf-extraction.service';

@Component({
  selector: 'app-rag-chat',
  imports: [MatTabsModule, FormsModule, NgClass, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MarkdownModule],
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
  file = signal('Please attach a file'); 
  questionType = signal('pdf');
  ragContext = signal('');

  // Services
  llmRequest = inject(LlmRequestService);
  themeService = inject(ThemeService);
  pdfExtractionService = inject(PdfExtractionService);

  ngOnInit(): void {
    this.getAiModel();
  }

  //#region Ask AI
  askPdfQuestion(question: string): void {
    this.isGeneratingAnswer.set(true);
    this.llmRequest.askPdfQuestion(question, this.pdf()).subscribe(res => {
      this.isGeneratingAnswer.set(false);
      this.chatResponse.set(res);
    });
  }

  // Ask rag question with uploaded file
  askCustomRagQuestion(question: string): void {
    this.isGeneratingAnswer.set(true);
    console.log(this.ragContext());
    this.llmRequest.askRagAnyQuestion(question, "text", this.pdf(), this.ragContext()).subscribe(res => {
      this.isGeneratingAnswer.set(false);
      this.chatResponse.set(res);
    });
  }

  getAiModel(): void {
    this.llmRequest.getAiModel().pipe(
      map(res => {
        this.modelName.set(res.data[0].id);
        this.hasFetchedModel.set(true);
      })
    ).subscribe();
  }
  //#endregion

  uploadFile(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.file.set(file.name);

      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result as string;
        // Append the new content to the existing signal value
        this.ragContext.set(this.ragContext() + '\n' + fileContent);
      };

      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  }

  async uploadPdf(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.pdf.set(file.name);
      try {
        const pdfContent = await this.pdfExtractionService.extractTextFromPdf(file);
        this.ragContext.set(this.ragContext() + '\n' + pdfContent);
        console.log(pdfContent);
      } catch (error) {
        console.error(error);
      }
    } 
  }
}
