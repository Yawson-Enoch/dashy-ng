import { NgClass } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ThemeService } from '@app/services/theme.service';
import {
  Gauge,
  ListTodo,
  LogOut,
  LucideAngularModule,
  Moon,
  PanelLeftClose,
  PanelRightClose,
  Sun,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-dashboard-route',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
    ButtonModule,
    PopoverModule,
    DrawerModule,
    LucideAngularModule,
  ],
  templateUrl: './dashboard-route.component.html',
})
export class DashboardRouteComponent {
  isSidebarCollapsed = signal(false);

  handleSidebarToggle() {
    this.isSidebarCollapsed.update((value) => !value);
  }

  isDrawerOpen: boolean = false;

  /* using lucide icons with standalone components
  - github.com/lucide-icons/lucide/issues/2097#issuecomment-2069657727
  */
  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;
  protected readonly PanelLeftCloseIcon = PanelLeftClose;
  protected readonly PanelRightCloseIcon = PanelRightClose;
  protected readonly GaugeIcon = Gauge;
  protected readonly ListTodoIcon = ListTodo;
  protected readonly LogOutIcon = LogOut;

  @ViewChild('op') op!: Popover;

  toggle(event: MouseEvent) {
    this.op.toggle(event);
  }

  private router = inject(Router);

  navigateToHome() {
    this.router.navigate(['']);
  }

  private themeService = inject(ThemeService);

  resolvedTheme = this.themeService.resolvedTheme;

  handleTheme(theme: string) {
    this.themeService.handleTheme(theme);
    this.op.hide();
  }
}
