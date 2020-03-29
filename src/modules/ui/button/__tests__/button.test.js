import { createElement } from 'lwc';
// eslint-disable-next-line no-unused-vars
import Button from 'ui/button';

describe('Layout', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('Button exists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The component is added to DOM
     */
    const element = createElement('ui-button', { is: Button });
    element.design = 'info';
    document.body.appendChild(element);

    /**
     * Then
     * the DOM contains only one import Button
     */
    const buttonList = element.shadowRoot.querySelectorAll('input');
    expect(buttonList.length).toBe(1);
  });
});
