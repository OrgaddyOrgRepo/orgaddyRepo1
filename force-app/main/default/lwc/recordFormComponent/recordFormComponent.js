import { LightningElement } from 'lwc';
import CONTACT from '@salesforce/schema/Contact';
import FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import LASTNAME from '@salesforce/schema/Contact.LastName';
import PHONE from '@salesforce/schema/Contact.MobilePhone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class RecordFormComponent extends LightningElement {

fields = [FIRSTNAME,LASTNAME,PHONE];
objectApiName = CONTACT;
recordId ='';

handleSuccess(event)
{
   // create event
    const evt = new ShowToastEvent({
        title : ' Contact created successfully',
        message : 'Contact created with Id : '+ event.detail.id,
        variant : 'success' // Default is 'info'
    });
    // fire the event
    this.dispatchEvent(evt); 
}
}