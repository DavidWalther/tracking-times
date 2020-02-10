import { LightningElement, track, api } from 'lwc';

export default class Entry extends LightningElement {
    @api
    get title() {
        return this.label.title;
    }
    set title(value) {
        this.label.title = value;
    }

    @api
    show() {
        this.showModal();
    }

    @track
    label = {
        title: 'Head',
        button: {
            confirm: 'Save',
            cancel: 'Close'
        }
    };

    //----------------------
    // Event handler
    //----------------------

    handleButtonClickCancel() {
        this.hideModal();
        this.fireEventCancel();
    }

    handleButtonClickConfirm() {
        this.hideModal();
        this.fireEventConfirm();
    }

    //----------------------
    // Busines logig
    //----------------------

    fireEventCancel() {
        var evt;
        evt = new CustomEvent('cancel');
        this.dispatchEvent(evt);
    }

    fireEventConfirm() {
        var evt;
        evt = new CustomEvent('confirm');
        this.dispatchEvent(evt);
    }

    hideModal() {
        let modalElem = this.getModalContainer();
        modalElem.hide();
    }

    showModal() {
        let modalElem = this.getModalContainer();
        modalElem.show();
    }

    setElemDisplay(elem, displayValue) {
        elem.style.display = displayValue;
    }

    //----------------------
    // Element getter
    //----------------------

    getModalContainer() {
        let modal = this.template.querySelector('.modal');
        return modal;
    }
}
