import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly defaultTheme = 'dark';

  private getStoredTheme() {
    return localStorage.getItem(this.storageKey) || this.defaultTheme;
  }

  private getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  theme = signal(this.getStoredTheme());

  resolvedTheme = computed(() => {
    return this.theme() === 'system' ? this.getSystemTheme() : this.theme();
  });

  handleTheme(value: string) {
    localStorage.setItem(this.storageKey, value);
    this.theme.set(value);
  }

  constructor() {
    effect(() => {
      const root = window.document.documentElement;

      root.classList.remove('light', 'dark');

      if (this.theme() === 'system') {
        const systemTheme = this.getSystemTheme();

        /* class not set directly with `.className` to prevent other non-theme class overrides 
        - also theme classes are removed before adding to prevent duplicates
        */
        root.classList.add(systemTheme);
        root.style.colorScheme = systemTheme;
        return;
      }

      root.classList.add(this.theme());
      root.style.colorScheme = this.theme();
    });
  }
}
