import { LightningElement,wire } from 'lwc';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import Account from '@salesforce/schema/Account';


import Name from '@salesforce/schema/Account.Name';

export default class lwc_0000_DisplayAccountsNamePickList extends LightningElement {

    value ='';

    // to get the default record type id, if you dont' have any recordtypes then it will get master

    @wire(getObjectInfo, { objectApiName: Account })

    accountMetadata;

    // now get the industry picklist values

    @wire(getPicklistValues,

        {

            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 

            fieldApiName: 'Name'

        }

    )

    industryPicklist;

    // on select picklist value to show the selected value

    handleChange(event) {

        this.value = event.detail.value;

    }

}