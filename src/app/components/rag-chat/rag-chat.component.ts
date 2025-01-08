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

@Component({
  selector: 'app-rag-chat',
  imports: [FormsModule, NgClass, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './rag-chat.component.html',
  styleUrl: './rag-chat.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RagChatComponent {
  // Signals
  title = signal('seekerNg');
  hasTitle = signal(false);
  userQuestion = signal('');

  // Services
  llmRequest = inject(LlmRequestService);
  themeService = inject(ThemeService);

  askQuestion(question: string): void {
    console.log("Asking Question... " + question);
    this.llmRequest.askQuestion(question).subscribe(res => this.title.set(res));
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
