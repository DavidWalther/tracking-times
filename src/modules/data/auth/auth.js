/* eslint-disable no-console */
/*
const authEndPoint = ''
const callbackUri = 'https://tracking-times.herokuapp.com/';
const clientId =
  '3MVG9KlmwBKoC7U3XOYyYdDI0wgOI4rnQD16irKpNO5KoUM.pH8.KR5.uA1YnEL4Pp2OsBcuXyI8s6O5jxbNt';
const constresponseType = 'token';
*/

/**
 * Notes:
 * 1. create connected app
 * 2. on authentication click: redirect to authentication endpoint
 * 3. on connect callback:
 * 3.1 store access token (replace '%21' with '!')
 * 3.2 use window.location.replace() to replace url
 */

class Credentials {
  constructor() {
    this.base_uri = 'https://test.salesforce.com/';
    //this.base_uri = 'https://saas-ruby-7375-dev-ed.lightning.force.com/';
    this.redirect_uri = 'https://tracking-times-test-auth.herokuapp.com/';
    this.client_id =
      '3MVG95AcBeaB55lXeOhkpjm2VQzqGpcyDBRVreuu1DeC49UtgGZN5UO5r1n5dRw4PBwR3qvlV.OkG6EiYexJ0';
    this.response_type = 'token';
    this.endpoint = 'services/oauth2/authorize';
  }

  getUri() {
    let result = this.base_uri + this.endpoint;
    result += '?response_type=' + this.response_type;
    result += '&client_id=' + this.client_id;
    result += '&redirect_uri=' + this.redirect_uri;
    return result;
  }

  readAuthenticationResponse() {
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let subStringToRemove = protocol + '//' + host + '/#';

    let parameterString = window.location.href.replace(subStringToRemove, '');

    if (parameterString.startsWith('access_token')) {
      let params = {};
      parameterString.split('&').forEach(parameter => {
        let tempParam = parameter.split('=');
        params[tempParam[0]] = decodeURIComponent(tempParam[1]);
      });

      return params;
    }

    return null;
  }

  startAuthentication() {
    window.location.href = this.getUri();
  }
}

/* const client_id =
    '3MVG9SOw8KERNN08rTd9ffUEaR7NhbZLhkeHRF.EJrtEeFZOPFjeILb8DI4niE.ncsCi1OmLauBCA82axhOJI'; */
/*const client_id =
    '3MVG95AcBeaB55lXeOhkpjm2VQzqGpcyDBRVreuu1DeC49UtgGZN5UO5r1n5dRw4PBwR3qvlV.OkG6EiYexJ0';
  const response_type = 'token';
  // const redirect_uri = 'https://tracking-times-develop.herokuapp.com/';
  const redirect_uri = 'https://tracking-times-test-auth.herokuapp.com/';
  const base_uri =
    'https://enterprise-drive-7194-dev-ed.cs101.my.salesforce.com';
  //const base_uri = 'https://timetrackers-dev-ed.lightning.force.com/';
  const endpoint = 'services/oauth2/authorize';

  const theUrl =
    base_uri +
    endpoint +
    '?' +
    'response_type=' +
    response_type +
    '&' +
    'client_id=' +
    client_id +
    '&' +
    'redirect_uri=' +
    redirect_uri;

  window.location.href = theUrl;*/

function readAuthenticationResponse() {
  let protocol = window.location.protocol;
  let host = window.location.hostname;
  let subStringToRemove = protocol + '//' + host + '/#';

  let parameterString = window.location.href.replace(subStringToRemove, '');

  if (parameterString.startsWith('access_token')) {
    let params = {};
    parameterString.split('&').forEach(parameter => {
      let tempParam = parameter.split('=');
      params[tempParam[0]] = decodeURIComponent(tempParam[1]);
    });

    return params;
  }

  return null;
}

function replaceLocation() {
  let protocol = window.location.protocol;
  let host = window.location.hostname;
  let plainUrl = protocol + '//' + host;

  window.location.replace(plainUrl);
}

export { Credentials, readAuthenticationResponse, replaceLocation };
