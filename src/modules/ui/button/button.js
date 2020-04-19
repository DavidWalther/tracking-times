import { LightningElement, api } from 'lwc';

// eslint-disable-next-line no-unused-vars
const DESIGNS = ['accept', 'info', 'deny', 'cancel', 'confirm', 'plain'];

export default class Button extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  @api
  design;

  @api
  value;

  @api
  get disabled() {
    return this._disabled ? this._disabled : false;
  }
  set disabled(value) {
    this._disabled = value;
    this.setDisabled();
  }

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
    if (button) button.disabled = this.disabled;
  }

  applyDesign() {
    const design = this.design;
    let storedDesignIsDefined = DESIGNS.includes(design);
    const designIsClassic = design === 'plain';

    const button = this.getInputButton();
    // remove all existing designs
    DESIGNS.forEach(designCls => {
      button.classList.remove(designCls);
    });

    if (storedDesignIsDefined) {
      button.classList.add('button');
    }

    if (!designIsClassic) {
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
