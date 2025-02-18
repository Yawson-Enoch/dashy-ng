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
import { AuthStore } from '@app/shared/auth-store';

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
  router = inject(Router);

  readonly store = inject(AuthStore);

  logout(dialog = false) {
    this.store.logout();
    this.router.navigateByUrl('/');

    if (dialog) {
      this.toggleDrawer();
    }
  }

  isSidebarCollapsed = signal(false);

  toggleSidebar() {
    this.isSidebarCollapsed.update((value) => !value);
  }

  isDrawerOpen = signal(false);

  toggleDrawer() {
    this.isDrawerOpen.update((value) => !value);
  }

  /* using lucide icons with standalone components
  - github.com/lucide-icons/lucide/issues/2097#issuecomment-2069657727
  */
  SunIcon = Sun;
  MoonIcon = Moon;
  PanelLeftCloseIcon = PanelLeftClose;
  PanelRightCloseIcon = PanelRightClose;
  GaugeIcon = Gauge;
  ListTodoIcon = ListTodo;
  LogOutIcon = LogOut;

  @ViewChild('op') op!: Popover;

  togglePopover(event: MouseEvent) {
    this.op.toggle(event);
  }

  readonly themeService = inject(ThemeService);

  resolvedTheme = this.themeService.resolvedTheme;

  updateTheme(theme: string) {
    this.themeService.handleTheme(theme);
    this.op.hide();
  }

  themes = ['light', 'dark', 'system'];

  links = [
    { to: '.', label: 'Dashboard', icon: this.GaugeIcon, exact: true },
    {
      to: 'tasks',
      label: 'Tasks',
      icon: this.ListTodoIcon,
    },
  ];
}
