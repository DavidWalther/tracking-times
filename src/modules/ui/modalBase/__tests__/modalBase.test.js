import { createElement } from 'lwc';
import ModalBase from 'ui/modalBase';

describe('Control visibility', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('check isVisible is defined and initially false', () => {
    const element = createElement('ui-modal-base', { is: ModalBase });
    let isVisible;

    document.body.appendChild(element);

    isVisible = element.isVisible();
    expect(isVisible).toBe(false);
  });

  test('check hide is defined and turns visibility off', () => {
    const element = createElement('ui-modal-base', { is: ModalBase });
    let isVisible;

    document.body.appendChild(element);

    element.hide();

    isVisible = element.isVisible();
    expect(isVisible).toBe(false);
  });

  test('check show is defined and turns visibility on', () => {
    const element = createElement('ui-modal-base', { is: ModalBase });
    let isVisible;

    document.body.appendChild(element);

    element.show();

    isVisible = element.isVisible();
    expect(isVisible).toBe(true);
  });

  test('base modal has a close button', () => {
    /**
     * Given
     * the modal is shown
     */
    const element = createElement('ui-modal-base', { is: ModalBase });
    document.body.appendChild(element);

    element.show();

    /**
     * When
     * the close button is clicked
     */
    clickCloseButton(element.shadowRoot);

    return Promise.resolve().then(() => {
      expect(element.isVisible()).toBe(false);
    });
  });
});

function clickCloseButton(shadowRoot) {
  const button = shadowRoot.querySelector('.button-close');

  if (!button) {
    const errorObj = { message: 'summary modal not found' };
    throw errorObj;
  }

  button.dispatchEvent(new CustomEvent('click'));
}
