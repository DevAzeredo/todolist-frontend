import { Component, OnInit  } from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  changesMade: boolean = false;
tasks: Task[]=[];

tasksLoaded :boolean = false;
constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getTasksFromBackend();
  }
  getTasksFromBackend() {


    this.tasks =[ {
      "id": "65872e95a1b2e2026ea3d436",
      "title": "ALTEREI O NOME DESSA task",
      "description": "teste descricao 1",
      "completed": false
  }, {
    "id": "65872e95a1b2e2026ea3d436",
    "title": "ALTEREI O NOME DESSA task",
    "description": "teste descricao 1",
    "completed": false
}, {
  "id": "65872e95a1b2e2026ea3d436",
  "title": "ALTEREI O NOME DESSA task",
  "description": "teste descricao 1",
  "completed": false
}, {
  "id": "65872e95a1b2e2026ea3d436",
  "title": "ALTEREI O NOME DESSA task",
  "description": "teste descricao 1",
  "completed": false
}, {
  "id": "65872e95a1b2e2026ea3d436",
  "title": "ALTEREI O NOME DESSA task",
  "description": "teste descricao 1",
  "completed": false
}, {
  "id": "65872e95a1b2e2026ea3d436",
  "title": "ALTEREI O NOME DESSA task",
  "description": "teste descricao 1",
  "completed": false
}, {
  "id": "65872e95a1b2e2026ea3d436",
  "title": "ALTEREI O NOME DESSA task",
  "description": "teste descricao 1",
  "completed": false
},];
    /*this.http.get<Task[]>('http://localhost:3000/tasks').subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log(tasks);
        
      },
      error: (error) => {
        console.error('Erro ao obter tarefas do backend:', error);
      },
    });*/
    this.tasksLoaded = true;
  }
saveChanges() {
throw new Error('Method not implemented.');
}
}
