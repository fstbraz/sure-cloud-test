import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UiLibModule } from '@app/ui-lib/ui-lib.module';
import { DogDashComponent } from './dog-dash/dog-dash.component';

@NgModule({
  declarations: [DogDashComponent],
  exports: [UiLibModule, DogDashComponent],
  imports: [UiLibModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesModule {}
