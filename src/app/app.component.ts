import { Component } from '@angular/core';
import { ThemeService } from './shared/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  darkTheme = false;
  constructor(private themeService: ThemeService, private oc: OverlayContainer) { }
  switchTheme(dark: boolean) {
    this.darkTheme = dark;
    this.oc.getContainerElement().className = dark ? 'myapp-dark-theme cdk-overlay-container' : 'cdk-overlay-container';
    /*
    此方法是通过服务 把切换事件传递给对话框
    this.themeService.themeEvent.emit(dark);
    */
  }
}
