import { HttpClient } from "@angular/common/http";
import { Task } from "../../shared/interfaces/task.interface";
import { Observable, forkJoin } from "rxjs";

export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks';
    constructor(private http: HttpClient) {}
    
  saveNewTasks(task: Task[]) {
    return this.http.post<Task[]>(`${this.apiUrl}`, task);
  }
  
  saveDeletedTasks(tasks: Task[]) {
    const deleteRequests = tasks.map((t) => this.http.delete<void>(`${this.apiUrl}/${t.id}`));
    return forkJoin(deleteRequests);
  }
  
  saveModifiedTasks(tasks:Task[], originalTasks:Task[]){
    const modifiedTasks = tasks.filter(
      (task, index) =>
        task.description !== originalTasks[index].description ||
        task.completed !== originalTasks[index].completed
    );
    return this.http.post<Task[]>(`${this.apiUrl}`, modifiedTasks);
  }
  
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }
}