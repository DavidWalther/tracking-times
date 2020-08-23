import { LightningElement, api } from 'lwc';

export default class InputDateTime extends LightningElement {
  @api
  noTime = false;
  @api
  noDate = false;
}
