import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DrawerComponent } from './drawer/drawer.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HeaderComponent } from './header/header.component';
import { RandomImgComponent } from './random-img/random-img.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DrawerComponent,
    RandomImgComponent,
    FavouriteComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    HeaderComponent,
    DrawerComponent,
    RandomImgComponent,
    FavouriteComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiLibModule {}
