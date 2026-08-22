import { LightningElement,track, wire } from 'lwc';
import getContacts from '@salesforce/apex/CL_getTheContactDetails.getContacts';
//import Email from '@salesforce/schema/Contact.Email';

const columns = [{label:'Contact Name', fieldName:'Name',type:'text'},
                 {label:'Email',fieldName:'Email',type:'text'}
                ];
export default class Lwc_mailbox extends LightningElement 
{
    //Declarations and assignments
    columns = columns;
    showPopUp = false;
    @track data;
    error;
    @track searchItem = null;
    @track selectedRows=[];
    @track totalSelectedRows = 0;
     selectedRecordList = [];
    @track addedRecipients= [];
     emptyRecipients =true;
     @track distinctRecipients = 0;
     @track helpTextContent;
    searchInput(event)
    {
        this.searchItem = event.target.value;
        
    }
    @wire(getContacts,({key:'$searchItem'}))
    contacts({data,error}){
        if(data)
        {
                this.data = data;
        }
        else if(error)
        {
            this.data = undefined;
        }
    }

    handleRowSelection(event)
    {    
        const selectedRows = event.detail.selectedRows;
     //   this.distinctRecipients = 0;
        
         this.selectedRecordList = JSON.parse(JSON.stringify(selectedRows));
         this.totalSelectedRows = selectedRows.length;
         this.helpTextContent = "Total Selected Rows : " + selectedRows.length ;
          "Distinct Records : "+ this.distinctRecipients;
        // Calculation of Distinct Recipients
        //  if(this.addedRecipients.length !== 0)
        //   {
        //     for(let i=0; i< this.addedRecipients.length ; i++)
        //     {
        //         for(let j=0; j<this.selectedRecordList.length  ; j++)
        //         {

        //             console.log(this.addedRecipients[i].Email);
        //             console.log(this.selectedRecordList[j].Email);
        //             console.log(this.addedRecipients[i].Email!=this.selectedRecordList[j].Email );
                    
        //            if(this.addedRecipients[i].Email === this.selectedRecordList[j].Email)
        //            {
        //                this.distinctRecipients += 1;
        //            } 
        //            else 
        //            {
        //                this.distinctRecipients = 0
        //            }
                    
                //  if((this.addedRecipients[i].Email!=this.selectedRecordList[j].Email) &&( 
                //     this.selectedRecordList[j].Email != null || this.selectedRecordList[j].Email != '' )
                //     && (this.addedRecipients[i].Email != null || this.addedRecipients[i].Email != '' ))
                //          {
                //                 this.distinctRecipients= this.selectedRecordList.length -1 ;
                //                 console.log('DR : ' + this.distinctRecipients);
                                
                //         }
                }
             
            

        
         

        
    


    addSelectedRecords(event)
    {
        this.emptyRecipients =false;
       if(this.addedRecipients.length === 0)
       {
            this.addedRecipients = [...this.selectedRecordList];

       }else {

            let arr1 = [];
            let arr2= [];
            arr1 = [...this.addedRecipients];
            arr2 = [...this.selectedRecordList];
            
                       
            this.addedRecipients = [...arr1,...arr2];
            this.totalSelectedRows = this.addedRecipients.length;
         

        }
         
            this.showPopUp=false;
            this.data=null;
         
     }

     resetSelection(event)
     {
        this.template.querySelector('.datable_1').maxRowSelection = null;
     }
    
     openPopUp(event)
      {       
             this.distinctRecipients = 0;
             this.helpTextContent = this.helpTextContent = "Total Selected Rows : 0"  +"\n \
                                     Distinct Records : "+ this.distinctRecipients;
             this.totalSelectedRows = 0;
             this.data = [];
             this.showPopUp = true;
            
      }
        //Closing the PopUP
     closePopUp(event)
     {
        this.distinctRecipients = 0;
        this.totalSelectedRows = 0;
        this.showPopUp=false;
        this.data=[];
      }
}