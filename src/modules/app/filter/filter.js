/**
 * This component contains a single filter setting for a certain type of data.
 */
import { LightningElement, api, track } from 'lwc';

const OPERATORS = {
  date: [
    { label: '≥', value: 'greaterThanOrEqual' }
    /* ,
    { label: '≤', value: 'lessOrEqual' } */
  ]
};

export default class Filter extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  /**
   * The available operators are defined by the provided filter type.
   */
  @api
  get filterType() {
    return this.apiAttributes.filterType;
  }
  set filterType(value) {
    this.apiAttributes.filterType = value;
  }

  /**
   * A JS-Object for defining value paths and their labels in the picklist for available filter fields.
   * expected structure: [ {path: string, label: string } ]
   */
  @api
  paths = [];

  @api
  consoleLog = false;

  @api
  value;

  apiAttributes = {};

  @api
  isMatch(objectToCheck) {
    const fieldPath = this.selectedFieldPath;
    const operator = this.selectedOperator;
    const compareValue = this.enteredCompareValue;
    return this.isFilterMatch(objectToCheck, fieldPath, operator, compareValue);
  }

  //----------------------------
  // private attributes
  //----------------------------

  @track
  filterPaths = [];

  //----------------------------
  // handlers
  //----------------------------
  connectedCallback() {
    if (this.consoleLog) {
      // eslint-disable-next-line no-console
      console.log('app-filter.connectedCallback');

      // eslint-disable-next-line no-console
      console.log(
        'app-filter.connectedCallback filtertype: ' + this.filterType
      );
    }

    if (!this.value) {
      switch (this.filterType) {
        case 'date': {
          this.value = new Date().toISOString().split('T')[0];
          break;
        }
        // eslint-disable-next-line no-empty
        default: {
        }
      }
    }
  }

  handleChangeInput(event) {
    if (this.consoleLog) {
      // eslint-disable-next-line no-console
      console.log('app-filter.handleChangeInput');
    }
    this.filterValue = event.target.value;
  }

  //----------------------------
  // actions
  //----------------------------

  isFilterMatch(compareObject, path, operator, filterValue) {
    if (this.consoleLog) {
      // eslint-disable-next-line no-console
      console.log('app-filter.isFilterMatch - start');
      // eslint-disable-next-line no-console
      console.log('path: ' + path);
      // eslint-disable-next-line no-console
      console.log('operator: ' + operator);
      // eslint-disable-next-line no-console
      console.log('filterValue: ' + filterValue);
    }
    const objectValue = compareObject[path];

    switch (this.filterType) {
      case 'date': {
        if (this.consoleLog) {
          // eslint-disable-next-line no-console
          console.log('app-filter.isFilterMatch - type date');
        }
        let filterValueDate = new Date(filterValue).getTime();

        switch (operator) {
          case 'greaterThanOrEqual': {
            if (this.consoleLog) {
              // eslint-disable-next-line no-console
              console.log(
                'app-filter.isFilterMatch - operator greaterThanOrEqual'
              );
              // eslint-disable-next-line no-console
              console.log('objectValue: ' + objectValue);
              // eslint-disable-next-line no-console
              console.log('filterValueDate: ' + filterValueDate);
            }
            return objectValue >= filterValueDate;
          }
          default:
            return false;
        }
      }
      default:
        return false;
    }
  }

  //----------------------------
  // getters
  //----------------------------

  get operators() {
    const result = OPERATORS[this.filterType];
    return result ? result : [];
  }

  get selectedOperator() {
    return this.template.querySelector('.filter-operator select').value;
  }

  get selectedFieldPath() {
    const result = this.template.querySelector('.filter-path select').value;
    return result;
  }

  get enteredCompareValue() {
    const result = this.template.querySelector('input').value;
    return result;
  }

  get isPathArrayIsNotEmpty() {
    return this.filterPaths.length >= 0;
  }
}
