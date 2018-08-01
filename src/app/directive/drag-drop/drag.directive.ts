import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDrag][appDragTag][appDragData][appDragClass]'
})
export class DragDirective {
  private _isDraggable = false;
  @Input('appDrag')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggable() {
    return this._isDraggable;
  }
  @Input() appDragClass: string;
  @Input() appDragTag: string;
  @Input() appDragData: any;

  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) { }
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.appDragClass);
      this.service.setDragData({ tag: this.appDragTag, data: this.appDragData });
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.appDragClass);
    }
  }
}
