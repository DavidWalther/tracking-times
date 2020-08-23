import { LightningElement, api } from 'lwc';

export default class InputDateTime extends LightningElement {
  @api
  noTime = false;
  @api
  noDate = false;
  @api
  value = new Date();

  get dateValue() {
    const tempDate = new Date(this.value);
    return tempDate.toISOString().split('T')[0];
  }

  get timeValue() {
    const tempDate = new Date(this.value);
    return tempDate.toLocaleTimeString().substr(0, 5);
  }
}
