/**
 * This component contains a single filter setting for a certain type of data.
 */
import { LightningElement, api } from 'lwc';

export default class Filter extends LightningElement {
  //----------------------------
  // API
  //----------------------------

  /**
   * The available operators are defined by the provided filter type.
   */
  @api
  filterType;

  get isFilterTypeText() {
    return this.filterType === 'text';
  }

  get isFilterTypeDate() {
    return this.filterType === 'date';
  }
}
