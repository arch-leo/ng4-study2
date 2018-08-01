import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ThemeService {
  themeEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  themeChange(change: boolean) {
    return change;
  }
}
