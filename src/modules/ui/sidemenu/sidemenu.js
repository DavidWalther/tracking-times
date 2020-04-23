import { LightningElement, api } from 'lwc';

export default class Sidemenu extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  @api
  open() {}

  @api
  close() {}

  @api
  menuTitle = '';

  @api
  iconOpenColor = '#000';

  @api
  iconCloseColor = '#000';

  //----------------------------
  // variables
  //----------------------------

  label = {
    title: 'Menu',
    icon: {
      open: '\u2630',
      close: '\u00D7'
    }
  };

  stateOpen;

  //----------------------------
  // callbacks
  //----------------------------

  renderedCallback() {
    this.template.querySelector('.icon-open').style.color = this.iconOpenColor;
    this.template.querySelector(
      '.icon-close'
    ).style.color = this.iconCloseColor;
  }

  //----------------------------
  // event handler
  //----------------------------

  onClickIconOpen() {
    this.openMenu();
  }

  onClickIconClose() {
    this.closeMenu();
  }

  //----------------------------
  // actions
  //----------------------------

  openMenu() {
    this.stateOpen = true;
    const elementMenu = this.template.querySelector('.menu');
    elementMenu.style.display = 'block';
  }

  closeMenu() {
    this.stateOpen = false;
    const elementMenu = this.template.querySelector('.menu');
    elementMenu.style.display = 'none';
  }
}
