import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = '';
  @Output() newTask = new EventEmitter();
  @Output() editList = new EventEmitter();
  @Output() moveList = new EventEmitter();
  @Output() delList = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onNewTaskClick() {
    this.newTask.emit();
  }
  onEditListClick() {
    this.editList.emit();
  }
  onMoveListClick() {
    this.moveList.emit();
  }
  onDelListClick() {
    this.delList.emit();
  }
}
