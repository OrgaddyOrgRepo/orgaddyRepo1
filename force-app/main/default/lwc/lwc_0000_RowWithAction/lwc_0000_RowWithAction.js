import { LightningElement,wire,track } from 'lwc';
import findTheContacts from '@salesforce/apex/CL_00000_SearchAccRelatedContacts.findTheContacts';
import { NavigationMixin } from 'lightning/navigation'; 


const actions = [
    { label: 'Edit', name: 'Edit' },
    { label: 'View', name: 'View' },
];

const columns = [
    { label: 'Name', fieldName: 'Name' },
   
    { label: 'Mobile', fieldName: 'MobilePhone', type: 'phone' },
    { label: 'City', fieldName: 'MailingCity', type: 'text' },
    
    
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class  DatatableWithRowActions  extends NavigationMixin(LightningElement) 
{

   @track data;
   
    error;
    searchText;
    columns = columns;
    //Now calling the APEX  method
    @wire(findTheContacts,{accName:'$searchText'}) 
    Contacts({data,error})
    {
        if(data)
        {
            this.data =data;
        }
        else if(error)
        {
            this.error= undefined;
        }

    } 
    //FUNCTIONS
    searchMee(event)
    {
        this.searchText = event.target.value;
    }

    handleRowActions(event)
    {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName){

            case 'Edit':
                this[NavigationMixin.Navigate]({
                    type:'standard__recordPage',
                    attributes:{
                        recordId: row.Id,
                        objectApiName:'Contact',
                        actionName:'edit'
                    }
                });
                break;

            case 'View' :
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId: row.Id,
                    objectApiName:'Contact',
                    actionName:'view'
                }
            });
            break;
            
            default:
                alert('The Record could not be fethced. Error in action Handler function');
        }
    }
}