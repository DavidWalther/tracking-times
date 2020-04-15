import { LightningElement, api } from 'lwc';

// eslint-disable-next-line no-unused-vars
const DESIGNS = ['accept', 'info', 'deny', 'cancel', 'confirm', 'classic'];

export default class Button extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  @api
  design;

  @api
  value;

  @api
  disabled;

  //----------------------------
  // Callbacks
  //----------------------------

  renderedCallback() {
    this.setDisabled();
    this.applyDesign();
  }

  //----------------------------
  // Handler
  //----------------------------

  handleClick(originalevent) {
    originalevent.stopPropagation();
    this.processClick();
  }

  //----------------------------
  // Actions
  //----------------------------

  setDisabled() {
    const button = this.getInputButton();
    button.disabled = this.disabled;
  }

  applyDesign() {
    const design = this.design;
    let storedDesignIsDefined = DESIGNS.includes(design);

    const button = this.getInputButton();
    // remove all existing designs
    DESIGNS.forEach(designCls => {
      button.classList.remove(designCls);
    });

    if (storedDesignIsDefined) {
      button.classList.add('button');
      button.classList.add(design);
    }
  }

  processClick() {
    const relayEvent = new CustomEvent('click');
    this.dispatchEvent(relayEvent);
  }

  //----------------------------
  // Element selectors
  //----------------------------

  getInputButton() {
    return this.template.querySelector('input');
  }
}
