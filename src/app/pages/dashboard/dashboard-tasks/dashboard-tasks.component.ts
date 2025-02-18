import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@app/shared/auth-store';
import { TasksStore } from '@app/shared/tasks-store';
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
  readonly authStore = inject(AuthStore);

  username = this.authStore.username;

  /* handle primeng dialog state */
  dialogVisible: boolean = false;

  showDialog() {
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
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

  readonly tasksStore = inject(TasksStore);

  tasks = this.tasksStore.tasks;
  editDetails = this.tasksStore.editDetails;

  showAddForm() {
    this.taskForm.reset({
      title: this.editDetails()?.title,
      description: this.editDetails()?.description,
    });
    this.showDialog();
  }

  showEditForm(id: string) {
    this.tasksStore.editTask(id);
    this.taskForm.reset({
      title: this.editDetails()?.title,
      description: this.editDetails()?.description,
    });
    this.showDialog();
  }

  deleteTask = this.tasksStore.deleteTask;
  toggleCompleted = this.tasksStore.toggleCompleted;
  resetEditState = this.tasksStore.resetEditState;

  addTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const values = this.taskForm.value;

    if (this.editDetails()) {
      this.tasksStore.updateTask(
        this.editDetails()!.id,
        values.title!,
        values.description!
      );
    } else {
      this.tasksStore.addTask(values.title!, values.description!);
      this.taskForm.reset();
    }

    this.hideDialog();
  }

  /* lucide icons */
  TrashIcon = Trash;
  PencilIcon = Pencil;
  PlusIcon = Plus;
}
