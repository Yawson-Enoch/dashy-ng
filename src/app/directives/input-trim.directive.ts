import { Directive } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/* directive to trim inputs
  - ref: https://medium.com/netanelbasal/how-to-trim-the-value-of-angulars-form-control-87660941e6cb
*/

@Directive({
  selector: '[appInputTrim]',
})
export class InputTrimDirective {
  constructor(private ngControl: NgControl) {
    if (this.ngControl && this.ngControl.valueAccessor) {
      this.trimValueAccessor(this.ngControl.valueAccessor);
    }
  }

  private trimValueAccessor(valueAccessor: ControlValueAccessor) {
    const original = valueAccessor.registerOnChange;

    valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
      return original.call(valueAccessor, (value: unknown) => {
        return fn(
          typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value
        );
      });
    };
  }
}
