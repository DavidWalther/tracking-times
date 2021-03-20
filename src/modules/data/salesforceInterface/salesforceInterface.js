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
  createRecord(objectType, recordJsonObj) {
    if (this.accessToken && this.instanceUrl && objectType) {
      this.salesforceCreateRecord(objectType, recordJsonObj);
    }
  }

  //----------------------------
  // internal
  //----------------------------

  salesforceCreateRecord(objectType, recordJsonObj) {
    /*
    console.log('instanceUrl: ' + this.instanceUrl);
    console.log('token: ' + this.accessToken);
    console.log('recordJsonObj: ' + recordJsonObj);
*/
    const salesforceApiVersion = 'v51.0';
    const createRecordEndpoint =
      '/services/data/' + salesforceApiVersion + '/sobjects/';

    const theUrl = this.instanceUrl + createRecordEndpoint + objectType + '/';

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', theUrl);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xmlhttp.send(JSON.stringify(recordJsonObj));
  }
}
