import { LightningElement, api } from 'lwc';

export default class ModalButton extends LightningElement {
    @api
    design;

    @api
    value;

    get isDesignAccept() {
        return this.design === 'accept';
    }

    get isDesignInfo() {
        return this.design === 'info';
    }

    get isDesignDeny() {
        return this.design === 'deny';
    }

    get isDesignCancel() {
        return this.design === 'cancel';
    }

    get isDesignConfirm() {
        return this.design === 'confirm';
    }
}
