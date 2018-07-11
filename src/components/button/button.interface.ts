/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    10-Jul-18
 *
 */
import { ElementRef } from '@angular/core';

/** Contains all button types and all future once. If there is a new button type e.g. button-round it should be added here */
export const BUTTON_HOST_ATTRIBUTES = [
  'button'
];

export interface CanColor {
  /** Theme color palette for the component. */
  color: ThemePalette;
}

export interface HasElementRef {
  _elementRef: ElementRef;
}

/** Possible color palette values. */
export type ThemePalette = 'primary' | 'yellow' | undefined;

export type Constructor<T> = new(... args: any[]) => T;

/** Mixin to augment a directive with a `color` property. */
export function mixinColor<T extends Constructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): Constructor<CanColor> & T {
  return class extends base {
    private _color: ThemePalette;

    get color(): ThemePalette {
      return this._color;
    }

    /** Attaches the color to the native element as style class */
    set color(value: ThemePalette) {
      const colorPalette = value || defaultColor;

      if (colorPalette !== this._color) {
        if (this._color) {
          this._elementRef.nativeElement.classList.remove(`color-${this._color}`);
        }
        if (colorPalette) {
          this._elementRef.nativeElement.classList.add(`color-${colorPalette}`);
        }

        this._color = colorPalette;
      }
    }

    constructor(... args: any[]) {
      super(... args);

      // Set the default color that can be specified from the mixin.
      this.color = defaultColor;
    }
  };
}
