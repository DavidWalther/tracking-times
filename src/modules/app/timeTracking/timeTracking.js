import { LightningElement, track } from 'lwc';
import { startDownload } from 'data/fileDownload';
import { save, load } from 'data/localStorage';
import { Credentials } from 'data/auth';

const MILISECONDS_PER_MINUTE = 1000 * 60;
const MILISECONDS_PER_FIFTEEN_MINUTE = MILISECONDS_PER_MINUTE * 15;
const MILISECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * 60;
const MILISECONDS_PER_DAY = MILISECONDS_PER_HOUR * 24;

const CUTTING_TYPE_CEIL = 'ceil';
const CUTTING_TYPE_FLOOR = 'floor';
const CUTTING_TYPE_ROUND = 'round';
const DATA_CURRENT_VERSION = 'v0.5';

export default class TimeTracking extends LightningElement {
  @track state = {
    label: {
      button: {
        save: 'Save',
        load: 'Load',
        clear: 'Clear',
        add: 'Add'
      },
      modal: {
        clear: {
          title: 'Clear',
          body: 'Clear all entries?'
        }
      }
    }
  };

  label = {
    sidemenu: {
      icon: '\u2630'
    },
    button: {
      add: {
        value: 'Add'
      },
      download: {
        value: 'Download'
      },
      clear: {
        value: 'Clear'
      }
    }
  };

  selectedEntries = [];
  authData;

  connectedCallback() {
    const authHandler = new Credentials();
    let authParams = authHandler.readAuthenticationResponse();

    this.state.entries = [];
    this.loadData();
    if (authParams) {
      this.authData = authParams;
      this.saveData();
      authHandler.replaceLocation();
    }
  }

  renderedCallback() {
    this.entryBasedEnablingOfButtons();
  }

  handleClickAdd() {
    this.processClickAdd();
    this.saveData();
  }

  handleClickClear() {
    this.showClearModal();
    this.template.querySelector('ui-sidemenu').close();
  }

  handleClickClearCancel() {
    this.hideClearModal();
  }

  handleClickClearConfirm() {
    this.hideClearModal();
    this.processClearData();
  }

  handleClickExport() {
    this.proccessExport();
    this.template.querySelector('ui-sidemenu').close();
  }

  handleEventDelete(event) {
    const itemId = event.detail.id;

    this.processEntryDelete(itemId);
    this.saveData();
  }

  handleEventSelect(event) {
    const itemId = event.detail.id;
    this.processEntrySelect(itemId);
  }

  handleEventUnselect(event) {
    const itemId = event.detail.id;
    this.processEntryUnselect(itemId);
  }

  handleChangeEntry(event) {
    const itemId = event.detail.id;

    this.processEntryChange(itemId, event.detail);
    this.saveData();
  }

  handleClickSummary() {
    this.getSummaryModal().show();
    this.setSummaryOutput(this.createSummary());
  }

  handleClickAuth() {
    this.doAuthCallout();
  }

  //----------------------------
  // Properties
  //----------------------------

  get entries() {
    return this.state.entries;
  }

  get isEmpty() {
    if (this.entries === undefined) return true;
    if (this.entries === null) return true;
    if (this.entries.length === 0) return true;
    return false;
  }

  //----------------------------
  // Actions
  //----------------------------

  async doQuery(authParams) {
    const access_token = authParams.access_token;
    const instance_url = authParams.instance_url;
    const query =
      '/services/data/v51.0/query?q=SELECT+name+from+Account -H "Authorization: Bearer access_token" -H "X-PrettyPrint:1"';

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      // eslint-disable-next-line no-console
      console.log('cb 1');
    };
    xmlhttp.open('GET', instance_url + query, false);

    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer '+access_token);
    xmlhttp.onreadystatechange = function() {
      // eslint-disable-next-line no-console
      console.log('cb 2');
      // eslint-disable-next-line no-console
      console.log(xmlhttp.responseText);
    };
  }

  async doAuthCallout() {
    const authHandler = new Credentials();
    authHandler.startAuthentication();
  }

  createSummary() {
    const result = {
      difference: 0,
      comment: ''
    };

    const allEntries = this.template.querySelectorAll('app-entry');

    const commentArray = [];

    this.selectedEntries.forEach(selectedEntryId => {
      for (let i = 0; i < allEntries.length; i++) {
        const entry = allEntries[i];
        if (entry.itemId === selectedEntryId) {
          result.difference +=
            entry.itemId === selectedEntryId ? entry.difference : 0;
          commentArray.push(entry.comment);
        }
      }
    });

    result.comment = commentArray.join('\n=====\n');

    return result;
  }

  setSummaryOutput(summary) {
    this.template.querySelector('.summary-difference').value =
      summary.difference;
    this.template.querySelector('.summary-comment').value = summary.comment;
  }

  processEntryUnselect(itemId) {
    this.selectedEntries = this.selectedEntries.filter(
      selectedItemId => selectedItemId !== itemId
    );
    this.processMultipleRecordActionAvailability();
  }

  processEntrySelect(itemId) {
    let tempListWithPotentialDuplicate = [...this.selectedEntries];

    tempListWithPotentialDuplicate.push(itemId);
    const uniqueItemIds = [...new Set(tempListWithPotentialDuplicate)];

    this.selectedEntries = uniqueItemIds;
    this.processMultipleRecordActionAvailability();
  }

  processMultipleRecordActionAvailability() {
    const summaryButtons = this.template.querySelectorAll('.button-summary');

    let disable = this.selectedEntries.length < 2;

    summaryButtons.forEach(button => {
      button.disabled = disable;
    });
  }

  proccessExport() {
    this.doExportTxt();
  }

  createExportTxtLinte(formatingInformation, cellContent) {
    let entryOutput = '';
    const LINE_TPL = '{0} | {1} | {2}  | {3}  | {4} | {5}\n';

    let isFirstline = true;
    cellContent.comment.split('\n').forEach(commentLine => {
      let outputLine = LINE_TPL;

      outputLine = outputLine.replace('{5}', commentLine);

      // add start date column
      let startDateStr = isFirstline ? cellContent.startDate : '';
      while (
        startDateStr.length - 1 <
        formatingInformation.columnWidth.startDate
      ) {
        startDateStr = ' ' + startDateStr;
      }
      outputLine = outputLine.replace('{0}', ' ' + startDateStr);

      //add start time column
      let startTimeStr = isFirstline ? cellContent.startTime : '';
      while (
        startTimeStr.length - 1 <
        formatingInformation.columnWidth.startTime
      ) {
        startTimeStr = ' ' + startTimeStr;
      }
      outputLine = outputLine.replace('{1}', startTimeStr);

      // add end date column
      let endDateStr = isFirstline ? cellContent.endDate : '';
      while (endDateStr.length - 1 < formatingInformation.columnWidth.endDate) {
        endDateStr = ' ' + endDateStr;
      }
      outputLine = outputLine.replace('{2}', endDateStr);

      //add end time column
      let endTimeStr = isFirstline ? cellContent.endTime : '';
      while (endTimeStr.length - 1 < formatingInformation.columnWidth.endTime) {
        endTimeStr = ' ' + endTimeStr;
      }
      outputLine = outputLine.replace('{3}', endTimeStr);

      //add end time column
      let durationStr = isFirstline ? cellContent.duration : '';
      while (
        durationStr.length - 1 <
        formatingInformation.columnWidth.duration
      ) {
        durationStr = ' ' + durationStr;
      }
      outputLine = outputLine.replace('{4}', durationStr);

      isFirstline = false;

      entryOutput += outputLine;
    });
    return entryOutput;
  }

  doExportTxt() {
    const output = [];
    const COLUMN_HEAD_START_DATE = 'Startdate';
    const COLUMN_HEAD_START_TIME = 'Starttime';
    const COLUMN_HEAD_END_DATE = 'Enddate';
    const COLUMN_HEAD_END_TIME = 'Endtime';
    const COLUMN_HEAD_DURATION = 'Duration';
    const COLUMN_HEAD_COMMMENT = 'Comment';

    const formatingInformation = {
      columnWidth: {
        startDate: COLUMN_HEAD_START_DATE.length,
        startTime: COLUMN_HEAD_START_TIME.length,
        endDate: COLUMN_HEAD_END_DATE.length,
        endTime: COLUMN_HEAD_END_TIME.length,
        duration: COLUMN_HEAD_DURATION.length,
        comment: COLUMN_HEAD_COMMMENT.length
      }
    };

    const exportContent = [];
    this.state.entries.forEach(entry => {
      // calculate duration
      let duration = entry.end - entry.start;
      duration = duration - (entry.break && entry.break > 0 ? entry.break : 0);
      let differenceStr = formatDuration(duration);

      const entryContent = {
        startDate: extractDateStringFromTimeStamp(entry.start),
        startTime: extractTimeStringFromTimeStamp(entry.start),
        endDate: extractDateStringFromTimeStamp(entry.end),
        endTime: extractTimeStringFromTimeStamp(entry.end),
        duration: differenceStr,
        comment: entry.comment
      };
      exportContent.push(entryContent);

      formatingInformation.columnWidth.startDate = Math.max(
        formatingInformation.columnWidth.startDate,
        entryContent.startDate.length
      );

      formatingInformation.columnWidth.startTime = Math.max(
        formatingInformation.columnWidth.startTime,
        entryContent.startTime.length
      );

      formatingInformation.columnWidth.endDate = Math.max(
        formatingInformation.columnWidth.endDate,
        entryContent.endDate.length
      );

      formatingInformation.columnWidth.endTime = Math.max(
        formatingInformation.columnWidth.endTime,
        entryContent.endTime.length
      );

      formatingInformation.columnWidth.duration = Math.max(
        formatingInformation.columnWidth.duration,
        entryContent.duration.length
      );

      entry.comment.split('\n').forEach(commentLine => {
        formatingInformation.columnWidth.comment = Math.max(
          formatingInformation.columnWidth.comment,
          commentLine.length
        );
      });
    });

    const firstLine = this.createExportTxtLinte(formatingInformation, {
      startDate: COLUMN_HEAD_START_DATE,
      startTime: COLUMN_HEAD_START_TIME,
      endDate: COLUMN_HEAD_END_DATE,
      endTime: COLUMN_HEAD_END_TIME,
      duration: COLUMN_HEAD_DURATION,
      comment: COLUMN_HEAD_COMMMENT
    });

    output.push(firstLine);
    const secondLine =
      '===================================================================================\n';
    output.push(secondLine);

    exportContent.forEach(entryContent => {
      output.push(
        this.createExportTxtLinte(formatingInformation, entryContent)
      );
      //output.push('---------------------------------------------------------------------------------\n');
      output.push('\n');
    });
    startDownload('export.txt', output, 'test/plain');
  }

  processEntryDelete(itemId) {
    let entryIndex, newlength;

    entryIndex = this.state.entries.findIndex(entry => {
      return entry.itemId === itemId;
    });

    // delete entry
    this.state.entries.splice(entryIndex, 1);

    // rewrite sort numbers
    newlength = this.state.entries.length;

    for (let i = 0; i < this.state.entries.length; i++) {
      const element = this.state.entries[i];
      element.sortnumber = newlength - i;
    }

    this.entryBasedEnablingOfButtons();
  }

  saveData() {
    const data = {
      settings: {
        version: DATA_CURRENT_VERSION
      },
      authData: this.authData,
      entries: this.state.entries
    };

    save(data);
  }

  loadData() {
    let loaded = load();
    if (loaded === undefined || loaded === null) {
      this.state.entries = [];
    } else {
      if (loaded.settings === undefined) {
        this.loadLegacyData(loaded);
      }
      if (loaded.settings !== undefined) {
        if (loaded.settings.version === 'v0.3') {
          this.loadDataV03(loaded);
        }
        if (loaded.settings.version === 'v0.4') {
          this.loadDataV04(loaded);
        }
        if (loaded.settings.version === 'v0.5') {
          this.loadDataV05(loaded);
        }
      }
    }
  }

  loadLegacyData(loaded) {
    this.state.entries = [];
    if (loaded.length !== undefined) {
      loaded.forEach(loadedEntry => {
        let entryData = JSON.parse(loadedEntry.data);
        let tempEntry = {
          sortnumber: this.state.entries.length,
          itemId: entryData.start.value + this.state.entries.length,
          start: entryData.start.value,
          end: entryData.end.value,
          break: entryData.break,
          comment: entryData.comment
        };
        this.state.entries.push(tempEntry);
      });
    }
  }

  loadDataV03(loaded) {
    let itemCounter = 0;
    this.state.version = loaded.settings.version;
    this.state.entries = loaded.entries;

    this.state.entries.forEach(loadedEntry => {
      loadedEntry.itemId = loadedEntry.start + itemCounter;
      itemCounter++;
    });
  }

  loadDataV04(loaded) {
    this.state.version = loaded.settings.version;
    this.state.entries = loaded.entries;
  }

  loadDataV05(loaded) {
    this.state.version = loaded.settings.version;
    this.state.entries = loaded.entries;
    this.authData = loaded.authData;
  }

  processClearData() {
    this.entryBasedEnablingOfButtons();
    this.state.entries = [];
    this.saveData();
  }

  processClickAdd() {
    // create new entry
    const entryConfig = {
      cuttingType: CUTTING_TYPE_ROUND,
      cuttingAccuracy: MILISECONDS_PER_FIFTEEN_MINUTE,
      defaultDuration: MILISECONDS_PER_HOUR
    };
    const newEntry = this.createListEntry(entryConfig);

    // add entry to the start of list
    this.state.entries.unshift(newEntry);

    // enable Download button *after* the first element was added
    this.entryBasedEnablingOfButtons();
  }

  processEntryChange(itemId, newDetail) {
    let entry;
    const startValue = newDetail.start;
    const endValue = newDetail.end;
    const breakValue = newDetail.break;
    const commentValue = newDetail.comment;

    if (itemId !== undefined) {
      entry = this.state.entries.find(function(tempEntry) {
        return tempEntry.itemId === itemId;
      });

      if (entry !== undefined) {
        if (startValue !== undefined) {
          entry.start = startValue;
        }
        if (endValue !== undefined) {
          entry.end = endValue;
        }
        if (breakValue !== undefined) {
          entry.break = breakValue;
        }
        if (commentValue !== undefined) {
          entry.comment = commentValue;
        }
      }
    }
  }

  createListEntry(entryConfig) {
    let newEntry = {};
    let newEntryId = this.state.entries.length;
    const currentTime = new Date().getTime();
    const approximatedTime = this.createNewTimestamp(entryConfig);

    newEntryId = newEntryId === undefined ? 0 : newEntryId;
    // tests add all entries in the very same millisecond which causes key-values to not unique
    // => to tackle the we add as many milliseconds as there are entries in the entry list
    newEntry.itemId = currentTime + this.state.entries.length;
    newEntry.sortnumber = newEntryId;
    newEntry.start = approximatedTime;
    newEntry.end = approximatedTime + MILISECONDS_PER_HOUR;
    newEntry.comment = '';

    return newEntry;
  }

  createNewTimestamp(entryConfig) {
    let currentTime, method;

    //set default values for cutting typ and accuracy
    let cuttingType = CUTTING_TYPE_ROUND;
    let cuttingAccuracy = MILISECONDS_PER_FIFTEEN_MINUTE;

    if (entryConfig !== undefined) {
      // set cutting type
      cuttingType =
        entryConfig.cuttingType !== undefined
          ? entryConfig.cuttingType
          : CUTTING_TYPE_ROUND;

      // set cutting accuracy
      cuttingAccuracy =
        entryConfig.cuttingAccuracy !== undefined
          ? entryConfig.cuttingAccuracy
          : MILISECONDS_PER_FIFTEEN_MINUTE;
    }

    // Select algorithm by cutting type
    if (cuttingType === CUTTING_TYPE_ROUND) {
      method = Math.round;
    }
    if (cuttingType === CUTTING_TYPE_CEIL) {
      method = Math.ceil;
    }
    if (cuttingType === CUTTING_TYPE_FLOOR) {
      method = Math.floor;
    }

    // do calculations
    currentTime = new Date().getTime();
    currentTime = method(currentTime / cuttingAccuracy) * cuttingAccuracy;

    return currentTime;
  }

  showClearModal() {
    this.getClearModal().show();
  }

  hideClearModal() {
    this.getClearModal().hide();
  }

  entryBasedEnablingOfButtons() {
    if (this.isEmpty) {
      this.disableDownloadButton();
      this.disableClearButton();
    } else {
      this.enableDownloadButton();
      this.enableClearButton();
    }
  }

  disableDownloadButton() {
    const downloadBtn = this.getDownloadButton();
    downloadBtn.disabled = true;
  }

  enableDownloadButton() {
    const downloadBtn = this.getDownloadButton();
    downloadBtn.disabled = false;
  }

  disableClearButton() {
    const clearBtn = this.getClearButton();
    clearBtn.disabled = true;
  }

  enableClearButton() {
    const clearBtn = this.getClearButton();
    clearBtn.disabled = false;
  }

  //----------------------
  // Element selectors
  //----------------------

  getClearModal() {
    return this.template.querySelector('.modal-clear');
  }

  getDownloadButton() {
    return this.template.querySelector('.button-export');
  }

  getClearButton() {
    return this.template.querySelector('.button-clear');
  }

  getSummaryModal() {
    return this.template.querySelector('.modal-summary');
  }
}

//----------------------------
// Date/Time Utils (should be exported as being used in entrycmp too)
//----------------------------

function extractTimeStringFromTimeStamp(timestamp) {
  let fullDate, timeString;

  fullDate = new Date(timestamp);
  timeString = fullDate.toLocaleTimeString().substr(0, 5);

  return timeString;
}

function extractDateStringFromTimeStamp(timestamp) {
  let fullDate, dateString;
  fullDate = new Date(timestamp);
  dateString = fullDate.toISOString().split('T')[0];
  return dateString;
}

function formatDuration(durationInMilliseconds) {
  const resultObj = {};
  // extract days
  let baseValue = durationInMilliseconds;
  let remainder = baseValue % MILISECONDS_PER_DAY;
  resultObj.days = (baseValue - remainder) / MILISECONDS_PER_DAY;

  // extract hours
  baseValue = remainder;
  remainder = baseValue % MILISECONDS_PER_HOUR;
  resultObj.hours = (baseValue - remainder) / MILISECONDS_PER_HOUR;

  // extract minutes
  baseValue = remainder;
  remainder = baseValue % MILISECONDS_PER_MINUTE;
  resultObj.minutes = (baseValue - remainder) / MILISECONDS_PER_MINUTE;

  let result = '';
  result += resultObj.days > 0 ? '' + resultObj.days + 'd ' : '';
  result += resultObj.hours > 0 ? '' + resultObj.hours + 'h ' : '';
  result += resultObj.minutes > 0 ? '' + resultObj.minutes + 'm ' : '';
  result = result.substr(0, result.length - 1);
  return result;
}
