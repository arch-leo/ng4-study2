import { Component, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MatIconRegistry } from '@angular/material';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle: EventEmitter<null> = new EventEmitter();
  @Output() toggleDarkTheme: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  //   iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/menu.svg'));
  // }

  ngOnInit() {
  }
  openSiderbar() {
    this.toggle.emit();
  }
  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }
}
