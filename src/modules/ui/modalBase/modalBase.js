import { LightningElement, api } from 'lwc';

export default class ModalBase extends LightningElement {
  visible = false;

  @api
  isVisible() {
    return this.visible;
  }

  @api
  hide() {
    this.hideModal();
  }

  @api
  show() {
    this.showModal();
  }

  showModal() {
    const modalElem = this.getModalContainer();

    this.visible = true;
    this.setElemDisplay(modalElem, 'flex');
  }

  hideModal() {
    const modalElem = this.getModalContainer();

    this.visible = false;
    this.setElemDisplay(modalElem, 'none');
  }

  handleClickClose() {
    this.hideModal();
  }

  setElemDisplay(elem, displayValue) {
    elem.style.display = displayValue;
  }

  getModalContainer() {
    return this.template.querySelector('div.modal');
  }
}
