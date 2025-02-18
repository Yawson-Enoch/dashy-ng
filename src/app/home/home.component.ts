import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthStore } from '@app/shared/auth-store';
import { InputTrimDirective } from '@app/shared/input-trim.directive';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
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

  submitProfile() {
    if (this.profileFormGroup.invalid) {
      /* trigger errors on submit
      - show validation errors on submit button click instead of disabling the button
      */
      this.profileFormGroup.markAllAsTouched();
      return;
    }
    this.login(this.profileFormGroup.value.name!);
    this.router.navigateByUrl('/dashboard');
    this.profileFormGroup.reset();
  }
}
