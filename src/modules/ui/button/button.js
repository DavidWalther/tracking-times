import { LightningElement, api } from 'lwc';

// eslint-disable-next-line no-unused-vars
const DESIGNS = ['accept', 'info', 'deny', 'cancel', 'confirm', 'classic'];

export default class Button extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  @api
  get design() {
    return this.state.design;
  }
  set design(value) {
    this.state.design = value;
  }

  @api
  value;

  @api
  get disabled() {
    return this.state.disabled;
  }
  set disabled(value) {
    this.state.disabled = value !== undefined;
  }

  //----------------------------
  // Properties
  //----------------------------

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

  get isDesignClassic() {
    return this.design === 'classic';
  }

  get isDesignFallback() {
    return (
      !this.isDesignAccept &&
      !this.isDesignInfo &&
      !this.isDesignDeny &&
      !this.isDesignCancel &&
      !this.isDesignConfirm &&
      !this.isDesignClassic
    );
  }

  //----------------------------
  // Variables
  //----------------------------

  state = { disabled: false };

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
    button.disabled = this.state.disabled;
  }

  applyDesign() {
    const design = this.design;
    let storedDesignIsDefined = DESIGNS.includes(design);
    
    const button = this.getInputButton();
    // remove all existing designs
    DESIGNS.forEach(designCls => {
      button.classList.remove(designCls);
    });

    if(storedDesignIsDefined ) {
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
