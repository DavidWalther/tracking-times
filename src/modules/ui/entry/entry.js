import { LightningElement, api, track } from 'lwc';

const MILLISECONDS_PER_MINUTE = 1000 * 60;

export default class Entry extends LightningElement {
  @api
  get break() {
    return this.internalState.break;
  }
  set break(value) {
    if (value !== undefined) {
      this.internalState.break = value;
      this.setDisplayStateBreak();
    }
  }

  @api
  get version() {
    return this.internalState.version;
  }
  set version(value) {
    if (value !== undefined) {
      this.internalState.version = value;
    }
  }

  @api
  get comment() {
    return this.internalState.comment;
  }
  set comment(value) {
    if (value !== undefined) {
      this.internalState.comment = value;
      this.setDisplayStateComment();
    }
  }

  @api
  get start() {
    return this.internalState.startTimeStamp;
  }
  set start(value) {
    let integerValue;
    if (value !== undefined) {
      integerValue = parseInt(value, 10);
      this.internalState.startTimeStamp = integerValue;
      this.setDisplayStartDate();
      this.setDisplayStartTime();
    }
  }

  @api
  get end() {
    return this.internalState.endTimeStamp;
  }
  set end(value) {
    let integerValue;
    if (value !== undefined) {
      integerValue = parseInt(value, 10);
      this.internalState.endTimeStamp = integerValue;
      this.setDisplayEndDate();
      this.setDisplayEndTime();
    }
  }

  internalState = {
    break: 0
  };

  label = {
    modal: {
      edit: {
        title: 'Entry Details',
        button: {
          save: 'Save'
        }
      },
      delete: {
        title: 'Delete',
        body: 'Delete Entry?',
        button: {
          confirm: 'Delete',
          cancel: 'Cancel'
        }
      }
    },
    button: {
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel'
    },
    input: {
      startdate: 'Start date',
      starttime: 'Start time',
      enddate: 'End date',
      endtime: 'End time',
      comment: 'Comment',
      break: 'Break (min)'
    }
  };

  @track
  displayState = {};

  setDisplayStartDate() {
    this.displayState.startdate = this.extractDateStringFromTimeStamp(
      this.internalState.startTimeStamp
    );
  }

  setDisplayStartTime() {
    this.displayState.starttime = this.extractTimeStringFromTimeStamp(
      this.internalState.startTimeStamp
    );
  }

  setDisplayEndDate() {
    this.displayState.enddate = this.extractDateStringFromTimeStamp(
      this.internalState.endTimeStamp
    );
  }

  setDisplayEndTime() {
    this.displayState.endtime = this.extractTimeStringFromTimeStamp(
      this.internalState.endTimeStamp
    );
  }

  setDisplayStateComment() {
    this.displayState.comment = this.internalState.comment;
  }

  setDisplayStateBreak() {
    this.displayState.break =
      this.internalState.break / MILLISECONDS_PER_MINUTE;
  }

  extractDateStringFromTimeStamp(timestamp) {
    let fullDate, dateString;
    fullDate = new Date(timestamp);
    dateString = fullDate.toISOString().split('T')[0];
    return dateString;
  }

  extractTimeStringFromTimeStamp(timestamp) {
    let fullDate, timeString;

    fullDate = new Date(timestamp);
    timeString = fullDate.toLocaleTimeString().substr(0, 5);

    return timeString;
  }

  get difference() {
    let startDate = this.internalState.startTimeStamp;
    let endDate = this.internalState.endTimeStamp;
    let breakTime = this.break;

    let difference = endDate - startDate - breakTime;
    return difference / (1000 * 60 * 60);
  }

  //----------------------------
  // event handlers
  //----------------------------

  handleButtonClickModalSave() {
    this.processModalSave();
  }

  handleButtonClickModalCancel() {
    this.processModalCancel();
  }

  handleButtonClickEdit() {
    this.processEdit();
  }

  handleButtonClickDelete() {
    this.getDeleteModal().show();
  }

  handleButtonClickDeleteConfirm() {
    this.getDeleteModal().hide();
    this.processDelete();
  }

  handleButtonClickDeleteCancel() {
    this.getDeleteModal().hide();
  }

  //----------------------------
  // process events
  //----------------------------

  processModalSave() {
    let inputValues;

    this.getEditModal().hide();
    inputValues = this.readModalInputs();
    this.writeValuesToInternalState(inputValues);
    this.fillOutputs();
    this.createAndFireChangeEvent();
  }

  processModalCancel() {
    this.getEditModal().hide();
  }

  processDelete() {
    this.dispatchEvent(new CustomEvent('delete'));
  }

  processEdit() {
    this.fillModalInputs();
    this.getEditModal().show();
  }

  createAndFireChangeEvent() {
    let externalEvent;
    externalEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        start: this.start,
        end: this.end,
        comment: this.comment,
        break: this.break
      }
    });
    this.dispatchEvent(externalEvent);
  }

  getValuesForInputs() {
    let result, start, end;
    result = {};

    if (this.isStartDefined()) {
      start = new Date(this.internalState.startTimeStamp);
      result.startdate = start.toISOString().split('T')[0];
      result.starttime = start.toLocaleTimeString().substr(0, 5);
    }
    if (this.isEndDefined()) {
      end = new Date(this.internalState.endTimeStamp);
      result.enddate = end.toISOString().split('T')[0];
      result.endtime = end.toLocaleTimeString().substr(0, 5);
    }
    result.break = this.break / MILLISECONDS_PER_MINUTE;
    result.comment = this.internalState.comment;
    return result;
  }

  setStateValues(param) {
    this.internalState.startTimeStamp = param.start;
    this.internalState.endTimeStamp = param.end;
    this.internalState.comment = param.comment;
  }

  //----------------------
  // Output handlers
  //----------------------

  fillOutputs() {
    let values;
    values = this.getValuesForInputs();
    this.displayState.startdate = values.startdate;
    this.displayState.starttime = values.starttime;
    this.displayState.enddate = values.enddate;
    this.displayState.endtime = values.endtime;
    this.displayState.comment = values.comment;
    this.setDisplayStateBreak();
  }

  writeValuesToInternalState(values) {
    let start, end, breakValue, comment;
    start = new Date(values.startDateStr + 'T' + values.startTimeStr);
    end = new Date(values.endDateStr + 'T' + values.endTimeStr);
    comment = values.comment;
    breakValue = values.break;
    this.internalState.startTimeStamp = start.getTime();
    this.internalState.endTimeStamp = end.getTime();
    this.internalState.break = breakValue;
    this.internalState.comment = comment;
  }

  //----------------------
  // Modal handlers
  //----------------------

  fillModalInputs() {
    let values;
    values = this.getValuesForInputs();
    this.getInputStartDate().value = values.startdate;
    this.getInputStartTime().value = values.starttime;
    this.getInputEndDate().value = values.enddate;
    this.getInputEndTime().value = values.endtime;
    this.getInputComment().value = values.comment;
    this.getInputBreak().value = values.break;
  }

  readModalInputs() {
    let values;
    values = {};
    values.startDateStr = this.getInputStartDate().value;
    values.startTimeStr = this.getInputStartTime().value;
    values.endDateStr = this.getInputEndDate().value;
    values.endTimeStr = this.getInputEndTime().value;
    values.break = this.getInputBreak().value;
    values.break = parseInt(values.break, 10) * MILLISECONDS_PER_MINUTE;
    values.comment = this.getInputComment().value;
    return values;
  }

  /**
   * --------------------
   * value Checker
   * --------------------
   */

  isStartDefined() {
    if (this.internalState.startTimeStamp === undefined) {
      return false;
    }
    if (this.internalState.startTimeStamp === null) {
      return false;
    }
    if (isNaN(this.internalState.startTimeStamp)) {
      return false;
    }
    if (this.internalState.startTimeStamp === '') {
      return false;
    }
    return true;
  }

  isEndDefined() {
    if (this.internalState.endTimeStamp === undefined) {
      return false;
    }
    if (this.internalState.endTimeStamp === null) {
      return false;
    }
    if (isNaN(this.internalState.endTimeStamp)) {
      return false;
    }
    if (this.internalState.endTimeStamp === '') {
      return false;
    }
    return true;
  }

  //----------------------
  // Element selectors
  //----------------------

  getDeleteModal() {
    return this.template.querySelector('.modal-delete');
  }

  getEditModal() {
    return this.template.querySelector('.modal-edit');
  }

  getInputStartDate() {
    return this.template.querySelector('input.start-date');
  }

  getInputStartTime() {
    return this.template.querySelector('input.start-time');
  }

  getInputEndDate() {
    return this.template.querySelector('input.end-date');
  }

  getInputEndTime() {
    return this.template.querySelector('input.end-time');
  }

  getInputComment() {
    return this.template.querySelector('.input.comment');
  }

  getInputBreak() {
    return this.template.querySelector('input.break');
  }
}
