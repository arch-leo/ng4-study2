import { Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';

@Directive({
  selector: '[appDrop][appDropTags][appDropClass]'
})
export class DropDirective {
  @Input() appDropClass: string;
  @Input() appDropTags: string[] = [];
  @Output() dropped: EventEmitter<DragData> = new EventEmitter();
  private data$;
  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) {
    this.data$ = this.service.getDragData().take(1);
  }
  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.appDropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.appDropClass);
        }
      });
    }
  }
  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.appDropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.appDropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.appDropClass);
        }
      });
    }
  }
  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.appDropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.appDropClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }
}
