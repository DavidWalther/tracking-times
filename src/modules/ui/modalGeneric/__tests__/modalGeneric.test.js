import { createElement } from 'lwc';
import ModalGeneric from 'ui/modalGeneric';

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
        const element = createElement('ui-modal-generic', {
            is: ModalGeneric
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
        const element = createElement('ui-modal-generic', {
            is: ModalGeneric
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
        const element = createElement('ui-modal-generic', {
            is: ModalGeneric
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
