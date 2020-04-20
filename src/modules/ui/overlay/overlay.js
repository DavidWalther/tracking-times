import { LightningElement, api } from 'lwc';

export default class Overlay extends LightningElement {
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
    this.hideOverlay();
  }

  showOverlay() {
    this.visible = true;
    this.setElemDisplay('flex');
  }

  hideOverlay() {
    this.visible = false;
    this.setElemDisplay('none');
  }

  setElemDisplay(displayValue) {
    const overlayElem = this.getElement();
    overlayElem.style.display = displayValue;
  }

  getElement() {
    return this.template.querySelector('div.overlay');
  }
}
