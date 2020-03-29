import { LightningElement, api } from 'lwc';

// eslint-disable-next-line no-unused-vars
const designs = ['accept', 'info', 'deny', 'cancel', 'confirm', 'classic'];

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
