import { Component, OnInit, Input, EventEmitter, Output, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnimate } from '../../animate/item.animate';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnimate
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClick: EventEmitter<any> = new EventEmitter();
  priority = 'out';
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.priority = 'in';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.priority = 'out';
  }
  onItemClick() {
    this.taskClick.emit();
  }
  onSelectTaskClick(ev: Event) {
    ev.stopPropagation();
  }
}
