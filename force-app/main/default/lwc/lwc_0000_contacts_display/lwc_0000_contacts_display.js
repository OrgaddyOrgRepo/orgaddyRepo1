import { LightningElement ,track,wire,api } from 'lwc';
import getTheContacts from '@salesforce/apex/CL_00000_SearchAccRelatedContacts.getTheContacts';
import { NavigationMixin } from 'lightning/navigation';

const actions= [
        {label:'view',name:'view'},
        {label:'edit',name:'edit'}
                ];


const colls = [
    {label:'Name',fieldName:'Name'},
    {label:'City',fieldName:'MailingCity'},
    {label:'Mobile',fieldName:'MobilePhone'},
    {type:'action',
    typeAttributes:{rowActions:actions}
    }
];
var rowid;

export default class Lwc_0000_contacts_display extends NavigationMixin(LightningElement)
 {   
     
     searchName;
     @api col=colls ;
     @track acc_contacts;
     @wire(getTheContacts,{accName:'$searchName'}) acc_contacts;
     
    
     searchme(event)
     {
         this.searchName = event.target.value;
     }
     handleRowAction(event)
     {   
         const actionName = event.detail.action.name;
         this.rowid    = event.detail.rowid ;

         switch (actionName){
             case 'view':
                alert('you clicked \'View\' Button and The Row Id is : '+ rowid);
             this[NavigationMixin.Navigate]({
                 type:'standard__recordPage',
                 attributes:{
                     recordId  : '0035g000006Ms11AAC',
                     actionName:'view',
                     objectApiName:'Contact'
                 }

             });
             console.log(row);
             break;
             case 'edit':
                alert('you clicked \'Edit\' Button and The Row Id is : '+ rowid);
             this[NavigationMixin.Navigate]({
                 type:'standard__recordPage',
                 attributes:{
                     recordId: rowid,
                     objectApiName:'Contact',
                     actionName:'edit'
                 }
             });
             break;
             default:
                 alert('Not getting the Row.Id!!!!');
         }
     }
     
 }