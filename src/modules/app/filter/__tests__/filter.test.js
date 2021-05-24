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
    test("text filter section is displayed on type 'text'.", () => {
      const element = createElement('app-filter', { is: Filter });
      element.filterType = 'text';
      document.body.appendChild(element);

      const elements_ToCheck = element.shadowRoot.querySelectorAll('.filter');
      expect(elements_ToCheck.length).toBe(1);
      expect(elements_ToCheck[0].classList).toContain('filter-text');
    });

    test("date filter section is displayed on type 'date'.", () => {
      const element = createElement('app-filter', { is: Filter });
      element.filterType = 'date';
      document.body.appendChild(element);

      const elements_ToCheck = element.shadowRoot.querySelectorAll('.filter');
      expect(elements_ToCheck.length).toBe(1);
      expect(elements_ToCheck[0].classList).toContain('filter-date');
    });

    test("A 'filtertypeset' event is fired on setting the attribute", () => {
      const handler = jest.fn();

      const element = createElement('app-filter', { is: Filter });
      element.addEventListener('filtertype', handler);
      element.filterType = 'date';
      document.body.appendChild(element);

      return Promise.resolve().then(() => {
        expect(handler).toHaveBeenCalled();
      });
    });

    test("A 'filtertypeset' event is fired on changing the attribute", () => {
      const handler = jest.fn();

      const element = createElement('app-filter', { is: Filter });
      element.addEventListener('filtertype', handler);
      element.filterType = 'date';
      document.body.appendChild(element);

      return Promise.resolve()
        .then(() => {
          expect(handler).toHaveBeenCalledTimes(1);
          element.filterType = 'text';
        })
        .then(() => {
          expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    test("The 'filtertypeset' event contains the selected type", () => {
      const handler = jest.fn();
      const FILTER_TYPE = 'random';

      const element = createElement('app-filter', { is: Filter });
      element.addEventListener('filtertype', handler);
      element.filterType = FILTER_TYPE;
      document.body.appendChild(element);

      return Promise.resolve().then(() => {
        expect(handler.mock.calls[0][0].detail.filterType).toBe(FILTER_TYPE);
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

  describe('setFilterPaths', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    test("'setFilterPaths' is defined with guardians", () => {
      const element = createElement('app-filter', { is: Filter });
      try {
        element.setFilterPaths();
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

    test("'setFilterPaths' defines a select for defined fields", () => {
      const testPath1 = 'testPath1';
      const testLabel1 = 'testLabel1';
      const testPath2 = 'testPath2';
      const testLabel2 = 'testLabel2';
      const fieldParameter = [
        { path: testPath1, label: testLabel1 },
        { path: testPath2, label: testLabel2 }
      ];

      const element = createElement('app-filter', { is: Filter });
      element.filterType = 'date';
      document.body.appendChild(element);
      element.setFilterPaths(fieldParameter);

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
