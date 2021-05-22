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
  });
});
