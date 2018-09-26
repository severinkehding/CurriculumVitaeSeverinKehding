/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    09-Jul-18
 *
 */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShortcutHelpDialogComponent } from '../dialogs/shortcut-help-dialog/shortcut-help-dialog.component';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShortcutHelpDialogComponent, {autoFocus: true, panelClass: 'shortcut-dialog-panel'});

    /** On Dialog close TODO: perhaps remove this because its not nesessarcy **/
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
