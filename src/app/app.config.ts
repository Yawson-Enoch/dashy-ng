import {
  ApplicationConfig,
  inject,
  Injectable,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import ThemePreset from '../theme-preset';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

/* title template */
@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} | Dashy Ng`);
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    provideAppInitializer(() => {
      inject(ThemeService);
    }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ThemePreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'components',
          },
        },
      },
    }),
  ],
};
