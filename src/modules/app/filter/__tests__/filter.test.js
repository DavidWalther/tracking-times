import { createElement } from 'lwc';
import Filter from 'app/filter';

describe('attributes', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

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

  describe('type', () => {
    test('input type is defined by parameter', () => {
      expect(1).toBe(2);
    });

    test('operators depend on type', () => {
      expect(1).toBe(2);
    });
  });

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
  });
});
