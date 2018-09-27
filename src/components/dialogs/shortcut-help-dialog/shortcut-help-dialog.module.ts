import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from '../../button/button.module';
import { NgModule } from '@angular/core';
import { ShortcutHelpDialogComponent } from './shortcut-help-dialog.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule } from '@angular/material';

/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    26-Sep-18
 *
 */
@NgModule({
  declarations: [
    ShortcutHelpDialogComponent
  ],
  exports: [ShortcutHelpDialogComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserModule,
    ButtonModule
  ],
  providers: []
})
export class ShortcutHelpDialogModule {
}
