import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppBackgroundModule } from '../directives/app-background/app-background.module';
import { MainMenuModule } from '../components/main-menu/main-menu.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderMenuModule } from '../components/header-menu/header-menu.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppBackgroundModule,
    MainMenuModule,
    HeaderMenuModule,
    BrowserAnimationsModule,
    A11yModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
