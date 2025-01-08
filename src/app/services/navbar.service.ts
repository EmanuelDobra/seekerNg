import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  component = signal('home');

  switchPage(selected: string) {
    this.component.set(selected);
  }
}
