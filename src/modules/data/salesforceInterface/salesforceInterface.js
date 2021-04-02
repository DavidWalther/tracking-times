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
 *
 * Things done in Scratch Org:
 * - CORS-Settings
 * - Remote-Site
 * - Connected App
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

  @api
  query(queryString) {
    if (this.accessToken && this.instanceUrl) {
      this.salesforceQuery(queryString);
    }
  }
  //----------------------------
  // internal
  //----------------------------

  salesforceQuery(queryString) {
    const salesforceApiVersion = 'v51.0';
    const queryEndpoint = '/services/data/' + salesforceApiVersion + '/query/';
    const theUrl = this.instanceUrl + queryEndpoint + '?q=' + queryString;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open('GET', theUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send();
  }

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

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open('POST', theUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    const payload = JSON.stringify(recordJsonObj);
    xhr.send(payload);
  }
}
