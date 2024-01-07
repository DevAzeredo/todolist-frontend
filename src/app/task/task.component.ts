import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { Observable, catchError, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/tasks';
  changesMade: boolean = false;
  tasks: Task[] = [];
  newTasks: Task[] = [];
  deletedTask: Task[] = [];
  tasksLoaded: boolean = false;
  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  ngOnInit() {
    this.getTasksFromBackend();
  }

  getTasksFromBackend() {
    this.getTasks().subscribe(
      {
        next: (tasks: Task[]) => this.tasks = tasks,
        error: (error: any) => console.error('Erro ao carregar tarefas:', error),
      }
    );
  }
  saveNewTasks(task: Task[]) {
    return this.http.post<Task[]>(`${this.apiUrl}`, task);
  }
  saveDeletedTasks(tasks: Task[]) {
    const deleteRequests = tasks.map((t) => this.http.delete<void>(`${this.apiUrl}/${t.id}`));
    return forkJoin(deleteRequests);
  }
  saveChanges() {
    this.saveNewTasks(this.newTasks).subscribe({
      next: (tasks: Task[]) => tasks,
      error: (error: any) => console.error('Erro ao salvar tarefas:', error),
    });
    this.saveDeletedTasks(this.deletedTask).subscribe();

  }
  createNewTask() {
    const newTask: Task = {
      description: "",
      completed: false,
      id: '',
    };
    this.newTasks.push(newTask);
  }

  isTaskDeleted(task: Task) {
    var index = this.deletedTask.indexOf(task);
    return index > -1;
  }

  toggleDeleteConfirmation(task: Task) {
    var index = this.deletedTask.indexOf(task);
    if (index !== -1) {
      this.deletedTask.splice(index, 1);
    }
    else {
      this.deletedTask.push(task);
    }
  }
}
