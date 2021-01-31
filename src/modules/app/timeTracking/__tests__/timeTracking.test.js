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
    expect(entriesBeforeClearing.length).toBe(3);

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
      let thirdEntryId = entriesOriginal[2].itemId;
      expect(thirdEntryId).toBeTruthy();

      // When
      let thirdEntry = entriesOriginal[2];
      thirdEntry.dispatchEvent(
        new CustomEvent('delete', { detail: { id: thirdEntryId } })
      );

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

    return Promise.resolve().then(() => {
      /**
       * Then
       * The button is enabled
       */
      const downloadButtons = element.shadowRoot.querySelectorAll(
        '.button-export'
      );
      expect(downloadButtons.length).toBe(2);
      expect(downloadButtons[0].disabled).toBe(false);
      expect(downloadButtons[1].disabled).toBe(false);
    });
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
    const downloadButton = getDownloadButton(element.shadowRoot)[0];
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
      'ui-modal-confirmable.modal-clear'
    );
    clearConfirmButton.dispatchEvent(new CustomEvent('confirm'));

    //wait for click event to be processed
    return Promise.resolve().then(() => {
      /**
       * Then
       * The button is disabled
       */

      const downloadButtons = element.shadowRoot.querySelectorAll(
        '.button-export'
      );
      expect(downloadButtons.length).toBe(2);
      expect(downloadButtons[0].disabled).toBe(true);
      expect(downloadButtons[1].disabled).toBe(true);
    });
  });
});

describe('feature: make entries selectable', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('actions for multiple records are disabled by default', () => {
    /**
     * Given
     * -
     */

    /**
     * When
     *  - Data in current data version (three entries)
     *  - The component is added
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();

    return Promise.resolve().then(() => {
      /**
       * Then
       * actions are disabled
       */
      const buttonSummary = element.shadowRoot.querySelector('.button-summary');
      expect(buttonSummary).toBeTruthy();
      expect(buttonSummary.disabled).toBe(true);
    });
  });

  test('selecting a single record does not enables actions for multiple records', () => {
    /**
     * Given
     * - Data in current data version (three entries)
     * - The component is added
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();

    /**
     * When
     * - the second entry is selected
     */
    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    expect(secondEntry).toBeTruthy();
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );

    return Promise.resolve().then(() => {
      /**
       * Then
       * actions are enabled
       */
      const buttonSummary = element.shadowRoot.querySelector('.button-summary');
      expect(buttonSummary).toBeTruthy();
      expect(buttonSummary.disabled).toBe(true);
    });
  });

  test('selecting two records enables actions for multiple records', () => {
    /**
     * Given
     * - Data in current data version (three entries)
     * - The component is added
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();

    /**
     * When
     * - the second entry is selected
     */
    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    expect(secondEntry).toBeTruthy();
    expect(thirdEntry).toBeTruthy();
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    return Promise.resolve().then(() => {
      /**
       * Then
       * actions are enabled
       */
      const buttonSummary = element.shadowRoot.querySelector('.button-summary');
      expect(buttonSummary).toBeTruthy();
      expect(buttonSummary.disabled).toBe(false);
    });
  });

  test('actions for multiple records are disabled if records are deselected', () => {
    /**
     * Given
     * - Data in current data version (three entries)
     * - The component is added
     * - two entries are selected + summary button is enabled
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();
    const buttonSummary = element.shadowRoot.querySelector('.button-summary');
    // summary button is disabled
    expect(buttonSummary.disabled).toBe(true);

    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    expect(secondEntry).toBeTruthy();
    expect(thirdEntry).toBeTruthy();
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    // summary button is enabled
    expect(buttonSummary.disabled).toBe(false);

    /**
     * When
     * one record is deselected
     */
    secondEntry.dispatchEvent(
      new CustomEvent('unselect', { detail: { id: secondEntry.itemId } })
    );

    return Promise.resolve().then(() => {
      /**
       * Then
       * the summary button is disabled
       */
      expect(buttonSummary.disabled).toBe(true);
    });
  });

  test('deselect clears selection', () => {
    /**
     * Given
     * - Data in current data version (three entries)
     * - The component is added
     * - two entries are selected + summary button is enabled
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();
    const buttonDeselect = element.shadowRoot.querySelector(
      '.button-selected-deselect_all'
    );
    // summary button is disabled
    expect(buttonDeselect.disabled).toBe(true);

    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    expect(secondEntry).toBeTruthy();
    expect(thirdEntry).toBeTruthy();
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    // summary button is enabled
    expect(buttonDeselect.disabled).toBe(false);

    /**
     * When
     * the delesect button is cicked
     */
    buttonDeselect.dispatchEvent(new CustomEvent('click'));

    return Promise.resolve().then(() => {
      expect(secondEntry.selected).toBe(false);
      expect(thirdEntry.selected).toBe(false);
    });
  });

  test("'Select All' selects all Entries.", () => {
    /**
     * Given
     * - Data in current data version (three entries)
     * - The component is added
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();
    const buttonSelect = element.shadowRoot.querySelector(
      '.button-selected-select_all'
    );

    /**
     * When
     * the Select button is cicked
     */
    buttonSelect.dispatchEvent(new CustomEvent('click'));

    /**
     * Then
     * all entries are selected
     */
    const entries = element.shadowRoot.querySelectorAll('app-entry');

    expect(entries.length).toBe(3);
    expect(entries[0].selected).toBe(true);
    expect(entries[1].selected).toBe(true);
    expect(entries[2].selected).toBe(true);
  });
});

describe('feature: mass actions', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('click on summary opens the summary modal', () => {
    /**
     * Given
     * - the cmp is added to the DOM
     * - Data in current data version (three entries)
     * - two entries are selected
     */

    const element = createAndAddMainCmpAndSetCurrentVersionData();

    // select entries
    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );

    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    /**
     * When
     * the summary button is clicked
     */
    clickButtonSummary(element.shadowRoot);

    /**
     * Then
     * the summary modal is opened
     */
    const summaryModal = getSummaryModal(element.shadowRoot);
    expect(summaryModal.isVisible()).toBe(true);
  });

  test('summary modal contains data of selected entries', () => {
    /**
     * Given
     * - the cmp is added to the DOM
     * - Data in current data version (three entries)
     * - two entries are selected
     */

    const element = createAndAddMainCmpAndSetCurrentVersionData();

    // select entries
    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );

    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    /**
     * When
     * the summary button is clicked
     */
    clickButtonSummary(element.shadowRoot);

    return Promise.resolve().then(() => {
      /**
       * Then
       * the summary modal contains summed up data
       */

      const summaryModal = getSummaryModal(element.shadowRoot);

      const differenceOutput = summaryModal.querySelector(
        '.summary-difference'
      );
      const expectedDifference = secondEntry.difference + thirdEntry.difference;
      expect(differenceOutput).toBeTruthy();
      expect(differenceOutput.value).toBe('' + expectedDifference);

      const commentOutput = summaryModal.querySelector('.summary-comment');
      const expectedComment =
        secondEntry.comment + '\n=====\n' + thirdEntry.comment;
      expect(commentOutput).toBeTruthy();
      expect(commentOutput.value).toBe(expectedComment);
    });
  });

  test('"delete selected"-button are enabled on multiple record selection', () => {
    /**
     * Given
     * - the cmp is added to the DOM
     * - Data in current data version (three entries)
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();

    let deleteSelectedButtons = element.shadowRoot.querySelectorAll(
      '.button-selected-delete'
    );
    expect(deleteSelectedButtons.length).toBe(2);
    expect(deleteSelectedButtons[0].disabled).toBe(true);
    expect(deleteSelectedButtons[1].disabled).toBe(true);

    /**
     * When
     * - two entries are selected
     */
    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );

    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    /**
     * Then
     * buttons 'delete selected' are enabled
     */
    deleteSelectedButtons = element.shadowRoot.querySelectorAll(
      '.button-selected-delete'
    );
    expect(deleteSelectedButtons.length).toBe(2);
    expect(deleteSelectedButtons[0].disabled).toBe(false);
    expect(deleteSelectedButtons[1].disabled).toBe(false);
  });

  test('"delete selected"-button deletes seleced records', () => {
    /**
     * Given
     * - the cmp is added to the DOM
     * - Data in current data version (three entries)
     * - two entries are selected
     */
    const element = createAndAddMainCmpAndSetCurrentVersionData();

    const secondEntry = element.shadowRoot.querySelectorAll('app-entry')[1];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: secondEntry.itemId } })
    );

    const thirdEntry = element.shadowRoot.querySelectorAll('app-entry')[2];
    secondEntry.dispatchEvent(
      new CustomEvent('select', { detail: { id: thirdEntry.itemId } })
    );

    let deleteSelectedButtons = element.shadowRoot.querySelectorAll(
      '.button-selected-delete'
    );
    expect(deleteSelectedButtons[0].disabled).toBe(false);
    expect(deleteSelectedButtons[1].disabled).toBe(false);

    /**
     * When
     * - delete selected button is clicked
     */
    const modalDeleteSelected = element.shadowRoot.querySelector(
      'ui-modal-confirmable.modal-selected-delete'
    );
    expect(modalDeleteSelected).toBeTruthy();

    modalDeleteSelected.dispatchEvent(new CustomEvent('confirm'));

    return Promise.resolve().then(() => {
      /**
       * Then
       * the selectes entries are removed
       */

      const remainingEntries = element.shadowRoot.querySelectorAll('app-entry');
      expect(remainingEntries.length).toBe(1);
    });
  });
});

function clickButtonSummary(shadowRoot) {
  const buttonSummary = shadowRoot.querySelector('.button-summary');
  if (!buttonSummary || buttonSummary.disabled) {
    const errorObj = { message: 'button is disabled' };
    throw errorObj;
  }

  buttonSummary.dispatchEvent(new CustomEvent('click'));
}

function getSummaryModal(shadowRoot) {
  const summaryModal = shadowRoot.querySelector('.modal-summary');

  if (!summaryModal) {
    const errorObj = { message: 'summary modal not found' };
    throw errorObj;
  }

  return summaryModal;
}

function createAndAddMainCmpAndSetCurrentVersionData(elementModifications) {
  setCurrentVersionDummyData();
  const element = createElement('app-timeTracking', { is: TimeTracking });
  if (elementModifications) {
    elementModifications(element);
  }
  document.body.appendChild(element);
  return element;
}

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
      },
      {
        itemId: 2,
        sortnumber: 2,
        comment: 'entry3',
        start: 2000,
        end: 2500
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
