import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  tasksLoaded: boolean = false;
  constructor( private http: HttpClient) {
  }

  createTasks(tasks: Task[]): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.apiUrl}`, tasks);
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

  saveChanges() {

  }
  createNewTask() {
    const newTask: Task = {
      description: "",
      completed: false,
      id: "",
      title: "",
      confirmDelete: false,
    };
    this.newTasks.push(newTask);
  }
  deleteTask(task: Task) {
    const index = this.newTasks.indexOf(task);
    if (index !== -1) {
      this.newTasks.splice(index, 1);
    }
  }
  toggleDeleteConfirmation(task: Task) {
    if (task.intentionDelete) {
      task.confirmDelete = !task.confirmDelete;
    }
    if (task.confirmDelete) {
      console.log('1');
      this.deleteTask(task);
    }
    task.intentionDelete = !task.intentionDelete;
  }

}
