import { LightningElement } from 'lwc';
import {wire} from 'lwc';
import getAccounts from '@salesforce/apex/CL_00_getsObjectRecords.getAccounts';

const actions=[{label:'Edit',Name:'Edit'},   
                {label:'View',Name:'View'}
];

const colls =[
    {label:'Name',fieldName:'Name'},
    {label:'Mobile',fieldName:'Phone'},
    {label:'City',fieldName:'BillingCity'},
    {type:'action',
        typeAttributes:{rowActions:actions}}
];

export default class Lwc_00_displayContactsInDataTable extends LightningElement 
{
    col=colls;
    searchName;
    @wire(getAccounts,{accName:'$searchName'}) AccountsList;

    searchmee(event)
    {
        this.searchName = event.target.value;
    }

}