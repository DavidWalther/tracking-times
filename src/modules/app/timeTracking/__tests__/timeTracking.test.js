/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import TimeTracking from 'app/timeTracking';

describe('test core logic', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('test entry-container exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const entryListContainer = element.shadowRoot.querySelector(
            'div.entries'
        );
        expect(entryListContainer).toBeTruthy();
    });
});

describe('test creation of new entries', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('test adding first timestamp', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const entryContainers = element.shadowRoot.querySelector('div.entry');
        expect(entryContainers).toBeFalsy();

        const addButton = element.shadowRoot.querySelector('.button-add');
        expect(addButton).toBeTruthy();
        addButton.dispatchEvent(new CustomEvent('click', {}));

        return Promise.resolve().then(() => {
            const entryContainers_ToCheck = element.shadowRoot.querySelector(
                '.entries'
            );
            expect(entryContainers_ToCheck).toBeTruthy();
            expect(entryContainers_ToCheck.childNodes.length).toBe(1);
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes
            ).toBeTruthy();
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes.length
            ).toBe(2);
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[0].textContent
            ).toBe('start');
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[1].textContent
            ).toBeTruthy();
        });
    });

    test('test adding secound timestamp', () => {
        const handler = jest.fn();

        const element = createElement('app-timeTracking', { is: TimeTracking });
        element.addTimeStamp = handler;
        document.body.appendChild(element);

        const entryContainers = element.shadowRoot.querySelector('div.entry');
        expect(entryContainers).toBeFalsy();

        const addButton = element.shadowRoot.querySelector('.button-add');
        expect(addButton).toBeTruthy();
        addButton.addEventListener('click', handler);
        addButton.dispatchEvent(new CustomEvent('click', {}));
        addButton.dispatchEvent(new CustomEvent('click', {}));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls.length).toBe(2);
        return Promise.resolve().then(() => {
            const entryContainers_ToCheck = element.shadowRoot.querySelector(
                '.entries'
            );
            expect(entryContainers_ToCheck).toBeTruthy();
            expect(entryContainers_ToCheck.childNodes.length).toBe(1);
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes
            ).toBeTruthy();
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes.length
            ).toBe(4);
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[0].textContent
            ).toBe('start');
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[1].textContent
            ).toBeTruthy();
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[2].textContent
            ).toBe('end');
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[3].textContent
            ).toBeTruthy();
        });
    });

    test('test adding third timestamp', () => {
        const handler = jest.fn();

        const element = createElement('app-timeTracking', { is: TimeTracking });
        element.addTimeStamp = handler;
        document.body.appendChild(element);

        const entryContainers = element.shadowRoot.querySelector('div.entry');
        expect(entryContainers).toBeFalsy();

        const addButton = element.shadowRoot.querySelector('.button-add');
        expect(addButton).toBeTruthy();
        addButton.addEventListener('click', handler);
        addButton.dispatchEvent(new CustomEvent('click', {}));
        addButton.dispatchEvent(new CustomEvent('click', {}));
        addButton.dispatchEvent(new CustomEvent('click', {}));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls.length).toBe(3);
        return Promise.resolve().then(() => {
            const entryContainers_ToCheck = element.shadowRoot.querySelector(
                '.entries'
            );
            expect(entryContainers_ToCheck).toBeTruthy();
            expect(entryContainers_ToCheck.childNodes.length).toBe(2);
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes
            ).toBeTruthy();
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes.length
            ).toBe(4);
            //first Timestamp
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[0].textContent
            ).toBe('start');
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[1].textContent
            ).toBeTruthy();
            //second Timestamp
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[2].textContent
            ).toBe('end');
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[3].textContent
            ).toBeTruthy();
            //third Timestamp
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[0].textContent
            ).toBe('start');
            expect(
                entryContainers_ToCheck.childNodes[0].childNodes[1].textContent
            ).toBeTruthy();
        });
    });
});