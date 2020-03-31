import { LightningElement, api } from 'lwc';

export default class BooleanAttribute extends LightningElement {

  @api
  get toggle() {
    return this.vToggle;
  }
  set toggle(value) {
    let valueIsNotUndefined = value !== undefined;
    let valueIsNotFalse = value !== false;
    this.vToggle = valueIsNotUndefined && valueIsNotFalse;
  }

  vToggle = false;
}
