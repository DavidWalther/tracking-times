import { createElement } from 'lwc';
import InputDateTime from 'ui/inputDateTime';

describe('Time Input', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('Component has an input for time', () => {
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
    const inputTime = element.shadowRoot.querySelector('input.input-time');
    expect(inputTime).toBeTruthy();
    expect(inputTime.type).toBe('time');
  });

  test('Time input can be hidden', () => {
    /**
     * Given
     * -
     */
    /**
     * When
     * the component is added to DOM with 'noTime' set to true
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.noTime = true;
    document.body.appendChild(element);
    /**
     * Then
     * It has no input for time values
     */
    const inputTime = element.shadowRoot.querySelector('input.input-time');
    expect(inputTime).toBeFalsy();
  });

  test('Time shows <NOW> if no value is provided', () => {
    const nowString = new Date().toLocaleTimeString().substr(0, 5);
    /**
     * Given
     * -
     */
    /**
     * When
     * The component is added to DOM
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    document.body.appendChild(element);
    /**
     * Then
     * the input shows the current time
     */
    const inputDate = element.shadowRoot.querySelector('input.input-time');
    expect(inputDate.value).toBe(nowString);
  });
});

describe('Date input', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('Component has an input for date', () => {
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
     * It has an input for date values
     */
    const inputDate = element.shadowRoot.querySelector('input.input-date');
    expect(inputDate).toBeTruthy();
    expect(inputDate.type).toBe('date');
  });

  test('Date input can be hidden', () => {
    /**
     * Given
     * -
     */
    /**
     * When
     * the component is added to DOM with 'noDate' set to true
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.noDate = true;
    document.body.appendChild(element);
    /**
     * Then
     * It has no input for date values
     */
    const inputDate = element.shadowRoot.querySelector('input.input-date');
    expect(inputDate).toBeFalsy();
  });

  test('Date shows <TODAY> if no value is provided', () => {
    const todayString = new Date().toISOString().split('T')[0];
    /**
     * Given
     * -
     */
    /**
     * When
     * The component is added to DOM
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    document.body.appendChild(element);
    /**
     * Then
     * the input shows the date of today
     */
    const inputDate = element.shadowRoot.querySelector('input.input-date');
    expect(inputDate.value).toBe(todayString);
  });

  test('Date shows Date if value is provided', () => {
    const dateString = '1982-01-20';
    const inputValue = new Date(dateString + 'T15:30:00Z').getTime();
    /**
     * Given
     * -
     */
    /**
     * When
     * The component is added to DOM
     */
    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.value = inputValue;
    document.body.appendChild(element);
    /**
     * Then
     * the input shows the date of today
     */
    const inputDate = element.shadowRoot.querySelector('input.input-date');
    expect(inputDate.value).toBe(dateString);
  });
});
