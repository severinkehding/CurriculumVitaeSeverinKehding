import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainMenuComponent } from './main-menu.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    MainMenuComponent
  ],
  exports: [MainMenuComponent],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: []
})
export class MainMenuModule {
}
