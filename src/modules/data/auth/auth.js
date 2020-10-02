import { LightningElement, api } from 'lwc';

export default class Auth extends LightningElement {
  callbackUri = 'https://tracking-times.herokuapp.com/';
  clientId =
    '3MVG9KlmwBKoC7U3XOYyYdDI0wgOI4rnQD16irKpNO5KoUM.pH8.KR5.uA1YnEL4Pp2OsBcuXyI8s6O5jxbNt';
  responseType = 'token';

  @api
  startAuthentication() {
    // eslint-disable-next-line no-console
    console.log('auth');
  }
}
