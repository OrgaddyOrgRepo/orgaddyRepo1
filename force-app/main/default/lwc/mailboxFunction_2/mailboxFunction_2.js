import { LightningElement,wire,track } from 'lwc';
import getContacts from '@salesforce/apex/CL_getTheContactDetails.getContacts';
// import {getContacts} from '@salesforce/apex/CL_getTheContactDetails.getContacts';
// export default class MailboxFunction_2 extends LightningElement {

//     @track config = {
//         objectName: "Account",
//         pageSize: 5,
//         tableConfig: {
//             columns: [
//                 { api: 'Name', label: 'Name', fieldName: 'Name', sortable: true },
//                 { api: 'CreatedDate', label: 'Created On', fieldName: 'CreatedDate', type: 'date', sortable: true },
//                 { api: 'CreatedBy.Name', label: 'Created By', fieldName: 'CreatedByName', sortable: true }
//             ],
//             maxRowSelection: 1
//         }
//     };
//     getSelected() {
//         console.log("getSelectedRows => ", this.template.querySelector('c-datatable').getSelectedRows());
//     }
// }





const columns = [
    { label: 'Name', fieldName: 'Name' },
    {label:'Email',fieldName:'Email'}
    
];

export default class MailboxFunction_2 extends LightningElement {
   
    @track columns = columns;
    @track data;
    searchKey = 'm';
    @wire(getContacts,({key:'$searchKey'}))
    contacts({data,error})
    {
        if(data)
        {
            this.data = data;

        }
       
            
        }
    
        totalRowsSelected;
    getSelectedRecords(Event) 
    {
        const selectedRows = Event.detail.selectedRows;
        // Display that fieldName of the selected rows
        this.totalRowsSelected = JSON.stringify(selectedRows.length);
        
        for (let i = 0; i < selectedRows.length; i++) {
            // console.log('You selected: ' + selectedRows[i].Name);
            // console.log('The Eamil was: '+ selectedRows[i].Email);
            
        }
        console.log('rows selected..' + this.totalRowsSelected);
        

    }
}