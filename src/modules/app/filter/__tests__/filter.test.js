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
