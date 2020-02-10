/* eslint-disable no-unused-vars */

import { createElement } from 'lwc';
import ModalConfirmable from 'ui/modalConfirmable';

describe('visibility controls', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('has isVisible method', () => {
        let isVisible;
        /**
         * Given
         * The component is added to Dom
         */
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        document.body.appendChild(element);

        /**
         * When
         * Calling 'isVisible' method
         */
        isVisible = element.isVisible();

        /**
         * Then
         * returns false by default
         */
        expect(isVisible).toBe(false);
    });

    test('has show function', () => {
        let isVisible;
        /**
         * Given
         * The DOM contains the component
         */
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        document.body.appendChild(element);

        /**
         * When
         * Calling 'show' method
         */
        element.show();

        /**
         * Then
         * The Component is Visible
         */
        isVisible = element.isVisible();
        expect(isVisible).toBe(true);
    });

    test('has hide method', () => {
        let isVisible;
        /**
         * Given
         * 1. The DOM contains the component
         * 2. The Modal is visible
         */
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        document.body.appendChild(element);
        element.show();

        /**
         * When
         * Calling 'hide' method
         */
        element.hide();

        /**
         * Then
         * The Modal is hidden
         */
        isVisible = element.isVisible();
        expect(isVisible).toBe(false);
    });
});

describe('check api attributes', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('Header shows title-attribute', () => {
        /**
         * Given
         * 1. The DOM contains the component
         * 2. The component markup contains a title
         */
        const testTitle = 'A1B2';
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        element.title = testTitle;
        document.body.appendChild(element);

        /**
         * When
         * -
         */

        /**
         * Then
         * The header section contains the given title
         */

        const headerContainers = element.shadowRoot.querySelectorAll(
            'div[slot=header] > span'
        );
        expect(headerContainers[0].innerHTML).toBe(testTitle);
    });

    test('confirm-button has shows confirmLabel-attribute', () => {
        /**
         * Given
         * 1. The DOM contains the component
         * 2. The component markup contains a title
         */
        const testLabel = 'A1B2';
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        element.confirmLabel = testLabel;
        document.body.appendChild(element);

        /**
         * When
         * -
         */

        /**
         * Then
         * The confirm-button has the given label
         */

        const confirmButtons = element.shadowRoot.querySelectorAll('.confirm');
        expect(confirmButtons[0].value).toBe(testLabel);
    });

    test('cancel-button has shows cancelLabel-attribute', () => {
        /**
         * Given
         * 1. The DOM contains the component
         * 2. The component markup contains a title
         */
        const testLabel = 'A1B2';
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        element.cancelLabel = testLabel;
        document.body.appendChild(element);

        /**
         * When
         * -
         */

        /**
         * Then
         * The confirm-button has the given label
         */

        const cancelButtons = element.shadowRoot.querySelectorAll('.cancel');
        expect(cancelButtons[0].value).toBe(testLabel);
    });
});

describe('Slots', () => {
    describe('Header', () => {
        afterEach(() => {
            // The jsdom instance is shared across test cases in a single file so reset the DOM
            while (document.body.firstChild) {
                document.body.removeChild(document.body.firstChild);
            }
        });

        test('shows "title" attribute', () => {
            /**
             * Given
             * The DOM contains the component
             */
            const testTitle = 'A1B2';
            const element = createElement('ui-modal-confirmable', {
                is: ModalConfirmable
            });
            element.title = testTitle;
            document.body.appendChild(element);

            /**
             * When
             * -
             */

            /**
             * Then
             * The header section contains the given title
             */

            const headerContainers = element.shadowRoot.querySelectorAll(
                'div[slot=header] > span'
            );
            expect(headerContainers.length).toBe(1);
        });
    });
    describe('Body', () => {
        afterEach(() => {
            // The jsdom instance is shared across test cases in a single file so reset the DOM
            while (document.body.firstChild) {
                document.body.removeChild(document.body.firstChild);
            }
        });

        test('check body exists and is assigned', () => {
            /**
             * Given
             * The DOM contains the component
             */
            const element = createElement('ui-modal-confirmable', {
                is: ModalConfirmable
            });
            document.body.appendChild(element);

            /**
             * When
             * -
             */

            /**
             * Then
             * a slot for the body exits and redirects into the generic body-slot
             */
            const bodyContainers = element.shadowRoot.querySelectorAll(
                'slot[slot=body]'
            );
            expect(bodyContainers.length).toBe(1);
        });
    });

    describe('Footer', () => {
        afterEach(() => {
            // The jsdom instance is shared across test cases in a single file so reset the DOM
            while (document.body.firstChild) {
                document.body.removeChild(document.body.firstChild);
            }
        });

        test('Footer exists', () => {
            /**
             * Given
             * The DOM contains the component
             */
            const element = createElement('ui-modal-confirmable', {
                is: ModalConfirmable
            });
            document.body.appendChild(element);

            /**
             * When
             * -
             */

            /**
             * Then
             * 1. A slot for the body exits and redirects into the generic body-slot
             * 2. The footer contains a confirm button
             */
            const footerContainers = element.shadowRoot.querySelectorAll(
                'div[slot=footer]'
            );
            expect(footerContainers.length).toBe(1);
        });

        test('Confirm button', () => {
            /**
             * Given
             * The DOM contains the component
             */
            const element = createElement('ui-modal-confirmable', {
                is: ModalConfirmable
            });
            document.body.appendChild(element);

            /**
             * When
             * -
             */

            /**
             * Then
             * The footer contains a confirm button
             */
            const confirmButtons = element.shadowRoot.querySelectorAll(
                'div[slot=footer] > .confirm'
            );
            expect(confirmButtons.length).toBe(1);
        });

        test('Cancel button', () => {
            /**
             * Given
             * The DOM contains the component
             */
            const element = createElement('ui-modal-confirmable', {
                is: ModalConfirmable
            });
            document.body.appendChild(element);

            /**
             * When
             * -
             */

            /**
             * Then
             * The footer contains a cancel button
             */
            const cancelButtons = element.shadowRoot.querySelectorAll(
                'div[slot=footer] > .cancel'
            );
            expect(cancelButtons.length).toBe(1);
        });
    });
});

describe('Events', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('check confirm event', () => {
        const handler = jest.fn();
        /**
         * Given
         * The DOM contains the component
         */
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        element.addEventListener('confirm', handler);
        document.body.appendChild(element);

        /**
         * When
         * The confirm-button is clicked
         */
        const confirmButton = element.shadowRoot.querySelector(
            'div[slot=footer] > .confirm'
        );
        confirmButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            /**
             * Then
             * A confirm-event is fired
             */
            expect(handler).toHaveBeenCalled();
        });
    });

    test('check cancel hide modal', () => {
        const handler = jest.fn();
        /**
         * Given
         * The DOM contains the component
         */
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        element.addEventListener('cancel', handler);
        document.body.appendChild(element);

        /**
         * When
         * The cancel-button is clicked
         */
        const confirmButton = element.shadowRoot.querySelector(
            'div[slot=footer] > .cancel'
        );
        confirmButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            /**
             * Then
             * A cancel-event is fired
             */
            expect(handler).toHaveBeenCalled();
        });
    });
});
