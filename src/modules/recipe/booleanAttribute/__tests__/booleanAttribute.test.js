/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import BooleanAttribute from 'recipe/booleanAttribute';

describe('Test Boolean attribute', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('', () => {});
});
