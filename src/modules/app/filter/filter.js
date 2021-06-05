/**
 * This component contains a single filter setting for a certain type of data.
 *
 * It servers a a general component to set filter criteria on any object/attribute.
 *
 * - For This reason it only knows about data-types and what operators to use on which of them.
 * - A parent component has to provide the object and the attribute to check.
 */
import { LightningElement, api } from 'lwc';

const OPERATORS = {
  date: [
    {
      label: '≥',
      value: 'greaterThanOrEqual'
    },
    { label: '≤', value: 'lessOrEqual' }
  ],
  text: [
    { label: 'starts with (a = A)', value: 'startsWithWithoutCase' },
    { label: 'contains (a = A)', value: 'containsWithoutCase' },
    { label: 'starts with (a <> A)', value: 'startsWithWithCase' },
    { label: 'contains (a <> A)', value: 'containsWithCase' }
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
  path;

  @api
  consoleLog = false;

  @api
  value;

  @api
  operator;

  /**
   *
   * @param objectToCheck Object to check. at must contain the attributes defined in 'paths'
   * @returns
   */
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

    if (this.operator && this.selectorSelectOperator) {
      this.selectorSelectOperator.value = this.operator;
    }
    this.readPathFromAttribute();
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
    if (this.consoleLog) {
      // eslint-disable-next-line no-console
      console.log('objectValue: ' + objectValue);
    }
    switch (this.type) {
      case 'date': {
        let filterValueDate = new Date(filterValue).getTime();

        switch (operator) {
          case 'greaterThanOrEqual': {
            return objectValue >= filterValueDate;
          }
          case 'lessOrEqual': {
            return objectValue <= filterValueDate;
          }
          default:
            return false;
        }
      }
      case 'text': {
        switch (operator) {
          case 'containsWithCase': {
            return objectValue.includes(filterValue);
          }
          case 'containsWithoutCase': {
            return objectValue
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
          case 'startsWithWithoutCase': {
            return objectValue
              .toLowerCase()
              .startsWith(filterValue.toLowerCase());
          }
          case 'startsWithWithCase': {
            return objectValue.startsWith(filterValue);
          }
          default:
            return false;
        }
      }
      default:
        return false;
    }
  }

  readPathFromAttribute() {
    const pathAttributeValue = this.path;
    if (pathAttributeValue) {
      const operatorSelect = this.selectPath;
      if (this.consoleLog) {
        // eslint-disable-next-line no-console
        console.log('app-filter.readPathFromAttribute');
        // eslint-disable-next-line no-console
        console.log(
          'app-filter.readPathFromAttribute - pathAttributeValue: ' +
            pathAttributeValue
        );
      }
      operatorSelect.value = pathAttributeValue;
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
    return this.selectorSelectOperator.value;
  }

  get selectedFieldPath() {
    const result = this.selectPath.value;
    return result;
  }

  get enteredCompareValue() {
    const result = this.template.querySelector('input').value;
    return result;
  }

  //----------------------------
  // Element selectors
  //----------------------------

  get selectorSelectOperator() {
    return this.template.querySelector('.filter-operator select');
  }

  get selectPath() {
    return this.template.querySelector('.filter-path select');
  }
}
