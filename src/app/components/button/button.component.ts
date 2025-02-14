import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Sun, Moon, LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [ButtonModule, LucideAngularModule],
})
export class ButtonComponent {
  /* using lucide icons with standalone components
  - github.com/lucide-icons/lucide/issues/2097#issuecomment-2069657727
  */
  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;

  themeService = inject(ThemeService);
}
