import { createElement } from 'lwc';
import Filter from 'app/filter';

describe('attributes', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
  /*
  describe('inactive', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test('filters can be disabled with flag', () => {
      expect(1).toBe(2);
    });
  });
*/

  describe('type', () => {
    test('input type is defined by parameter - date', () => {
      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      document.body.appendChild(element);

      const input = element.shadowRoot.querySelector('input');
      expect(input.type).toBe('date');
    });

    test('input type is defined by parameter - text', () => {
      const element = createElement('app-filter', { is: Filter });
      element.type = 'text';
      document.body.appendChild(element);

      const input = element.shadowRoot.querySelector('input');
      expect(input.type).toBe('text');
    });

    test('operators depend on type - text', () => {
      const element = createElement('app-filter', { is: Filter });
      element.type = 'text';
      document.body.appendChild(element);

      const operatorOptions = element.shadowRoot.querySelectorAll(
        '.filter-operator option'
      );
      expect(operatorOptions.length).toBe(4);
      expect(operatorOptions[0].value).toBe('startsWithWithoutCase');
      expect(operatorOptions[1].value).toBe('containsWithoutCase');
      expect(operatorOptions[2].value).toBe('startsWithWithCase');
      expect(operatorOptions[3].value).toBe('containsWithCase');
    });

    test('operators depend on type - date', () => {
      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      document.body.appendChild(element);

      const operatorOptions = element.shadowRoot.querySelectorAll(
        '.filter-operator option'
      );
      expect(operatorOptions.length).toBe(2);
      expect(operatorOptions[0].value).toBe('greaterThanOrEqual');
      expect(operatorOptions[1].value).toBe('lessOrEqual');
    });
  });

  /* 
  describe('value', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test('defines initial filter value', () => {
      expect(1).toBe(2);
    });
  });
 */
  /* 
  describe('operator', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test('if invalid operator is passed, first entry is selected', () => {
      expect(1).toBe(2);
    });

    test('defines selected operator', () => {
      expect(1).toBe(2);
    });
  });
 */
  describe('path', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test('if invalid path is passed, first entry is selected', () => {
      /**
       * Given
       * -
       */

      /**
       * When
       * the filter component is created with the 'path' attribue set to 'someValue'
       */
      const testPath1 = 'testPath1';
      const testLabel1 = 'testLabel1';
      const testPath2 = 'testPath2';
      const testLabel2 = 'testLabel2';
      const fieldParameter = [
        { path: testPath1, label: testLabel1 },
        { path: testPath2, label: testLabel2 }
      ];

      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      element.paths = fieldParameter;
      element.path = 'someValue';
      document.body.appendChild(element);

      return Promise.resolve().then(() => {
        /**
         * Then
         * the selected path is the first one in list
         */
        const selectElement = element.shadowRoot.querySelector(
          '.filter-path select'
        );
        expect(selectElement.value).toBe(fieldParameter[0].path);
      });
    });

    test('defines selected path', () => {
      /**
       * Given
       * -
       */

      /**
       * When
       * the filter component is created with the 'path' attribue set to 'testPath2'
       */
      const testPath1 = 'testPath1';
      const testLabel1 = 'testLabel1';
      const testPath2 = 'testPath2';
      const testLabel2 = 'testLabel2';
      const fieldParameter = [
        { path: testPath1, label: testLabel1 },
        { path: testPath2, label: testLabel2 }
      ];

      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      element.paths = fieldParameter;
      element.path = testPath2;
      document.body.appendChild(element);

      return Promise.resolve().then(() => {
        /**
         * Then
         * Option connected with value 'testPath2' is selected in path picklist
         */
        const selectElement = element.shadowRoot.querySelector(
          '.filter-path select'
        );
        expect(selectElement.value).toBe(testPath2);
      });
    });
  });

  describe('paths', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test("'paths' defines a select for defined fields", () => {
      const testPath1 = 'testPath1';
      const testLabel1 = 'testLabel1';
      const testPath2 = 'testPath2';
      const testLabel2 = 'testLabel2';
      const fieldParameter = [
        { path: testPath1, label: testLabel1 },
        { path: testPath2, label: testLabel2 }
      ];

      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      element.paths = fieldParameter;
      document.body.appendChild(element);

      return Promise.resolve().then(() => {
        const selectElements = element.shadowRoot.querySelectorAll(
          '.filter-path option'
        );
        expect(selectElements.length).toBe(2);
        expect(selectElements[0].value).toBe(testPath1);
        expect(selectElements[0].label).toBe(testLabel1);
        expect(selectElements[1].value).toBe(testPath2);
        expect(selectElements[1].label).toBe(testLabel2);
      });
    });
  });
});

describe('api functions', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  describe('isMatch', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test("Date - returns 'true' if object matches filter", () => {
      const fieldParameter = [{ path: 'startAttribute', label: 'startLabel' }];
      const testObject = { startAttribute: new Date('2000-06-01').getTime() };
      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      element.paths = fieldParameter;
      document.body.appendChild(element);

      const attributeSelect = element.shadowRoot.querySelector(
        '.filter-path select'
      );
      attributeSelect.value = 'startAttribute';
      //attributeSelect.dispatchEvent(new CustomEvent('change'));

      const operatorSelect = element.shadowRoot.querySelector(
        '.filter-operator select'
      );
      operatorSelect.value = 'greaterThanOrEqual';
      //operatorSelect.dispatchEvent(new CustomEvent('change'));

      const inputCompareValue = element.shadowRoot.querySelector('input');
      inputCompareValue.value = '2000-01-01';
      inputCompareValue.dispatchEvent(new CustomEvent('change'));

      // give 'time' to process asychronous event handling
      return Promise.resolve().then(() => {
        const result = element.isMatch(testObject);
        expect(result).toBe(true);
      });
    });

    test("Date - returns 'false' if object does not matches filter", () => {
      const fieldParameter = [{ path: 'startAttribute', label: 'startLabel' }];
      const testObject = { startAttribute: new Date('2000-06-01').getTime() };
      const element = createElement('app-filter', { is: Filter });
      element.type = 'date';
      element.paths = fieldParameter;
      document.body.appendChild(element);

      const attributeSelect = element.shadowRoot.querySelector(
        '.filter-path select'
      );
      expect(attributeSelect).toBeTruthy();
      attributeSelect.value = 'startAttribute';
      //attributeSelect.dispatchEvent(new CustomEvent('change'));

      const operatorSelect = element.shadowRoot.querySelector(
        '.filter-operator select'
      );
      expect(operatorSelect).toBeTruthy();
      operatorSelect.value = 'greaterThanOrEqual';
      //operatorSelect.dispatchEvent(new CustomEvent('change'));

      const inputCompareValue = element.shadowRoot.querySelector('input');
      expect(inputCompareValue).toBeTruthy();
      inputCompareValue.value = '2000-12-01';
      inputCompareValue.dispatchEvent(new CustomEvent('change'));

      // give 'time' to process asychronous event handling
      return Promise.resolve().then(() => {
        const result = element.isMatch(testObject);
        expect(result).toBe(false);
      });
    });
    describe('type text', () => {
      test("containsWithCase - returns 'true' if the selected field contains text", () => {
        const CONTAINING_TEXT = 'abcd';
        const fieldParameter = [{ path: 'comment', label: 'Kommentar' }];
        const testObject = {
          comment: 'comment ' + CONTAINING_TEXT + 'value'
        };
        const element = createElement('app-filter', { is: Filter });
        element.type = 'text';
        element.paths = fieldParameter;
        element.operator = 'containsWithCase';
        document.body.appendChild(element);

        const inputCompareValue = element.shadowRoot.querySelector('input');
        expect(inputCompareValue).toBeTruthy();
        inputCompareValue.value = CONTAINING_TEXT;
        inputCompareValue.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
          const result = element.isMatch(testObject);
          expect(result).toBe(true);
        });
      });

      test("containsWithoutCase - returns 'true' if the selected field contains the same text in different case", () => {
        const CONTAINING_TEXT = 'abcd';
        const fieldParameter = [{ path: 'comment', label: 'Kommentar' }];
        const testObject = {
          comment: 'comment ' + CONTAINING_TEXT + 'value'
        };
        const element = createElement('app-filter', { is: Filter });
        element.type = 'text';
        element.paths = fieldParameter;
        element.operator = 'containsWithoutCase';
        document.body.appendChild(element);

        const inputCompareValue = element.shadowRoot.querySelector('input');
        expect(inputCompareValue).toBeTruthy();
        inputCompareValue.value = CONTAINING_TEXT.toUpperCase();
        inputCompareValue.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
          const result = element.isMatch(testObject);
          expect(result).toBe(true);
        });
      });

      test('startsWithWithoutCase: returns true if object fields starts with value', () => {
        const STARTING_TEXT = 'abcd';
        const fieldParameter = [{ path: 'comment', label: 'Kommentar' }];
        const testObject = {
          comment: STARTING_TEXT + 'comment value'
        };
        const element = createElement('app-filter', { is: Filter });
        element.type = 'text';
        element.paths = fieldParameter;
        element.operator = 'startsWithWithoutCase';
        element.value = STARTING_TEXT;
        document.body.appendChild(element);

        const result = element.isMatch(testObject);
        expect(result).toBe(true);
      });

      test('startsWithWithCase: returns true if object fields starts with same value in same case', () => {
        const STARTING_TEXT = 'abcd';
        const fieldParameter = [{ path: 'comment', label: 'Kommentar' }];
        const testObject = {
          comment: STARTING_TEXT + 'comment value'
        };
        const element = createElement('app-filter', { is: Filter });
        element.type = 'text';
        element.paths = fieldParameter;
        element.operator = 'startsWithWithCase';
        element.value = STARTING_TEXT;
        document.body.appendChild(element);

        const result = element.isMatch(testObject);
        expect(result).toBe(true);
      });

      test('startsWithWithCase: returns false if object fields starts with same value in same case', () => {
        const STARTING_TEXT = 'abcd';
        const fieldParameter = [{ path: 'comment', label: 'Kommentar' }];
        const testObject = {
          comment: STARTING_TEXT + 'comment value'
        };
        const element = createElement('app-filter', { is: Filter });
        element.type = 'text';
        element.paths = fieldParameter;
        element.operator = 'startsWithWithCase';
        element.value = STARTING_TEXT.toUpperCase();
        document.body.appendChild(element);

        const result = element.isMatch(testObject);
        expect(result).toBe(false);
      });
    });
  });
});
