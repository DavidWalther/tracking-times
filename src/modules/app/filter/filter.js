/**
 * This component contains a single filter setting for a certain type of data.
 */
import { LightningElement, api } from 'lwc';

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

  apiAttributes = {};

  //----------------------------
  // handlers
  //----------------------------

  handleAttributeSetFilterType() {
    this.fireEventFilterTypeSet();
  }

  //----------------------------
  // actions
  //----------------------------

  fireEventFilterTypeSet() {
    this.dispatchEvent(new CustomEvent(EVENT_NAME_FILTER_TYPE_SET));
  }

  //----------------------------
  // getters
  //----------------------------

  get isFilterTypeText() {
    return this.filterType === 'text';
  }

  get isFilterTypeDate() {
    return this.filterType === 'date';
  }
}
