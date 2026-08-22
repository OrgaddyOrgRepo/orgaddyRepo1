import { LightningElement, track,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import ID_FIELD from '@salesforce/schema/Contact.Id';

export default class ComboboxComp extends LightningElement {


    @track value = '';
    @track options = [];
     fields = [FIRSTNAME_FIELD, ID_FIELD];
     sortBy = FIRSTNAME_FIELD;
     sortDirection = 'ASC';
     limit = 10;
    connectedCallback() {
        this.loadOptions();
    }

    mydata =[] ;
    @wire(getRecord,{type: 'Contact',fields:'[FIRSTNAME_FIELD, ID_FIELD]',sortBy:'FIRSTNAME_FIELD',sortDirection :'ASC',limit : '10'})
    result({data,error})
    {
        this.mydata = data ;
        console.log(JSON.stringify(this.mydata));
    }
    loadOptions() {
    console.log(JSON.stringify(this.mydata));
        // for(let i=0; i< this.mydata.length ; i++)
        // {
        //    const rec = this.mydata[i]
        //     this.options.push({label: getFieldValue(rec, FIRSTNAME_FIELD),
        //                      value: getFieldValue(rec, ID_FIELD)})
        // }
        // this.mydata.forEach(response => {
        //     const data = response.data.records.map(record => {
        //         return {
        //             label: getFieldValue(record, FIRSTNAME_FIELD),
        //             value: getFieldValue(record, ID_FIELD)
        //         };
        //     });
        //     this.options = data;
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}