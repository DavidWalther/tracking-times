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
    //this.redirect_uri = 'https://tracking-times-test-auth.herokuapp.com/';
    this.redirect_uri = 'http://localhost:3001/';
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
    let urlParts = window.location.href.split('#');

    if (urlParts.length > 1) {
      let parameterString = urlParts[1];

      if (parameterString.startsWith('access_token')) {
        let params = {};
        parameterString.split('&').forEach(parameter => {
          let tempParam = parameter.split('=');
          params[tempParam[0]] = decodeURIComponent(tempParam[1]);
        });

        return params;
      }
    }
    return null;
  }

  startAuthentication() {
    window.location.href = this.getUri();
  }

  replaceLocation() {
    window.location.replace(window.location.origin);
  }
}

export { Credentials };
