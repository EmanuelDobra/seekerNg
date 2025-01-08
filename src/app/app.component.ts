import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';
import { RagChatComponent } from "./components/rag-chat/rag-chat.component";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  imports: [RagChatComponent, NavbarComponent, FormsModule, RagChatComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  themeService = inject(ThemeService);
  navbarService = inject(NavbarService);
}
