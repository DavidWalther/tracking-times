/* eslint-disable no-console */

/**
 * This component contains a single filter setting for a certain type of data.
 *
 * It serves as a general component to set filter criteria on any object/attribute.
 *
 * - For This reason it only knows about data-types and what operators to use on which of them.
 * - The parent component has to provide the object and the attribute to check.
 */

const MILISECONDS_PER_MINUTE = 1000 * 60;
const MILISECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * 60;
const MILISECONDS_PER_DAY = MILISECONDS_PER_HOUR * 24;
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
   * (required) Specifies the type to filter on. The available operators are defined by the provided type.
   */
  @api
  type;

  /**
   * (required) JS-Object for defining value paths and their labels in the picklist for available filter fields.
   * expected structure: [ {path: string, label: string } ]
   */
  @api
  paths = [];

  /**
   * (optional) this attribute specifies which field should be selected by default
   * The value must be one of the path-values passed via 'paths'.
   */
  @api
  path;

  /**
   * (optional)
   */
  @api
  consoleLog = false;

  /**
   * (optional)
   */
  @api
  value;

  /**
   * (optional)
   */
  @api
  operator;

  /**
   * (optional) This attribute can be set to 'true' to disable filter.
   * @default false
   */
  @api
  inactive = false;

  /**
   * @param objectToCheck Object to check. at must contain the attributes defined in 'paths'
   * @returns
   */
  @api
  isMatch(objectToCheck) {
    const configurations = this.getFilterConfigurations();
    return this.isFilterMatch(
      objectToCheck,
      configurations.filterPath,
      configurations.filterOperator,
      configurations.filterValue
    );
  }

  //----------------------------
  // handlers
  //----------------------------

  connectedCallback() {
    if (this.consoleLog) {
      console.log('app-filter.connectedCallback');
      console.log('app-filter.connectedCallback type: ' + this.type);
      console.log('app-filter.connectedCallback operator: ' + this.operator);
      console.log('app-filter.connectedCallback path: ' + this.path);
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
      console.log('app-filter.renderedCallback');
    }

    if (this.operator && this.selectorOperator) {
      this.selectorOperator.value = this.operator;
    }
    this.readPathFromAttribute();
  }

  handleChangeFilterValue() {
    this.createAndfireChangeEvent();
  }

  handleChangeFilterOperator() {
    this.createAndfireChangeEvent();
  }

  handleChangeFilterPath() {
    this.createAndfireChangeEvent();
  }

  //----------------------------
  // actions
  //----------------------------

  isFilterMatch(compareObject, path, operator, filterValue) {
    if (this.consoleLog) {
      console.log('app-filter.isFilterMatch - start');
      console.log('path: ' + path);
      console.log('operator: ' + operator);
      console.log('filterValue: ' + filterValue);
    }
    const objectValue = compareObject[path];
    if (this.consoleLog) {
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
            return objectValue <= filterValueDate + MILISECONDS_PER_DAY;
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
      const operatorSelect = this.selectorPath;
      if (this.consoleLog) {
        console.log('app-filter.readPathFromAttribute');
        console.log(
          'app-filter.readPathFromAttribute - pathAttributeValue: ' +
            pathAttributeValue
        );
      }
      operatorSelect.value = pathAttributeValue;
    }
  }

  createAndfireChangeEvent() {
    const eventDetail = this.getFilterConfigurations();
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: eventDetail
      })
    );
  }

  //----------------------------
  // getters
  //----------------------------

  get operators() {
    const result = OPERATORS[this.type];
    return result ? result : [];
  }

  //----------------------------
  // helpers
  //----------------------------

  getFilterConfigurations() {
    const filterValue = this.selectorInput.value;
    const filterOperator = this.selectorOperator.value;
    const filterPath = this.selectorPath.value;
    const configurations = {
      filterValue: filterValue,
      filterOperator: filterOperator,
      filterPath: filterPath
    };
    return configurations;
  }

  //----------------------------
  // Element selectors
  //----------------------------

  get selectorOperator() {
    return this.template.querySelector('.filter-operator select');
  }

  get selectorPath() {
    return this.template.querySelector('.filter-path select');
  }

  get selectorInput() {
    return this.template.querySelector('.filter-input input');
  }
}
