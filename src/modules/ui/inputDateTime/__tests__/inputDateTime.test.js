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
    const inputTime = element.shadowRoot.querySelector('input.input-time');
    expect(inputTime.value).toBe(nowString);
  });

  test('Time shows time if value is provided', () => {
    /**
     * Given
     * -
     */
    /**
     * When
     * The component is added to DOM with a given value
     */
    const timeString = '18:43';
    const inputValue = new Date('2020-01-01T' + timeString).getTime();

    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.value = inputValue;
    document.body.appendChild(element);
    /**
     * Then
     * the input shows the given time
     */
    const inputTime = element.shadowRoot.querySelector('input.input-time');
    expect(inputTime.value).toBe(timeString);
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
    /**
     * Given
     * -
     */
    /**
     * When
     * The component is added to DOM with a given value
     */
    const dateString = '1982-01-20';
    const inputValue = new Date(dateString + 'T15:30:00Z').getTime();

    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.value = inputValue;
    document.body.appendChild(element);
    /**
     * Then
     * the input shows the given date
     */
    const inputDate = element.shadowRoot.querySelector('input.input-date');
    expect(inputDate.value).toBe(dateString);
  });
});

describe('Change', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("Change of time input triggers a custom 'change' event", () => {
    const handler = jest.fn();
    /**
     * Given
     * The componen is added to DOM with a specific value
     */
    const timeString = '18:43';
    const inputValue = new Date('2020-01-01T' + timeString).getTime();

    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.addEventListener('change', handler);
    element.value = inputValue;
    document.body.appendChild(element);

    /**
     * When
     * the time input is changed
     */
    const newTimeString = '19:43';
    const inputTime = element.shadowRoot.querySelector('input.input-time');
    inputTime.value = newTimeString;
    inputTime.dispatchEvent(new CustomEvent('change'));

    /**
     * Then
     * A single change event is fired
     */
    return Promise.resolve().then(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  test('Change event contains integer values of date and time - on time change', () => {
    const handler = jest.fn();
    /**
     * Given
     * The component is added to DOM with a specific value
     */

    const timeString = '18:43';
    const dateString = '2020-02-07';
    const inputValue = new Date(dateString + 'T' + timeString).getTime();

    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.addEventListener('change', handler);
    element.value = inputValue;
    document.body.appendChild(element);

    /**
     * When
     * the time input is changed
     */
    const newTimeString = '19:43';
    const inputTime = element.shadowRoot.querySelector('input.input-time');
    inputTime.value = newTimeString;
    inputTime.dispatchEvent(new CustomEvent('change'));

    /**
     * Then
     * the change event contains the interger values of date and time
     */
    return Promise.resolve().then(() => {
      const expectedDateInteger = new Date(dateString).getTime();
      const expectedTimeInteger = new Date(
        '1970-01-01T' + newTimeString
      ).getTime();
      expect(handler.mock.calls[0][0].detail).toBeTruthy();
      expect(handler.mock.calls[0][0].detail.time).toBe(expectedTimeInteger);
      expect(handler.mock.calls[0][0].detail.date).toBe(expectedDateInteger);
    });
  });

  test("Change of date input triggers a custom 'change' event", () => {
    const handler = jest.fn();
    /**
     * Given
     * The componen is added to DOM with a specific value
     */
    const dateString = '2020-01-30';
    const inputValue = new Date(dateString + 'T15:00:00.0000Z').getTime();

    const element = createElement('ui-input-date-time', { is: InputDateTime });
    element.addEventListener('change', handler);
    element.value = inputValue;
    document.body.appendChild(element);

    /**
     * When
     * the time input is changed
     */
    const newDateString = '19:43';
    const inputDate = element.shadowRoot.querySelector('input.input-date');
    inputDate.value = newDateString;
    inputDate.dispatchEvent(new CustomEvent('change'));

    /**
     * Then
     * A single change event is fired
     */
    return Promise.resolve().then(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
