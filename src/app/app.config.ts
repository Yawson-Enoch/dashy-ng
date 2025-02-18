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
import { Title } from '@angular/platform-browser';
import { ThemeService } from './core/theme.service';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

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

/* theme preset */
const ThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      '50': '#f5f5f6',
      '100': '#e6e6e7',
      '200': '#cfcfd2',
      '300': '#adadb3',
      '400': '#84848c',
      '500': '#71717a',
      '600': '#5a5a60',
      '700': '#4d4c52',
      '800': '#434347',
      '900': '#3c3b3e',
      '950': '#252527',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#000000',
          hoverColor: '{primary.950}',
          activeColor: '{primary.900}',
        },
      },
      dark: {
        primary: {
          color: '#ffffff',
          hoverColor: '{primary.50}',
          activeColor: '{primary.100}',
        },
      },
    },
  },
});

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
