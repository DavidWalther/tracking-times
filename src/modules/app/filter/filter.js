/**
 * This component contains a single filter setting for a certain type of data.
 */
import { LightningElement, api, track } from 'lwc';

const EVENT_NAME_FILTER_TYPE_SET = 'filtertype';

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
    this.handleAttributeSetFilterType();
  }

  @api
  get operator() {
    return this.apiAttributes.operator;
  }
  set operator(value) {
    this.apiAttributes.operator = value;
  }

  apiAttributes = {};

  /**
   * This function defines paths to read the values form an object. These paths are used to check for a filter match.
   *
   * @param filtersPaths A JS-Object for defining value paths and their labels in the picklist for available filter fields.
   * expected structure: [ {path: string, label: string } ]
   */
  @api
  setFilterPaths(filtersPaths) {
    // Guardians
    if (!filtersPaths) {
      const exception = { message: "'filtersPaths' must be defined" };
      throw exception;
    }
    if (!Array.isArray(filtersPaths)) {
      const exception = { message: "'filtersPaths' must be an array" };
      throw exception;
    }
    filtersPaths.forEach(entry => {
      if (!entry.path) {
        const exception = {
          message: "each entry of 'filtersPaths' must have a 'path' attribute"
        };
        throw exception;
      }
      if (!entry.label) {
        const exception = {
          message: "each entry of 'filtersPaths' must have a 'label' attribute"
        };
        throw exception;
      }
    });

    // Business logic
    this.filterPaths = [...filtersPaths];
  }

  //----------------------------
  // private attributes
  //----------------------------

  @track
  filterPaths = [];
  operator;

  //----------------------------
  // handlers
  //----------------------------

  renderedCallback() {}

  handleAttributeSetFilterType() {
    this.fireEventFilterTypeSet();
  }

  handleChangeDateOperator() {
    this.readOperator();
  }

  handleChangeInput(event) {
    this.filterValue = event.target.value;
  }

  //----------------------------
  // actions
  //----------------------------

  readOperator() {
    this.operator = this.getOperatorValue();
  }

  fireEventFilterTypeSet() {
    const eventDetail = {};
    eventDetail.filterType = this.filterType;
    this.dispatchEvent(
      new CustomEvent(EVENT_NAME_FILTER_TYPE_SET, { detail: eventDetail })
    );
  }

  //----------------------------
  // helpers
  //----------------------------

  getOperatorValue() {
    let optionList = this.template.querySelectorAll('.filter-operator option');
    let result = null;
    //TODO: check why Array.find does not work
    optionList.forEach(option => {
      if (option.selected) {
        result = option;
      }
    });

    return result.value;
  }

  //----------------------------
  // getters
  //----------------------------

  get isPathArrayIsNotEmpty() {
    return this.filterPaths.length >= 0;
  }

  get isFilterTypeText() {
    return this.filterType === 'text';
  }

  get isFilterTypeDate() {
    return this.filterType === 'date';
  }
}
