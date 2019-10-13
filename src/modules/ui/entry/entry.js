import { LightningElement, api, track } from 'lwc';

export default class Entry extends LightningElement {
    @api
    get jsonInput() {
        return {};
    }
    set jsonInput(value) {
        var comment, startTimeStamp, endTimeStamp;

        if (value !== undefined) {
            if (value.comment !== undefined) {
                comment = value.comment;
                this.state.comment = comment;
            }
            if (value.start !== undefined && value.start.value !== undefined) {
                startTimeStamp = value.start.value;
                this.state.startTimeStamp = startTimeStamp;
                this.setDisplayStartDate();
            }
            if (value.end !== undefined && value.end.value !== undefined) {
                endTimeStamp = value.end.value;
                this.state.endTimeStamp = endTimeStamp;
            }
        }
    }

    state = {};

    @track
    displayState = {};

    setDisplayStartDate() {
        this.displayState.startdate = this.extractDateStringFromTimeStamp(
            this.state.startTimeStamp
        );
    }

    extractDateStringFromTimeStamp(timestamp) {
        var fullDate, dateString;
        // eslint-disable-next-line no-console
        console.log(timestamp);
        fullDate = new Date(timestamp);
        // eslint-disable-next-line no-console
        console.log(fullDate);
        dateString = fullDate.toISOString().split('T')[0];
        // eslint-disable-next-line no-console
        console.log(dateString);
        return dateString;
    }

    @api
    get startDate() {
        return this.state.api.startDate;
    }
    set startDate(value) {
        this.state.api.startDate = value;
    }

    @api
    get startTime() {
        return this.state.api.startTime;
    }
    set startTime(value) {
        this.state.api.startTime = value;
    }

    @api
    get endDate() {
        return this.state.api.endDate;
    }
    set endDate(value) {
        this.state.api.endDate = value;
    }

    @api
    get endTime() {
        return this.state.api.endTime;
    }
    set endTime(value) {
        this.state.api.endTime = value;
    }

    @api
    get comment() {
        return this.state.api.comment;
    }
    set comment(value) {
        this.state.api.comment = value;
    }

    get difference() {
        var startTimestamp = this.startDate + 'T' + this.startTime;
        var endTimestamp = this.endDate + 'T' + this.endTime;

        let startDate = new Date(startTimestamp);
        let endDate = new Date(endTimestamp);

        let difference = endDate - startDate;
        return difference / (1000 * 60 * 60);
    }

    @track
    state = { api: {} };

    handleChangeStartDate(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'start-date'
        };
        this.startDate = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeStartTime(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'start-time'
        };
        this.startTime = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeEndDate(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'end-date'
        };
        this.endDate = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeEndTime(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'end-time'
        };
        this.endTime = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeComment(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'comment'
        };
        this.createAndFireChangeEvent(param);
    }

    createAndFireChangeEvent(detailParam) {
        var externalEvent = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: detailParam
        });
        this.dispatchEvent(externalEvent);
    }
}
