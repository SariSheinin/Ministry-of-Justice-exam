import { Component, OnInit } from '@angular/core';
// import { Task } from '../services/task.service';
import { TaskService, Task } from '../services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {
     tasks: Task[] = [];
  taskForm: FormGroup;
  editTaskId: number | null = null; 

//    export class TaskGridComponent implements OnInit {

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: [''],
      dueBy: [''],
      isComplete: [false]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  startEdit(task: Task): void {
    this.editTaskId = task.id;
    this.taskForm.patchValue({
      title: task.title,
      dueBy: task.dueBy ? task.dueBy : '',
      isComplete: task.isComplete
    });
  }

  cancelEdit(): void {
    this.editTaskId = null;
    this.taskForm.reset({ title: '', dueBy: '', isComplete: false });
  }

  saveEdit(): void {
    if (this.editTaskId === null) return;

    const updatedTask: Task = this.taskForm.value;
    this.taskService.updateTask(this.editTaskId, updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === this.editTaskId);
      if (index !== -1) {
        const { id, ...rest } = updatedTask;
        this.tasks[index] = { id: this.editTaskId!, ...rest };
      }
      this.cancelEdit();
    });
  }

  addTask(): void {
    const newTask: Task = this.taskForm.value;
    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.taskForm.reset({ title: '', dueBy: '', isComplete: false });
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}