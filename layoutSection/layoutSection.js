import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class LayoutSection extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api columns;
    @api mode;
    @api objectToUpdate;
    @api fieldsToUpdateString;
    @track fieldsToUpdate;
    @track recordIdToUpdate;
    @api title;
    @api styles;
    @api recordIdField;
    @api iconName;
    fieldsToQuery = [];
    

    connectedCallback(){
        /**
         * Set from where the record Id can be found
         * This will be used to set the record Id that will be updated
         */
        this.fieldsToQuery.push(this.objectApiName+'.'+this.recordIdField)

        /**
         * Fields that are to be shown on the UI are set here.
         */
        let fieldsToUpdate = [];
        for(const item of  this.fieldsToUpdateString.split(',')){
            fieldsToUpdate.push(item.trim());
        }
        this.fieldsToUpdate = fieldsToUpdate;        
    }


    @wire(getRecord, { recordId: '$recordId', fields: '$fieldsToQuery' })
    wiredAccount({ error, data }) {
        if (data) {
            console.log('data', data);
            this.recordIdToUpdate = data.fields[this.recordIdField].value;
            this.error = undefined;
        } else if (error) {
            console.log('Error', error);
            this.error = error;
            this.record = undefined;
        }
    }
}