import { createElement } from 'lwc';
import Entry from 'app/entry';

describe('check edit modal', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('check modal exists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The enty cmp is added to DOM
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    /**
     * Then
     * The component conrains a modal for editing data
     */
    const modalElement = getEditModal(element.shadowRoot);
    expect(modalElement).toBeTruthy();
  });

  test('check edit modal has inputs for entry', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The enty cmp is added to DOM
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    /**
     * Then
     * The edit-modal contains an inputs for time tarcking
     */
    const inputStartDate = element.shadowRoot.querySelector(
      '.modal-edit > div > input.start-date'
    );
    const inputStartTime = element.shadowRoot.querySelector(
      '.modal-edit > div > input.start-time'
    );
    const inputEndDate = element.shadowRoot.querySelector(
      '.modal-edit > div > input.end-date'
    );
    const inputEndTime = element.shadowRoot.querySelector(
      '.modal-edit > div > input.end-time'
    );

    expect(inputStartDate).toBeTruthy();
    expect(inputStartTime).toBeTruthy();
    expect(inputEndDate).toBeTruthy();
    expect(inputEndTime).toBeTruthy();
  });
});

describe('Check for Outputs', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('start date output exists', () => {
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const startDateOutput = element.shadowRoot.querySelector('span.start-date');

    expect(startDateOutput).toBeTruthy();
  });

  test('start time output exists', () => {
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const startTimeOutput = element.shadowRoot.querySelector('span.start-time');

    expect(startTimeOutput).toBeTruthy();
  });

  test('end date output exists', () => {
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const endDateOutput = element.shadowRoot.querySelector('span.end-date');

    expect(endDateOutput).toBeTruthy();
  });

  test('end time output exists', () => {
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const endTimeOutput = element.shadowRoot.querySelector('span.end-time');

    expect(endTimeOutput).toBeTruthy();
  });
});

describe('check initial values', () => {
  test('output start date', () => {
    const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeTimestamp;
    document.body.appendChild(element);

    const startDateOutput = element.shadowRoot.querySelector('span.start-date');

    expect(startDateOutput).toBeTruthy();
    expect(startDateOutput.textContent).toBe('2000-01-01');
  });

  test('output start time', () => {
    const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeTimestamp;
    document.body.appendChild(element);

    const startTimeOutput = element.shadowRoot.querySelector('span.start-time');

    expect(startTimeOutput).toBeTruthy();
    expect(startTimeOutput.textContent).toBe('13:00');
  });
  test('output end date', () => {
    const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

    const element = createElement('ui-entry', { is: Entry });
    element.end = probeTimestamp;
    document.body.appendChild(element);

    const endDateOutput = element.shadowRoot.querySelector('span.end-date');

    expect(endDateOutput).toBeTruthy();
    expect(endDateOutput.textContent).toBe('2000-01-01');
  });

  test('output end time', () => {
    const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

    const element = createElement('ui-entry', { is: Entry });
    element.end = probeTimestamp;
    document.body.appendChild(element);

    const endTimeOutput = element.shadowRoot.querySelector('span.end-time');

    expect(endTimeOutput).toBeTruthy();
    expect(endTimeOutput.textContent).toBe('13:00');
  });
});

describe('check Update of Outputs on Input change', () => {
  test('start date output changes on input change', () => {
    const probeStartTimestamp = 0;
    const newInputValue = '1900-01-01';

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeStartTimestamp;
    document.body.appendChild(element);

    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    const input = element.shadowRoot.querySelector('input.start-date');
    input.value = newInputValue;

    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      const output = element.shadowRoot.querySelector('span.start-date');
      expect(output).toBeTruthy();
      expect(output.textContent).toBe(newInputValue);
    });
  });

  test('start time output changes on input change', () => {
    const probeStartTimestamp = 0;
    const newInputValue = '14:00';

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeStartTimestamp;
    document.body.appendChild(element);

    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    const input = element.shadowRoot.querySelector('input.start-time');
    input.value = newInputValue;

    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      const output = element.shadowRoot.querySelector('span.start-time');
      expect(output).toBeTruthy();
      expect(output.textContent).toBe(newInputValue);
    });
  });

  test('end date output changes on input change', () => {
    const probeEndTimestamp = 0;
    const newInputValue = '1900-01-01';

    const element = createElement('ui-entry', { is: Entry });
    element.end = probeEndTimestamp;
    document.body.appendChild(element);

    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    const input = element.shadowRoot.querySelector('input.end-date');
    input.value = newInputValue;

    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      const output = element.shadowRoot.querySelector('span.end-date');
      expect(output).toBeTruthy();
      expect(output.textContent).toBe(newInputValue);
    });
  });

  test('end time output changes on input change', () => {
    const probeEndTimestamp = 0;
    const newInputValue = '14:00';

    const element = createElement('ui-entry', { is: Entry });
    element.end = probeEndTimestamp;
    document.body.appendChild(element);

    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    const input = element.shadowRoot.querySelector('input.end-time');
    input.value = newInputValue;

    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      const output = element.shadowRoot.querySelector('span.end-time');
      expect(output).toBeTruthy();
      expect(output.textContent).toBe(newInputValue);
    });
  });
});

describe('check events on changed values', () => {
  test('new values are in change event', () => {
    /**
     * Given
     * The entry component is added to a component with
     * filled start, end and comment
     *
     */

    const handler = jest.fn();
    const baseDate = '1970-01-01';

    const probeStartTimestamp = new Date(baseDate + 'T04:00').getTime();
    const probeEndTimestamp = new Date(baseDate + 'T09:00').getTime();

    const newStartTimeValue = '05:00';
    const newEndTimeValue = '08:00';

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeStartTimestamp;
    element.end = probeEndTimestamp;
    element.addEventListener('change', handler);
    document.body.appendChild(element);

    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    /**
     * When
     * 1. The start time and end time are changed
     * 2. The Save-Buttom is clicked
     */

    // When.1
    const startTimeInput = element.shadowRoot.querySelector('input.start-time');
    startTimeInput.value = newStartTimeValue;
    const endTimeInput = element.shadowRoot.querySelector('input.end-time');
    endTimeInput.value = newEndTimeValue;

    // When.2
    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      /**
       * Then
       * 1. Change-event is fired
       * 2. The event contains the all information of the entry cmp
       */

      // Then.1
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls.length).toBe(1);
      expect(handler.mock.calls[0].length).toBe(1);
      expect(handler.mock.calls[0][0].bubbles).toBe(true);
      expect(handler.mock.calls[0][0].composed).toBe(true);

      // Then.2
      expect(handler.mock.calls[0][0].detail).toBeTruthy();
      expect(handler.mock.calls[0][0].detail.start).toBeTruthy();
      expect(handler.mock.calls[0][0].detail.start).toBe(
        new Date(baseDate + 'T' + newStartTimeValue).getTime()
      );
      expect(handler.mock.calls[0][0].detail.end).toBeTruthy();
      expect(handler.mock.calls[0][0].detail.end).toBe(
        new Date(baseDate + 'T' + newEndTimeValue).getTime()
      );
    });
  });
});

describe('feature - difference', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('difference output exists', () => {
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const component = element.shadowRoot.querySelector('output.diff');

    expect(component).toBeTruthy();
  });

  test('output initial diff calculation', () => {
    const probeStartTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();
    const probeEndTimestamp = new Date('2000-01-01T13:30:00.0000').getTime();

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeStartTimestamp;
    element.end = probeEndTimestamp;
    document.body.appendChild(element);

    const component = element.shadowRoot.querySelector('output.diff');

    expect(component).toBeTruthy();
    expect(component.textContent).toBe('0.5');
  });

  test('diff output changes on input change', () => {
    const probeStartTimestamp = 0;
    const probeEndTimestamp = 1000 * 60 * 60;
    const newInputValue = '05:00';

    const element = createElement('ui-entry', { is: Entry });
    element.start = probeStartTimestamp;
    element.end = probeEndTimestamp;
    document.body.appendChild(element);

    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    const input = element.shadowRoot.querySelector('input.end-time');
    input.value = newInputValue;

    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      const output = element.shadowRoot.querySelector('output.diff');
      expect(output).toBeTruthy();
      expect(output.textContent).toBe('4');
    });
  });

  test('difference calculation accounts for break', () => {
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    const THIRTY_MINUTES = 30 * 60 * 1000;
    const TIMESTAMP_START = new Date().getTime();
    const TIMESTAMP_END = new Date(TIMESTAMP_START + TWO_HOURS).getTime();

    /**
     * Given
     * -
     */

    /**
     * When
     * The entry cmp ist created with start, end and break
     */
    const element = createElement('ui-entry', { is: Entry });
    element.start = TIMESTAMP_START;
    element.end = TIMESTAMP_END;
    element.break = THIRTY_MINUTES;
    document.body.appendChild(element);

    return Promise.resolve().then(() => {
      /**
       * Then
       * 1. The difference is reduced by the break time
       * 2. the duration is accessible via function
       */

      // 1.
      const differenceOutput = element.shadowRoot.querySelector('output.diff');
      expect(differenceOutput.value).toBe((1.5).toString());

      // 2.
      expect(element.duration()).toBe(TWO_HOURS - THIRTY_MINUTES);
    });
  });

  test('bugfix: difference calculation evaluates invalid break input as 0', () => {
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    const EMPTY_STRING = '';
    const TIMESTAMP_START = new Date().getTime();
    const TIMESTAMP_END = new Date(TIMESTAMP_START + TWO_HOURS).getTime();

    /**
     * Given
     * -
     */

    /**
     * When
     * The entry cmp ist created with start, end and break
     */
    const element = createElement('ui-entry', { is: Entry });
    element.start = TIMESTAMP_START;
    element.end = TIMESTAMP_END;
    element.break = EMPTY_STRING;
    document.body.appendChild(element);

    /**
     * Then
     * The difference is reduced by the break time
     */

    const differenceOutput = element.shadowRoot.querySelector('output.diff');
    expect(differenceOutput.value).toBe('2');
  });
});

describe('feature - break time', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('input for break exists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * the entry cmp is added
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    return Promise.resolve().then(() => {
      /**
       * Then
       * An input for breaktime exists
       */
      const entryElem = element.shadowRoot.querySelector('input.break');
      expect(entryElem).toBeTruthy();
    });
  });

  test('input takes value from api', () => {
    const breakValue = 78;
    const breakValueInMilliseconds = breakValue * 60 * 1000;

    /**
     * Given
     * The component is created with a given value for break
     */
    const element = createElement('ui-entry', { is: Entry });
    element.break = breakValueInMilliseconds;
    document.body.appendChild(element);

    /**
     * When
     * the edit button is clicked
     */
    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    return Promise.resolve().then(() => {
      /**
       * Then
       * An input for breaktime exists
       */
      const breakInput = element.shadowRoot.querySelector('input.break');
      expect(breakInput).toBeTruthy();
      expect(breakInput.value).toBe(breakValue.toString());
    });
  });

  test('has an output', () => {
    const breakValue = 78;
    const breakValueInMilliseconds = breakValue * 60 * 1000;
    /**
     * Given
     * -
     */

    /**
     * When
     * The component is created with a given value for break
     */
    const element = createElement('ui-entry', { is: Entry });
    element.break = breakValueInMilliseconds;
    document.body.appendChild(element);

    /**
     * Then
     *
     */
    const breakOutput = element.shadowRoot.querySelector('output.break');
    expect(breakOutput).toBeTruthy();
    expect(breakOutput.value).toBeTruthy();
    expect(breakOutput.value).toBe(breakValue.toString());
  });
});

describe('feature - comment', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('commet input exists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The entry-cmp is created
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    /**
     * Then
     * It has an input for comments
     */
    const textAreaComment = element.shadowRoot.querySelector('.output.comment');
    expect(textAreaComment).toBeTruthy();
  });

  test('comment output exists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The entry-cmp is created
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    /**
     * Then
     * It has an output for comments
     */
    const commentOutput = element.shadowRoot.querySelector('.input.comment');
    expect(commentOutput).toBeTruthy();
  });

  test('comment can be initialized', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The component is initialized with a comment
     */
    const probeText = '1234abcd';
    const element = createElement('ui-entry', { is: Entry });
    element.comment = probeText;
    document.body.appendChild(element);

    /**
     * Then
     * The comment is displayed
     */
    const commentOutput = element.shadowRoot.querySelector('textarea.comment');
    expect(commentOutput).toBeTruthy();
    expect(commentOutput.value).toBe(probeText);
  });

  test('comment output changes on input change', () => {
    /**
     * Given
     * The entry-cmp exists with initialized comment
     */
    const probeComment = 'abcd';
    const element = createElement('ui-entry', { is: Entry });
    element.comment = probeComment;
    document.body.appendChild(element);

    /**
     * When
     * - A new comment value is entered
     * - save is clicked
     */
    const editButton = getEditButton(element.shadowRoot);
    editButton.dispatchEvent(new CustomEvent('click'));

    const newInputValue = 'a1b2c3d4';
    const input = element.shadowRoot.querySelector('textarea.comment');
    input.value = newInputValue;

    const editModal = getEditModal(element.shadowRoot);
    editModal.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      /**
       * Then
       * The output displayes the new value
       */
      const commentInput = element.shadowRoot.querySelector('textarea.comment');
      expect(commentInput).toBeTruthy();
      expect(commentInput.value).toBe(newInputValue);
    });
  });

  test('comment is part of change-event', () => {
    const handler = jest.fn();
    /**
     * Given
     * The component with a comment
     */
    const oldComment = 'abcd';
    const element = createElement('ui-entry', { is: Entry });
    element.comment = oldComment;
    element.addEventListener('change', handler);
    document.body.appendChild(element);

    /**
     * When
     * the comment is changed
     */
    const newComment = 'a1b2c3d4';
    const commentInput = element.shadowRoot.querySelector('.input.comment');
    commentInput.value = newComment;

    const editModal = element.shadowRoot.querySelector('ui-modal-confirmable');
    editModal.dispatchEvent(new CustomEvent('confirm'));

    /**
     * Then
     * the new comment is part of the change event
     */
    expect(handler.mock.calls[0][0].detail.comment).toBe(newComment);
  });
});

describe('check single entry delete', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('delete button exists', () => {
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const deleteButton = getDeleteButton(element.shadowRoot);
    expect(deleteButton).toBeTruthy();
  });

  test('click on delete button fires delete event', () => {
    var handler = jest.fn();
    // add entry comp
    const element = createElement('ui-entry', { is: Entry });
    element.addEventListener('delete', handler);
    document.body.appendChild(element);

    // select delete button
    const deleteModal = element.shadowRoot.querySelector('.modal-delete');
    expect(deleteModal).toBeTruthy();

    // click delete button
    deleteModal.dispatchEvent(new CustomEvent('confirm'));

    // check for event of type 'delete'
    return Promise.resolve().then(() => {
      //asserts the 'delete'-event has been fired
      expect(handler).toHaveBeenCalled();
    });
  });
});

describe('feature - Make entries selectable', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('entry has select check box', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * the entry component is added to DOM
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    /**
     * Then
     * the checkbox for selecting exits
     */
    const selectCheckbox = element.shadowRoot.querySelector('input.selection');
    expect(selectCheckbox).toBeTruthy();
    expect(selectCheckbox.type).toBe('checkbox');
  });

  test('entry cmp fires events on check and uncheck', () => {
    const handler = jest.fn();
    const unselectHandler = jest.fn();
    /**
     * Given
     * the entry component is added to DOM
     */
    const element = createElement('ui-entry', { is: Entry });
    element.addEventListener('select', handler);
    element.addEventListener('unselect', unselectHandler);
    document.body.appendChild(element);

    /**
     * When
     * the selection checkbox is checked
     */
    const selectCheckbox = element.shadowRoot.querySelector('input.selection');
    selectCheckbox.checked = true;
    selectCheckbox.dispatchEvent(new CustomEvent('change'));

    /**
     * Then
     * a select-event is fired by cmp
     */
    return Promise.resolve()
      .then(() => {
        expect(handler).toHaveBeenCalled();

        /**
         * When
         * the checkbox is unchecked
         */
        selectCheckbox.checked = false;
        selectCheckbox.dispatchEvent(new CustomEvent('change'));
      })
      .then(() => {
        /**
         * Then
         * an unselect event is fired
         */
        expect(unselectHandler).toHaveBeenCalled();
      });
  });

  test('entry cmp has an unselect method', () => {
    /**
     * Given
     * - the entry component is added to DOM
     * - is selected
     */
    const element = createElement('ui-entry', { is: Entry });
    document.body.appendChild(element);

    const selectCheckbox = element.shadowRoot.querySelector('input.selection');
    selectCheckbox.checked = true;

    /**
     * When
     * the unselect method is called
     */
    element.unselect();

    /**
     * Then
     * the select checkbox is unchecked
     */
    expect(selectCheckbox.checked).toBe(false);
  });
});

function getEditButton(shadowRoot) {
  return getElementBySelector(shadowRoot, '.edit');
}

function getDeleteButton(shadowRoot) {
  return getElementBySelector(shadowRoot, '.button-delete');
}

function getEditModal(shadowRoot) {
  return getElementBySelector(shadowRoot, '.modal-edit');
}

function getElementBySelector(shadowRoot, selectorString) {
  const resultElement = shadowRoot.querySelector(selectorString);
  return resultElement;
}
