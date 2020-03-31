import { createElement } from 'lwc';
import BooleanAttribute from 'recipe/booleanAttribute';

describe('value: false', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('not setting value evaluates to false', () => {
    const element = createElement('recipe-boolean-attribute', {
      is: BooleanAttribute
    });
    document.body.appendChild(element);

    const spanList = element.shadowRoot.querySelectorAll('span');
    // check markup
    expect(spanList).toBeDefined();
    expect(spanList.length).toBe(1);
    expect(spanList[0].classList).toContain('negative');

    // check poperty
    expect(element.toggle).toBe(false);
  });

  test('value false evaluates to false', () => {
    const element = createElement('recipe-boolean-attribute', {
      is: BooleanAttribute
    });
    element.toggle = false;
    document.body.appendChild(element);

    const spanList = element.shadowRoot.querySelectorAll('span');
    // check markup
    expect(spanList).toBeDefined();
    expect(spanList.length).toBe(1);
    expect(spanList[0].classList).toContain('negative');

    // check poperty
    expect(element.toggle).toBe(false);
  });
});

describe('value: true', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('value true evaluates to true', () => {
    const element = createElement('recipe-boolean-attribute', {
      is: BooleanAttribute
    });
    element.toggle = true;
    document.body.appendChild(element);

    const spanList = element.shadowRoot.querySelectorAll('span');

    // check markup
    expect(spanList).toBeDefined();
    expect(spanList.length).toBe(1);
    expect(spanList[0].classList).toContain('positive');

    // check poperty
    expect(element.toggle).toBe(true);
  });

  test('literal value evaluates to true', () => {
    const element = createElement('recipe-boolean-attribute', {
      is: BooleanAttribute
    });
    element.toggle = 'test';
    document.body.appendChild(element);

    const spanList = element.shadowRoot.querySelectorAll('span');

    // check markup
    expect(spanList).toBeDefined();
    expect(spanList.length).toBe(1);
    expect(spanList[0].classList).toContain('positive');

    // check poperty
    expect(element.toggle).toBe(true);
  });
});
