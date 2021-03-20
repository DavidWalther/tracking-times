import { LightningElement, api } from 'lwc';

export default class SalesforceInterface extends LightningElement {
  @api
  accessToken;

  @api
  instanceUrl;
}
