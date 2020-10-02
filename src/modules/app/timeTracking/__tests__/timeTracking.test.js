/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import { save, load, clear } from 'data/localStorage';
import TimeTracking from 'app/timeTracking';

describe('check loading based on version', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    clearStorage();
  });

  test('load data without version', () => {
    const storageString = [
      {
        data:
          '{"start":{"value":0},"end":{"value":180000},"comment":"legacy entry","id":0}',
        index: 0
      }
    ];
    localStorage.setItem('storage', JSON.stringify(storageString));

    const element = createElement('app-timeTracking', { is: TimeTracking });

    document.body.appendChild(element);

    return Promise.resolve().then(() => {
      const entries = element.shadowRoot.querySelectorAll('app-entry');
      expect(entries).toBeTruthy();
      expect(entries.length).toBeTruthy();
      expect(entries.length).toBe(1);

      // penetrate the component boundary
      //
      // not a best practice but necessary/fast for
      // make sure nothing breakes

      /**
       * ToDo
       * reduce test to only check whether the correct values are passed into app-entry cmp
       */
      const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
      expect(outputSpans).toBeTruthy();
      expect(outputSpans.length).toBeTruthy();
      expect(outputSpans.length).toBe(4);
      expect(outputSpans[0].classList[0]).toBe('start-date');
      expect(outputSpans[0].textContent).toBe('1970-01-01');

      expect(outputSpans[1].classList[0]).toBe('start-time');
      expect(outputSpans[1].textContent).toBe('01:00');

      expect(outputSpans[2].classList[0]).toBe('end-date');
      expect(outputSpans[2].textContent).toBe('1970-01-01');

      expect(outputSpans[3].classList[0]).toBe('end-time');
      expect(outputSpans[3].textContent).toBe('01:03');

      /*       expect(outputSpans[4].classList[0]).toBe('comment');
      expect(outputSpans[4].textContent).toBe('legacy entry'); */

      const outputTags = entries[0].shadowRoot.querySelectorAll('output.diff');
      expect(outputTags.length).toBe(1);
      expect(outputTags[0].classList[0]).toBe('diff');
      expect(outputTags[0].textContent).toBe('0.05');
    });
  });

  test('load data of version 0.3', () => {
    setVersion3DummyData();

    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    return Promise.resolve().then(() => {
      const entries = element.shadowRoot.querySelectorAll('app-entry');
      expect(entries).toBeTruthy();
      expect(entries.length).toBeTruthy();
      expect(entries.length).toBe(2);

      // penetrate component border

      /**
       * ToDo
       * reduce test to only check whether the correct values are passed into app-entry cmp
       */
      const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
      expect(outputSpans).toBeTruthy();
      expect(outputSpans.length).toBeTruthy();
      //expect(outputSpans.length).toBe(5);
      expect(outputSpans[0].textContent).toBe('1970-01-01');
    });
  });

  test('storage is empty from begin with', () => {
    const currentStorage = localStorage.getItem('storage');
    expect(currentStorage).toBeTruthy();
    expect(currentStorage).toBe('{}');
  });
});

describe('Add related tests', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    clearStorage();
  });

  test('Add button exists', () => {
    /**
     * Given
     * Component is Loaded
     *
     * Then
     * The Add-button exists
     *
     */

    // Given
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    // Then
    const addButton = getAddButton(element.shadowRoot);
    expect(addButton).toBeTruthy();
  });

  test('Add button adds ui-entries', () => {
    /**
     * Given
     * Component is Loaded
     *
     * When
     * Clicking the Add Button three times
     *
     * Then
     * Three new entries are created
     */

    // Given
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    // When
    const addButton = getAddButton(element.shadowRoot);
    addButton.dispatchEvent(new CustomEvent('click'));
    addButton.dispatchEvent(new CustomEvent('click'));
    addButton.dispatchEvent(new CustomEvent('click'));

    return Promise.resolve().then(() => {
      // Then
      const entries = element.shadowRoot.querySelectorAll('app-entry');

      expect(entries).toBeTruthy();
      expect(entries.length).toBeTruthy();
      expect(entries.length).toBe(3);
    });
  });

  test('Save is called on Add', () => {
    /**
     * Given
     * Component is Loaded
     *
     * When
     * Clicking the Add Button
     *
     * Then
     * The new entry is saved
     */

    // Given
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    // When
    const addButton = getAddButton(element.shadowRoot);
    addButton.dispatchEvent(new CustomEvent('click'));

    return Promise.resolve().then(() => {
      // Then
      expect(localStorage.getItem('storage')).toBeTruthy();
      let storage = load();
      expect(storage.entries[0]).toBeTruthy();
    });
  });
});

describe('Clear related tests', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    clearStorage();
  });

  test('Clear button exists and is disabled by defaut', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * Component is Loaded
     */
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * Then
     * 1. The Clear-button exists
     * 2. The clear-button is disabled
     */
    const clearButton = getClearButton(element.shadowRoot);
    expect(clearButton).toBeTruthy();
    expect(clearButton.disabled).toBe(true);
  });

  test('Clear is enabled if data was loaded', () => {
    /**
     * Given
     * data of current version is loaded
     */
    setCurrentVersionDummyData();

    /**
     * When
     * Component is Loaded
     */
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * Then
     * 1. The Clear-button exists
     * 2. The clear-button is disabled
     */
    const clearButton = getClearButton(element.shadowRoot);
    expect(clearButton).toBeTruthy();
    expect(clearButton.disabled).toBe(false);
  });

  test('confirm of the clear modal resets list', () => {
    /**
     * Given
     * 1. Component is Loaded
     * 2. Has existing Entries
     */
    setCurrentVersionDummyData();
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    const entriesBeforeClearing = element.shadowRoot.querySelectorAll(
      'app-entry'
    );
    expect(entriesBeforeClearing.length).toBe(2);

    /**
     * When
     * Clear-Modal is confirmed
     */
    const clearingModal = element.shadowRoot.querySelector('.modal-clear');
    clearingModal.dispatchEvent(new CustomEvent('confirm'));

    //wait for confirm-click to be processed
    return Promise.resolve().then(() => {
      /**
       * Then
       * All entries are removed
       */
      const entriesAfterClearing = element.shadowRoot.querySelectorAll(
        'app-entry'
      );
      expect(entriesAfterClearing.length).toBe(0);

      const clearButton = getClearButton(element.shadowRoot);
      expect(clearButton.disabled).toBe(true);
    });
  });

  test('clear does not delete storage', () => {
    /**
     * Given
     * 1. Existing data with current data version
     * 2. Component is Loaded
     */
    setCurrentVersionDummyData();
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * When
     * The clear modal is confirmed
     */
    const clearingModal = element.shadowRoot.querySelector('.modal-clear');
    clearingModal.dispatchEvent(new CustomEvent('confirm'));

    //wait for confirm-click to be processed
    return Promise.resolve().then(() => {
      /**
       * Then
       * 1. The storage is not null
       * 2. The entry list is empty
       */
      let storageString = localStorage.getItem('storage');
      expect(storageString).not.toBe(null);
      let storage = JSON.parse(storageString);
      expect(storage).toBeTruthy();
      expect(storage.settings).toBeTruthy();
      expect(Array.isArray(storage.entries)).toBe(true);
      expect(storage.entries.length).toBe(0);
    });
  });
});

describe('check delete', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    clearStorage();
  });

  test('check delete', () => {
    /**
     * Given
     * Four entries
     *
     * When
     * Recieving delete-event of third entry
     *
     * Then
     * 1. third entry is removed.
     * 2. 1st, 2nd, 4th entry remain in list
     */
    const indexAttributeName = 'data-index';

    // Given
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    const addButton = getAddButton(element.shadowRoot);
    addButton.dispatchEvent(new CustomEvent('click'));
    addButton.dispatchEvent(new CustomEvent('click'));
    addButton.dispatchEvent(new CustomEvent('click'));
    addButton.dispatchEvent(new CustomEvent('click'));

    return Promise.resolve().then(() => {
      const entriesOriginal = element.shadowRoot.querySelectorAll('app-entry');
      expect(entriesOriginal.length).toBe(4);

      // add comment for identifying entries
      for (let index = 0; index < entriesOriginal.length; index++) {
        const entryOriginal = entriesOriginal[index];
        entryOriginal.comment = 'entry ' + index;
      }

      // When
      let thirdEntry = entriesOriginal[2];
      thirdEntry.dispatchEvent(new CustomEvent('delete'));

      // Then
      return Promise.resolve().then(() => {
        // get list of new entries
        const entriesResult = element.shadowRoot.querySelectorAll('app-entry');

        // check one Entry was removed
        expect(entriesResult.length).toBe(3);
        expect(entriesResult[0].comment).toBe(entriesOriginal[0].comment);
        expect(entriesResult[1].comment).toBe(entriesOriginal[1].comment);
        // entriesOriginal[2] is missing now
        expect(entriesResult[2].comment).toBe(entriesOriginal[3].comment);
      });
    });
  });
});

describe('Download', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    clearStorage();
  });

  test('Button esists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The component added
     */
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * Then
     * The Download button exists
     */
    const downloadButton = getDownloadButton(element.shadowRoot);
    expect(downloadButton).toBeTruthy();
  });

  test('Download button exists and as enabled when data exists', () => {
    /**
     * Given
     * Data in current data version
     */
    setCurrentVersionDummyData();

    /**
     * When
     * The component added
     */
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * Then
     * The button is enabled
     */
    const downloadButton = getDownloadButton(element.shadowRoot);
    expect(downloadButton.disabled).toBe(false);
  });

  test('Download button exists and is disabled when no data exists', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     * The component added
     */
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * Then
     * The button is disabled
     */
    const downloadButton = getDownloadButton(element.shadowRoot);
    expect(downloadButton.disabled).toBe(true);
  });

  test('On clear button is disabled', () => {
    /**
     * Given
     * 1. Data in current data version
     * 2. The component is added
     */
    setCurrentVersionDummyData();
    const element = createElement('app-timeTracking', { is: TimeTracking });
    document.body.appendChild(element);

    /**
     * When
     * The list is cleared
     */
    const clearConfirmButton = element.shadowRoot.querySelector(
      'ui-modal-confirmable'
    );
    clearConfirmButton.dispatchEvent(new CustomEvent('confirm'));

    //wait for click event to be processed
    return Promise.resolve().then(() => {
      /**
       * Then
       * The button is disabled
       */
      const downloadButton = getDownloadButton(element.shadowRoot);
      expect(downloadButton.disabled).toBe(true);
    });
  });
});

function clearStorage() {
  localStorage.setItem('storage', JSON.stringify({}));
}

function setCurrentVersionDummyData() {
  setVersion4DummyData();
}

function setVersion3DummyData() {
  const data = {
    settings: {
      version: 'v0.3'
    },
    entries: [
      {
        sortnumber: 0,
        comment: 'entry1',
        start: 0,
        end: 1000
      },
      {
        sortnumber: 1,
        comment: 'entry2',
        start: 0,
        end: 1800000
      }
    ]
  };

  localStorage.setItem('storage', JSON.stringify(data));
}

function setVersion4DummyData() {
  const data = {
    settings: {
      version: 'v0.4'
    },
    entries: [
      {
        itemId: 0,
        sortnumber: 0,
        comment: 'entry1',
        start: 0,
        end: 1000
      },
      {
        itemId: 1,
        sortnumber: 1,
        comment: 'entry2',
        start: 50,
        end: 1800000
      }
    ]
  };

  localStorage.setItem('storage', JSON.stringify(data));
}

function getAddButton(shadowRoot) {
  const allFoundElements = getElementBySelectorAll(shadowRoot, '.button-add');
  // check whether there is one for each layout
  expect(allFoundElements.length).toBe(2);
  return allFoundElements[0];
}

function getClearButton(shadowRoot) {
  const allFoundElements = getElementBySelectorAll(shadowRoot, '.button-clear');
  // check whether there is one for each layout
  expect(allFoundElements.length).toBe(2);
  return allFoundElements[0];
}

function getDownloadButton(shadowRoot) {
  return getElementBySelectorAll(shadowRoot, '.button-export');
}

function getElementBySelectorAll(shadowRoot, classname) {
  const resultList = shadowRoot.querySelectorAll(classname);
  return resultList;
}
