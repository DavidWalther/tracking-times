import { createElement } from 'lwc';
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
    document.body.appendChild(element);

    /**
     * Then
     * the DOM contains only one import Button
     */
    const buttonList = element.shadowRoot.querySelectorAll('input');
    expect(buttonList.length).toBe(1);
  });

  test('Button has class with given Layout', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The component is added to DOM with a specified design
     */
    const element = createElement('ui-button', { is: Button });
    element.design = 'info';
    document.body.appendChild(element);

    /**
     * Then
     * The button has that special design class
     */
    const button = element.shadowRoot.querySelector('input');
    expect(button.classList.contains('button')).toBe(true);
    expect(button.classList.contains('info')).toBe(true);
  });
});
