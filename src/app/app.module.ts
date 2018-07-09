import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppBackgroundModule } from '../directives/app-background/app-background.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppBackgroundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
