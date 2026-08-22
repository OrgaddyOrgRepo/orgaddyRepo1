import { LightningElement,wire } from 'lwc';
import findTheContacts from '@salesforce/apex/CL_00000_SearchAccRelatedContacts.findTheContacts';
searchText;
const collum = [ 
    {label:'Name',fieldName:'Name',type:'url'},
    {label:'Mobile',fieldName:'MobilePhone'},
    {label:'City',fieldName:'MailingCity'}
];
export default class Lwc_000_DisplayContactsOfAccount extends LightningElement 
{
    
    col=collum;

    @wire(findTheContacts,{accName:'$searchText'}) contactsList;
    
    searchMe(event)
    {
    this.searchText = event.target.value;

    }
}