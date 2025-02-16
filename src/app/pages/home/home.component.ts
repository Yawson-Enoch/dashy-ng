import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTrimDirective } from '../../directives/input-trim.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    InputTrimDirective,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isLoggedIn = signal(false);
  testName = signal('');

  username = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    nonNullable: true,
  });
  profileForm = new FormGroup({
    username: this.username,
  });

  handleLogin() {
    this.isLoggedIn.set(true);
  }

  handleLogout() {
    this.isLoggedIn.set(false);
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      /* trigger errors on submit 
      - show validation errors on submit button click instead of disabling the button
      */
      this.profileForm.markAllAsTouched();
      return;
    }
    console.log(this.profileForm.value.username);
    this.testName.set(this.profileForm.value.username || 'Guest');
    this.handleLogin();
    this.profileForm.reset();
  }
}
