import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal('dark');

  switchTheme() {
    this.theme.update(val => val === 'dark' ? 'light' : 'dark');
  }
}
