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
 * - create connected app
 *
 * - Auth callout to SF:
 * -- Error: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 * => Add 'xmlHttp.setRequestHeader('Access-Control-Allow-Origin', base_uri);'
 *
 * -- Error: has been blocked by CORS policy: Response to preflight request doesn't pass access control check: Redirect is not allowed for a preflight request.
 *
 *
 * -- add redirect_uri to remote-sites
 *
 * Access-Control-Allow-Origin
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

  var xmlHttp = new XMLHttpRequest();
  //console.log('do auth');
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      console.log(xmlHttp.responseText);
    }
  };
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.setRequestHeader('Access-Control-Allow-Origin', base_uri);

  xmlHttp.setRequestHeader('Access-Control-Allow-Methods', 'GET');
  xmlHttp.setRequestHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Range, Content-Disposition, Content-Description'
  );
  xmlHttp.send(null);
}

export { startAuthentication };
