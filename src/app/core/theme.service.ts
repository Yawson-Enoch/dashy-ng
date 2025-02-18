import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly defaultTheme = 'light';
  private readonly MEDIA = '(prefers-color-scheme: dark)';

  private getStoredTheme() {
    return localStorage.getItem(this.storageKey) || this.defaultTheme;
  }

  private getSystemTheme() {
    return window.matchMedia(this.MEDIA).matches ? 'dark' : 'light';
  }

  private applyTheme(newTheme: string) {
    const currentTheme =
      newTheme === 'system' ? this.getSystemTheme() : newTheme;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(currentTheme);
    root.style.colorScheme = currentTheme;
  }

  theme = signal(this.getStoredTheme());

  resolvedTheme = computed(() => {
    return this.theme() === 'system' ? this.getSystemTheme() : this.theme();
  });

  updateTheme(value: string) {
    localStorage.setItem(this.storageKey, value);
    this.theme.set(value);
  }

  constructor() {
    effect((onCleanup) => {
      /* local storage event handling */
      const handleStorage = (e: StorageEvent) => {
        if (e.key !== this.storageKey) {
          return;
        }

        if (!e.newValue) {
          this.theme.set(this.defaultTheme); // set default theme on localstorage deletion
        } else {
          this.theme.set(e.newValue);
        }
      };
      window.addEventListener('storage', handleStorage);

      /* media query event handling */
      const media = window.matchMedia(this.MEDIA);
      const handleMediaQuery = () => {
        if (this.theme() === 'system') {
          this.applyTheme('system');
        }
      };
      media.addEventListener('change', handleMediaQuery);

      /* run on theme changes */
      this.applyTheme(this.theme());

      onCleanup(() => {
        window.removeEventListener('storage', handleStorage);
        media.removeEventListener('change', handleMediaQuery);
      });
    });
  }
}
