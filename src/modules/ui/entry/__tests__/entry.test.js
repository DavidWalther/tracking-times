import { createElement } from 'lwc';
import Entry from 'ui/entry';

describe('static tests', () => {
    test('outer ccontainer exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const contentContainer = element.shadowRoot.querySelector(
            'div.content'
        );

        expect(contentContainer).toBeTruthy();
    });
});
