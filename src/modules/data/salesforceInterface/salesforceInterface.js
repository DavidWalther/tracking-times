/* eslint-disable no-unused-vars */
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
      //this.salesforceCreateRecord(objectType, recordJsonObj);
      this.salesforceQuery('SELECT+name+from+Account');
    }
  }

  @api
  query(queryString) {
    const testQuery = 'SELECT+name+from+Account';
    const salesforceApiVersion = 'v51.0';

    const queryEndpoint = '/services/data/' + salesforceApiVersion + '/query/';
    const theUrl = this.instanceUrl + queryEndpoint + '?q=' + testQuery;

    query(theUrl, this.instanceUrl, this.accessToken);
    /*
   const response = await fetch(theUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
        'Access-Control-Allow-Origin': this.instanceUrl
      }
    }).then(data => {
      console.log('Success');
      console.log(data);
    }).catch(error => {
      console.log('Error');
      console.log(error);
    });

*/
    /*
    var data = '';

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open(
      'GET',
      'https://agility-connect-25662-dev-ed.cs101.my.salesforce.com/services/data/v51.0/query/?q=SELECT+name+from+Account'
    );
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
    xhr.setRequestHeader('Access-Control-Allow-Origin', this.instanceUrl);
    xhr.send(data);

    */
    /*if (this.accessToken && this.instanceUrl) {
      this.salesforceQuery(queryString);
    }*/
  }
  //----------------------------
  // internal
  //----------------------------

  salesforceQuery(queryString) {
    var data = '';

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open(
      'GET',
      'https://agility-connect-25662-dev-ed.cs101.my.salesforce.com/services/data/v51.0/query/?q=SELECT+name+from+Account'
    );
    xhr.setRequestHeader(
      'Authorization',
      'Bearer 00D1X00000033xN!AQoAQGp0zBnHPwK295lJLzaFlCVkO0A0EONjFUiN1PBlgaPP9svwpOXePvJczZYqK83W2UY2WSTxHtARk6tifgNpMUm8TSSf'
    );
    //xhr.setRequestHeader("Cookie", "BrowserId=OwvE3vZDEeq8gXnpO7ewCg");
    xhr.setRequestHeader('Access-Control-Allow-Origin', this.instanceUrl);
    xhr.send(data);

    // Working:
    /*
"localhost" might be the issue
https://www.w3schools.com/code/tryit.asp?filename=GPAJFNAR1MUY
*/

    /*
    const testQuery = 'SELECT+name+from+Account';
    const salesforceApiVersion = 'v51.0';
    const queryEndpoint = '/services/data/' + salesforceApiVersion + '/query/';
    const theUrl = this.instanceUrl + queryEndpoint + '?q=' + testQuery;
    let token = this.accessToken;
    query(theUrl, token)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error);
    });
*/
    // -----
    /*
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
    */
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
    /*
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open('POST', theUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.setRequestHeader('Access-Control-Allow-Origin', this.instanceUrl);
    const payload = JSON.stringify(recordJsonObj);
    xhr.send(payload);
    */
    createSf(theUrl, this.accessToken, recordJsonObj)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

async function query(theUrl, instanceUrl, access_token) {
  //  const query = 'SELECT+name+from+Account';

  const response = await fetch(theUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
      'Access-Control-Allow-Origin': instanceUrl
    }
  })
    .then(data => {
      console.log('Aquired Response');
      return data.json();
    })
    .then(json => {
      console.log('JSON');
      console.log(json);
    })
    .catch(error => {
      console.log('Error');
      console.log(error);
    });

  /*
  const response = await fetch(theUrl, {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token
    }
  });
  return response;
  */
}

async function createSf(theUrl, access_token, payload) {
  const response = await fetch(theUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token
    },
    body: JSON.stringify(payload)
  });
  return response;
}
