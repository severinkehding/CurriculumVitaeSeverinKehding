import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { HeaderMenuComponent } from './header-menu.component';
import { ShortcutHelpDialogModule } from '../dialogs/shortcut-help-dialog/shortcut-help-dialog.module';
import { ShortcutHelpDialogComponent } from '../dialogs/shortcut-help-dialog/shortcut-help-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    HeaderMenuComponent
  ],
  exports: [HeaderMenuComponent, ShortcutHelpDialogComponent],
  imports: [
    MatDialogModule,
    BrowserModule,
    ButtonModule,
    ShortcutHelpDialogModule
  ],
  entryComponents: [HeaderMenuComponent, ShortcutHelpDialogComponent],
  bootstrap: [HeaderMenuComponent],
  providers: []
})
export class HeaderMenuModule {
}
