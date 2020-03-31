import { LightningElement, api } from 'lwc';

export default class BooleanAttribute extends LightningElement {

  @api
  get toggle() {
    return this.vToggle;
  }
  set toggle(value) {
    // Everything but 'undefined' and 'false' will evaluate to true
    let valueIsNotUndefined = value !== undefined;
    let valueIsNotFalse = value !== false;
    this.vToggle = valueIsNotUndefined && valueIsNotFalse;
  }

  vToggle = false;
}
