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
 * 3.1 store access token
 * 3.2 use window.location.replace() to replace url
 */

function startAuthentication() {
  const client_id =
    '3MVG9SOw8KERNN08rTd9ffUEaR7NhbZLhkeHRF.EJrtEeFZOPFjeILb8DI4niE.ncsCi1OmLauBCA82axhOJI';
  const response_type = 'token';
  const redirect_uri = 'https://tracking-times-develop.herokuapp.com/';
  const base_uri = 'https://timetrackers-dev-ed.lightning.force.com/';
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

  window.location.href = theUrl;
}

function readAuthenticationResponse() {
  let protocol = window.location.protocol;
  let host = window.location.hostname;
  let subStringToRemove = protocol + '//' + host + '/#';

  let parameterString = window.location.href.replace(subStringToRemove, '');

  if (parameterString.startsWith('access_token')) {
    let params = {};
    parameterString.split('&').forEach(parameter => {
      let tempParam = parameter.split('=');
      params[tempParam[0]] = tempParam[1];
    });

    return params;
  }

  return null;
}

export { startAuthentication, readAuthenticationResponse };
