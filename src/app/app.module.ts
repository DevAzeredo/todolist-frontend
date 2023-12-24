// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
