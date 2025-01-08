import { signal, Component, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LlmRequestService } from './llm-request.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = signal('seekerNg');
  hasTitle = signal(false);
  userQuestion = signal('');

  llmRequest = inject(LlmRequestService);

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
