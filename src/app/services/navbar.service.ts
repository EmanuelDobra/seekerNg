import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  component = signal('rag-chat');
  componentName = computed(() => {
    return this.component() === 'rss-feed' ? 'RSS Feed' : this.component() === 'rag-chat' ? 'RAG Chat' : 'Home';
  });

  switchPage(selected: string) {
    this.component.set(selected);
  }
}
