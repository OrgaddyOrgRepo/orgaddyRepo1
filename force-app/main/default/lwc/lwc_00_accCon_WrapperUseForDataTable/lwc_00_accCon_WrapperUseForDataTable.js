import { LightningElement,wire,track,api } from 'lwc';
import getTheAccountswithContacts from '@salesforce/apex/CL_AccountController.getTheAccountswithContacts'
import {NavigationMixin} from 'lightning/navigation';

const actions = [{label:'Edit',name:'Edit'},   //Notice the n IN name
                 {label:'View',name:'View'}   //notice the N in Name
                ];


const columns = [{label:'Contact Name',fieldName:'Name'},
           {label:'Mobile',fieldName:'MobilePhone'},
           {label:'City',fieldName:'MailingCity'},
           {   
               type:'action',
               typeAttributes: { rowActions: actions }
            }
           
        ];

export default class Lwc_00_accCon_WrapperUseForDataTable extends NavigationMixin(LightningElement) 
{
    @api recordId;
    @track aacAnditsContacts;
    error;
    columns=columns; 
    record;
    @wire(getTheAccountswithContacts)
    aacAnditsContacts({error,data})
    {
        if(data)
        {
            this.aacAnditsContacts = data ; 
        }
        else if(error)
        {
            this.error = error;
        }
    }

    handleRowAction(event)
    {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'View':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'Edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Contact',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }

    
}