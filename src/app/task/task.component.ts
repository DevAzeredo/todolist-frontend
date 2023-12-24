import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';
import { TaskService } from './task.service';


@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent implements OnInit {
  
    constructor(private taskService: TaskService) {}

    private loadTasks() {
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          // Aqui você pode realizar outras ações após obter as tarefas, se necessário.
        },
        error: (error) => {
          console.error('Erro ao obter tarefas:', error);
        }
      });
    }

  ngOnInit() {
    this.loadTasks();
  }
  tasks: Task[] = [];
  changesMade = true;

  saveChanges() {
    this.changesMade = false;
  }
}
