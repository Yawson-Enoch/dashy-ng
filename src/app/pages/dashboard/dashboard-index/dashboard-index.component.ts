import { Component } from '@angular/core';
import { ListChecks, ListTodo, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-index',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-index.component.html',
})
export class DashboardIndexComponent {
  protected readonly ListTodoIcon = ListTodo;
  protected readonly ListChecksIcon = ListChecks;
}
