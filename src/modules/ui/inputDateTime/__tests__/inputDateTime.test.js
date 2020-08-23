import { createElement } from 'lwc';
import InputDateTime from 'ui/inputDateTime';

describe('Time Input', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('component has an input for time', () => {
    /**
     * Given
     * -
     */
    /**
     * When
     * the component is added to DOM
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    document.body.appendChild(element);
    /**
     * Then
     * It has an input for time values
     */
    const inputTime = element.shadowRoot.querySelector('.input-time');
    expect(inputTime).toBeTruthy();
  });
});

describe('Date input', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('component has an input for date', () => {
    /**
     * Given
     * -
     */
    /**
     * When
     * the component is added to DOM
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    document.body.appendChild(element);
    /**
     * Then
     * It has an input for time values
     */
    const inputTime = element.shadowRoot.querySelector('.input-date');
    expect(inputTime).toBeTruthy();
  });
});
