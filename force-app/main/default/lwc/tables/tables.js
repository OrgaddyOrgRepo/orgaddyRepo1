import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/CL_00_getsObjectRecords.getContacts';

export default class Tables extends LightningElement {
data=[]
    connectedCallback()
    {
        console.log('Loaded...');

        getContacts()
        .then(
            result=>{
                this.data = [...result];
            }
        )


        let recs = document.getElementById('customTable');
        console.log(recs);
    }
}