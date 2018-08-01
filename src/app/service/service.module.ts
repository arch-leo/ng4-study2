// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
// export class ServiceModule { }

/* 构造module：上面的方法等价于下面的方法 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';

@NgModule()
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        QuoteService,
        ProjectService
      ]
    };
  }
}
