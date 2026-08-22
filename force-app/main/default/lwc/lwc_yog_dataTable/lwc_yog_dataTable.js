import { LightningElement,wire } from 'lwc';
import  getContacts  from '@salesforce/apex/CL_yog_ContactController.getContacts';

const  COLLUMN=[  {label:"Contact Names",fieldName:"FirstName", type:"text"},
            {label:"contact Lastnames",fieldName:"LastName"},
                 {label:"Contact Phone", fieldName:"MobilePhone", type:"Phone"}
                ];


export default class Lwc_yog_dataTable extends LightningElement {

    columns = COLLUMN;
    contacts_data
    error
    idd
    showCard = false;

@wire(getContacts)
myContacts({data,error})
{
    if(data)
    {
        this.contacts_data = data;
    }
    else{
        this.error = error;
    }
}

handleRowSelection(event)
{
    const row = event.detail.row;
    this.idd =  row.id;
}

pleaseShowCard(event)
{
 this.showCard = true;
}
pleasehide()
{
    this.showCard = false;
}




}