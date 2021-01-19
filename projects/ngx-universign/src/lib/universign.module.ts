import {ModuleWithProviders, NgModule} from '@angular/core';
import { UniversignComponent } from './universign.component';
import {UniversignConfigService} from './universign.config';

/**
 * Universign module
 *
 * The universign script url can be passed as option
 * using the forRoot static method
 */
@NgModule({
  declarations: [UniversignComponent],
  exports: [UniversignComponent]
})
export class UniversignModule {
  static forRoot(moduleConfig: UniversignConfigService): ModuleWithProviders<UniversignModule> {
    return {
      ngModule: UniversignModule,
      providers: [{provide: UniversignConfigService, useValue: moduleConfig}]
    };
  }
}
