/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

/**
 * Help on CORS settings
 *
 * SF - Knowledge:
 * Error 'XMLHttpRequest cannot load, No Access-Control-Allow-Origin':
 * https://help.salesforce.com/articleView?id=000334858&type=1&mode=1
 *
 * SF - Connect REST API Developer Guide
 * https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/extend_code_cors.htm
 */

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
    xmlhttp.addEventListener('load', evt => {
      console.log('Salesforce response: ' + evt);
    });
    xmlhttp.open('POST', theUrl);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xmlhttp.send(JSON.stringify(recordJsonObj));
  }
}
