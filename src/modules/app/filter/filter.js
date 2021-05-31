/**
 * This component contains a single filter setting for a certain type of data.
 */
import { LightningElement, api } from 'lwc';

const OPERATORS = {
  date: [
    {
      label: '≥',
      value: 'greaterThanOrEqual'
    },
    { label: '≤', value: 'lessOrEqual' }
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
  type;

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

  @api
  operator;

  @api
  isMatch(objectToCheck) {
    const fieldPath = this.selectedFieldPath;
    const operator = this.selectedOperator;
    const compareValue = this.enteredCompareValue;
    return this.isFilterMatch(objectToCheck, fieldPath, operator, compareValue);
  }

  //----------------------------
  // handlers
  //----------------------------
  connectedCallback() {
    if (this.consoleLog) {
      // eslint-disable-next-line no-console
      console.log('app-filter.connectedCallback');
      // eslint-disable-next-line no-console
      console.log('app-filter.connectedCallback type: ' + this.type);
      // eslint-disable-next-line no-console
      console.log('app-filter.connectedCallback operator: ' + this.operator);
    }

    if (!this.value) {
      switch (this.type) {
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

  renderedCallback() {
    if (this.consoleLog) {
      // eslint-disable-next-line no-console
      console.log('app-filter.renderedCallback');
    }

    if (this.operator) {
      this.template.querySelector(
        '.filter-operator select'
      ).value = this.operator;
    }
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

    switch (this.type) {
      case 'date': {
        if (this.consoleLog) {
          // eslint-disable-next-line no-console
          console.log('app-filter.isFilterMatch - type date');
        }
        let filterValueDate = new Date(filterValue).getTime();
        if (this.consoleLog) {
          // eslint-disable-next-line no-console
          console.log('objectValue: ' + objectValue);
          // eslint-disable-next-line no-console
          console.log('filterValueDate: ' + filterValueDate);
        }

        switch (operator) {
          case 'greaterThanOrEqual': {
            if (this.consoleLog) {
              // eslint-disable-next-line no-console
              console.log(
                'app-filter.isFilterMatch - operator greaterThanOrEqual'
              );
            }
            return objectValue >= filterValueDate;
          }
          case 'lessOrEqual': {
            if (this.consoleLog) {
              // eslint-disable-next-line no-console
              console.log('app-filter.isFilterMatch - operator lessOrEqual');
            }
            return objectValue <= filterValueDate;
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
    const result = OPERATORS[this.type];
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
}
