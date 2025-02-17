import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule, Pencil, Plus, Trash } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

interface TaskForm {
  title: FormControl<string>;
  description?: FormControl<string>;
}

@Component({
  selector: 'app-dashboard-tasks',
  imports: [
    LucideAngularModule,
    NgClass,
    ButtonModule,
    Checkbox,
    ReactiveFormsModule,
    FormsModule,
    Dialog,
    InputTextModule,
  ],
  templateUrl: './dashboard-tasks.component.html',
})
export class DashboardTasksComponent {
  editingTask = signal(false);

  toggleEditingTask() {
    this.editingTask.update((value) => !value);
  }

  /* lucide icons */
  TrashIcon = Trash;
  PencilIcon = Pencil;
  PlusIcon = Plus;

  /* handle primeng dialog state */
  dialogVisible: boolean = false;

  showDialog() {
    this.dialogVisible = true;
  }

  /* dialog form */
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
    nonNullable: true,
  });
  description = new FormControl('', {
    validators: [Validators.minLength(2)],
    nonNullable: true,
  });

  taskForm = new FormGroup<TaskForm>({
    title: this.title,
    description: this.description,
  });

  submitTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    console.log(this.taskForm.value);
    this.dialogVisible = false;
    this.taskForm.reset();
  }
}
