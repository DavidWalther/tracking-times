// eslint-disable-next-line no-unused-vars
import { createElement } from 'lwc';
// eslint-disable-next-line no-unused-vars
import Button from 'ui/entry';

describe('Layout', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('', () => {});
});
