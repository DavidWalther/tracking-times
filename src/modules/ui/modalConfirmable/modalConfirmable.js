import { LightningElement, api } from 'lwc';

export default class ModalConfirmable extends LightningElement {
    //----------------------------
    // API methods
    //----------------------------

    @api
    isVisible() {
        return this.getBaseModal().isVisible();
    }

    @api
    show() {
        return this.getBaseModal().show();
    }

    @api
    hide() {
        return this.getBaseModal().hide();
    }

    //----------------------------
    // API attributes
    //----------------------------

    @api
    title;

    @api
    confirmLabel;

    @api
    confirmDesign;

    @api
    cancelLabel;

    @api
    cancelDesign;

    //----------------------------
    // Handlers
    //----------------------------

    handleButtonClickConfirm() {
        this.fireEventConfirm();
    }

    handleButtonClickCancel() {
        this.fireEventCancel();
    }

    //----------------------------
    // Util
    //----------------------------

    getBaseModal() {
        return this.template.querySelector('.modal-base');
    }

    fireEventConfirm() {
        var evt;
        evt = new CustomEvent('confirm');
        this.dispatchEvent(evt);
    }

    fireEventCancel() {
        var evt;
        evt = new CustomEvent('cancel');
        this.dispatchEvent(evt);
    }
}
