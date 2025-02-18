import { Component, inject } from '@angular/core';
import { TasksStore } from '@app/core/tasks-store';
import { ListChecks, ListTodo, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-index',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-index.component.html',
})
export class DashboardIndexComponent {
  readonly tasksStore = inject(TasksStore);

  totalTasks = this.tasksStore.totalTasks;
  totalCompletedTasks = this.tasksStore.totalCompletedTasks;

  ListTodoIcon = ListTodo;
  ListChecksIcon = ListChecks;
}
