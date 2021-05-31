import { createElement } from 'lwc';
import Filter from 'app/filter';

describe('attributes', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  describe('filter-type', () => {
    /*test("text filter section is displayed on type 'text'.", () => {
      const element = createElement('app-filter', { is: Filter });
      element.filterType = 'text';
      document.body.appendChild(element);

      const elements_ToCheck = element.shadowRoot.querySelectorAll('.filter');
      expect(elements_ToCheck.length).toBe(1);
      expect(elements_ToCheck[0].classList).toContain('filter-text');
    });*/
    /*
    test("date filter section is displayed on type 'date'.", () => {
      const element = createElement('app-filter', { is: Filter });
      element.filterType = 'date';
      document.body.appendChild(element);

      const elements_ToCheck = element.shadowRoot.querySelectorAll('.filter');
      expect(elements_ToCheck.length).toBe(1);
      expect(elements_ToCheck[0].classList).toContain('filter-date');
    });*/
  });
});

describe('api functions', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  describe('setFilterPaths', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });
    /*
    test("'setFilterPaths' is defined with guardians", () => {
      const element = createElement('app-filter', { is: Filter });
      try {
        element.paths();
      } catch (exc) {
        expect(exc.message).toBe("'filtersPaths' must be defined");
      }
      try {
        element.setFilterPaths('value');
      } catch (exc) {
        expect(exc.message).toBe("'filtersPaths' must be an array");
      }
      try {
        const array = ['value', 'test'];
        element.setFilterPaths(array);
      } catch (exc) {
        expect(exc.message).toBe(
          "each entry of 'filtersPaths' must have a 'path' attribute"
        );
      }
      try {
        const array = [{ path: 'test' }];
        element.setFilterPaths(array);
      } catch (exc) {
        expect(exc.message).toBe(
          "each entry of 'filtersPaths' must have a 'label' attribute"
        );
      }
      const array = [
        {
          path: 'testPath',
          label: 'testLabel'
        }
      ];
      element.setFilterPaths(array);
    });
*/
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
