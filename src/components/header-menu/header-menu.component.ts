/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    09-Jul-18
 *
 */
import { Component, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as $ from 'jquery';
import * as terminal from 'jquery.terminal';
import { ShortcutHelpDialogComponent } from '../dialogs/shortcut-help-dialog/shortcut-help-dialog.component';
declare var jQuery: any;
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

      $(document).ready(function(){
        console.log(terminal);
        jQuery('.mat-dialog-container').terminal(function(command) {

        });
      });




    /* dialogRef.afterClosed().subscribe(result => {
       $('.mat-dialog-container').terminal(function(command) {
         if (command !== '') {
           var result = window.eval(command);
           if (result != undefined) {
             this.echo(String(result));
           }
         }
       }, {
         greetings: 'Javascript Interpreter',
         name: 'js_demo',
         height: 200,
         width: 450,
         prompt: 'js> '
       });
       console.log(`Dialog result: ${result}`);
     });*/
  }
}


@Directive({selector: 'canvas[m3Chart]'})
export class ChartsDirective implements OnInit, OnChanges {

  @Input() public chartType: string;
  @Input() public options: any = {};
  @Input() public data: any = {};

  private chart: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {

    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {

      // Data for chart updated?
      if (changes.hasOwnProperty('data')) {

        // Overwrite chart data and update
        Object.assign(this.chart.data, changes.data.currentValue);
        this.chart.update();
      }
    }
  }

  private createChart() {
    const options: any = Object.assign({}, this.options);
   /* this.chart = new JQueryTerminalStatic(this.element.nativeElement, {
      type: this.chartType,
      data: {datasets: [{data: []}], labels: []},
      options: options
    });*/
  }
}
