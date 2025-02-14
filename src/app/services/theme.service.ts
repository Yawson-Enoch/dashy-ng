import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly defaultTheme = 'dark';

  private storedTheme() {
    return localStorage.getItem(this.storageKey) || this.defaultTheme;
  }

  theme = signal(this.storedTheme());

  handleTheme(value: string) {
    localStorage.setItem(this.storageKey, value);
    this.theme.set(value);
  }

  constructor() {
    effect(() => {
      const root = window.document.documentElement;

      root.classList.remove('light', 'dark');

      if (this.theme() === 'system') {
        const resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';

        root.classList.add(resolvedTheme);
        return;
      }

      root.classList.add(this.theme());
    });
  }
}
