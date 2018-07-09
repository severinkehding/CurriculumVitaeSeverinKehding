/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    09-Jul-18
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBackgroundDirective } from './app-background.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AppBackgroundDirective],
  exports: [AppBackgroundDirective],
  providers: []
})
export class AppBackgroundModule {
}
