/* eslint-disable no-console */
/*
const authEndPoint = ''
const callbackUri = 'https://tracking-times.herokuapp.com/';
const clientId =
  '3MVG9KlmwBKoC7U3XOYyYdDI0wgOI4rnQD16irKpNO5KoUM.pH8.KR5.uA1YnEL4Pp2OsBcuXyI8s6O5jxbNt';
const constresponseType = 'token';
*/

function startAuthentication() {
  const theUrl =
    'https://enterprise-drive-7194-dev-ed.lightning.force.com/services/oauth2/authorize?response_type=token&client_id=3MVG9KlmwBKoC7U3XOYyYdDI0wgOI4rnQD16irKpNO5KoUM.pH8.KR5.uA1YnEL4Pp2OsBcuXyI8s6O5jxbNt&redirect_uri=https://tracking-times.herokuapp.com/';

  var xmlHttp = new XMLHttpRequest();
  //console.log('do auth');
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      console.log(xmlHttp.responseText);
    }
  };
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

export { startAuthentication };
