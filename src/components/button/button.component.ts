/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    10-Jul-18
 *
 */
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { BUTTON_HOST_ATTRIBUTES, CanColor, mixinColor, ThemePalette } from './button.interface';

/** Default const if the declaration of the button has no color given */
const DEFAULT_FLAT_BUTTON_COLOR = 'primary';

export class ButtonBase {
  constructor(public _elementRef: ElementRef) {
  }
}

export const _ButtonMixinBase = mixinColor(ButtonBase);

/**
 * This component will render a dynamic button
 *
 * @example
 * //Basic HTML with parameters
 * <div button color='yellow' class='enter-button' buttonName='[S]tart'>
 * </div>
 */
@Component({
  selector: `div[button]`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends _ButtonMixinBase implements CanColor {
  /** Label of the button */
  @Input() public buttonName: string;
  @Input() public color: ThemePalette;

  constructor(public elementRef: ElementRef) {
    super(elementRef);
    this.color = this.color ? this.color : DEFAULT_FLAT_BUTTON_COLOR;
    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    // Extract `button` from the html snipped and attaches as class
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (elementRef.nativeElement as HTMLElement).classList.add(attr);
      }
    }
  }

  /** Gets the native Element of the given reference */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  /** Gets whether the button has one of the given attributes. */
  private _hasHostAttributes(... attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}
