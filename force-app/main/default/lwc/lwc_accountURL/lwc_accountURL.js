import { LightningElement, track } from 'lwc';



   
import fetchAccounts from '@salesforce/apex/CL_lwcAccount.fetchAccounts';
const COLUMNS = [
    {
        label: 'Name', fieldName: 'Name', type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'Name'
            }
        }
    },
    {label: 'Type', fieldName: 'Type', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone', 
        cellAttributes: { 
            iconName: 'utility:phone_portrait' 
        }
    }
];


export default class Lwc_accountURL extends LightningElement {
    @track lstAccounts;
    lstColumns = COLUMNS;

    connectedCallback(){
        fetchAccounts().then(response => {
            this.lstAccounts = response;
            if(this.lstAccounts){
                this.lstAccounts.forEach(item => item['Name'] = '/lightning/r/Account/' +item['Id'] +'/view');
                
            }
        }).catch(error => {
            console.log('Error: ' +error);
        });
    }

}