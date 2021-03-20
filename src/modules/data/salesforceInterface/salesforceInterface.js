/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class SalesforceInterface extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  @api
  accessToken;

  @api
  instanceUrl;

  @api
  createRecord(recordJsonObj) {
    this.salesforceCreateRecord(recordJsonObj);
  }

  //----------------------------
  // internal
  //----------------------------

  salesforceCreateRecord(recordJsonObj) {
    console.log('instanceUrl: ' + this.instanceUrl);
    console.log('token: ' + this.accessToken);
    console.log('recordJsonObj: ' + recordJsonObj);
  }
}
