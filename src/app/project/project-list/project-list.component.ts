import { Component, OnInit, Input, Output, EventEmitter, HostListener, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { cardAnimate } from '../../animate/card.animate';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    cardAnimate
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @Input() item;
  @Output() onInvite: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDel: EventEmitter<any> = new EventEmitter();
  @HostBinding('@card') state = 'out';
  constructor() { }

  ngOnInit() {
  }

  // @HostListener('mouseenter', ['$event.target'])
  // onMouserEnter(btn) {
  //   this.cardState = 'in';
  //   console.log(btn);
  // }
  // @HostListener('mouseleave', ['$event.target'])
  // onMouserLeave(btn) {
  //   this.cardState = 'out';
  //   console.log(btn);
  // }
  @HostListener('mouseenter')
  onMouserEnter(btn) {
    this.state = 'in';
  }
  @HostListener('mouseleave')
  onMouserLeave(btn) {
    this.state = 'out';
  }

  onInviteClick() {
    this.onInvite.emit();
  }
  onEditClick() {
    this.onEdit.emit();
  }
  onDelClick() {
    this.onDel.emit();
  }
}
