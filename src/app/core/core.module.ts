import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../utils/svg.utils';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule } from '../service/service.module';

import 'hammerjs';
import 'rxjs/Rx';
// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/count';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/combineLatest';
// import 'rxjs/add/operator/take';

import '../utils/debug.utils';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceModule.forRoot()
  ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, AppRoutingModule],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  providers: [
    {
      provide: 'BASE_CONFIG', useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次存在');
    }

    loadSvgResources(ir, ds);
    // ir.addSvgIcon('menu', ds.bypassSecurityTrustResourceUrl('assets/menu.svg'));
  }
}
