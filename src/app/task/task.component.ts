import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TaskService } from './task.service';


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
  originalTasks: Task[] = [];
  newTasks: Task[] = [];
  deletedTask: Task[] = [];
  tasksLoaded: boolean = false;
  constructor(private http: HttpClient, private taskService: TaskService) {
  }


  ngOnInit() {
    this.getTasksFromBackend();
  }

  getTasksFromBackend() {
    this.taskService.getTasks().subscribe(
      {
        next: (tasks: Task[]) => {
          this.tasks = tasks
          this.originalTasks = [...tasks];
        },
        error: (error: any) => console.error('Erro ao carregar tarefas:', error),
      }
    );
  }

  saveChanges() {
    this.taskService.saveNewTasks(this.newTasks).subscribe({
      next: (newTasks: Task[]) => {
        this.tasks.push(...newTasks);
      },
      error: (error: any) => console.error('Erro ao salvar tarefas:', error),
    });
    this.newTasks = [];

    this.taskService.saveDeletedTasks(this.deletedTask).subscribe();
    this.deletedTask.forEach(deleted => {
      this.tasks = this.tasks.filter(task => task.id !== deleted.id);
    });
    this.taskService.saveModifiedTasks(this.tasks, this.originalTasks).subscribe();
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
