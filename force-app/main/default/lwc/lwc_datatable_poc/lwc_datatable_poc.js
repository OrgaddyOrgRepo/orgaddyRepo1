import { LightningElement } from 'lwc';
import  getAccounts  from '@salesforce/apex/CL_AccountController.getAccounts';


const columns = [{label:"Name", fieldName:"Name", type:"text"},
{label:"id", fieldName:"id", type:"text"},
{label:"Rating", fieldName:"Rating", type:"text"}
];



export default class Lwc_datatable_poc extends LightningElement {

    columns = columns;
    data;
    error;
    connectedCallback()
    {
        console.log("connected Ran...");
        getAccounts()
        .then(result=>{
            if(result)
            {
                this.data = JSON.stringify(result);
                console.log(this.data)
            }
           
        }); 
    }
}