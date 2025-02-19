import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthStore } from '@/app/core/auth-store';
import { InputTrimDirective } from '@/app/shared/input-trim.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    AutoFocusModule,
    InputTrimDirective,
    NgOptimizedImage,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  router = inject(Router);

  readonly authStore = inject(AuthStore);

  username = this.authStore.username;
  loggedIn = this.authStore.loggedIn;

  login = this.authStore.login;
  logout = this.authStore.logout;

  name = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    nonNullable: true,
  });
  profileFormGroup = new FormGroup({
    name: this.name,
  });

  redirectParam = injectQueryParams('redirect');

  submitProfile() {
    if (this.profileFormGroup.invalid) {
      /* trigger errors on submit
      - show validation errors on submit button click instead of disabling the button
      */
      this.profileFormGroup.markAllAsTouched();
      return;
    }
    this.login(this.profileFormGroup.value.name!);
    this.router.navigateByUrl(this.redirectParam() || '/dashboard');
    this.profileFormGroup.reset();
  }
}
