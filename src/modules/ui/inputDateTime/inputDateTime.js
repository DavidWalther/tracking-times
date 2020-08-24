import { LightningElement, api } from 'lwc';

const MILLISECONDS_PER_MINUTE = 1000 * 60;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

export default class InputDateTime extends LightningElement {
  @api
  noTime = false;
  @api
  noDate = false;
  @api
  value = new Date();

  get dateValue() {
    const tempDate = new Date(this.value);
    return tempDate.toISOString().split('T')[0];
  }

  get timeValue() {
    const tempDate = new Date(this.value);
    return tempDate.toLocaleTimeString().substr(0, 5);
  }

  handleChangeTime(event) {
    // stop normal event
    event.preventDefault();
    event.stopPropagation();

    const enteredTime = event.target.value;

    const newValue = new Date(this.dateValue + 'T' + enteredTime).getTime();
    const timeInteger = newValue % MILLISECONDS_PER_DAY;
    const dateInteger = newValue - timeInteger;

    //create and fire custom event
    const timestampsData = {
      time: timeInteger,
      date: dateInteger
    };
    const newEvent = new CustomEvent('change', {
      detail: timestampsData
    });
    this.dispatchEvent(newEvent);
  }

  handleChangeDate(event) {
    // stop normal event
    event.preventDefault();
    event.stopPropagation();

    //create an firecustom event
    const timestampsData = {};
    const newEvent = new CustomEvent('change', {
      detail: timestampsData
    });
    this.dispatchEvent(newEvent);
  }

  getTimeInput() {
    this.template.querySelector('input.input-time');
  }
}
