import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import LASTNAME from '@salesforce/schema/Contact.LastName';
import PHONE from '@salesforce/schema/Contact.Phone';
export default class Practice extends LightningElement {

row = {Id : 0 , form:{FirstName : '',LastName :'',Phone:''}}
rowList = [] ;
recId ='';
objectApiName = CONTACT_OBJECT;
fields = [FIRSTNAME,LASTNAME,PHONE];
}