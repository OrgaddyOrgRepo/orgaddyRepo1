import { LightningElement } from 'lwc';
import getFreshData from '@salesforce/apex/CL_poc.getFreshData'; import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import MEMBERSHIPYEAR_FIELD from '@salesforce/schema/Contact.membership_Year__c';
import ID_FIELD from '@salesforce/schema/Contact.Id';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
 import { NavigationMixin } from 'lightning/navigation';
import NumberOfFailedLogins from '@salesforce/schema/User.NumberOfFailedLogins';
// membership_Year__c
const COLUMNS =[ {label:"Membership Year", fieldName:"membership_Year__c",editable: true ,type:"number"
                // ,
                // cellAttributes:{
                //     class: {
                //         fieldName: 'slds-text-color_error'
                //     }
                // }
                },
                {label:"Last Name", fieldName:"LastName",type:"Text"},
                {label:"Email", fieldName:"Email",type:"Text"}];

export default class Lwc_datatable_test extends NavigationMixin(LightningElement) {

 
   columns = COLUMNS;   
data;
error;
errors;
draftValues=[];
rowNumber
errorFlag =false;

connectedCallback()
{
    this.getTheContacts();
}

getTheContacts()
{
    getFreshData()
    .then(result => {
        if(result)
        {
            console.log("data found");
            this.data = result;
            this.error = null;
        }
        else{ 
            this.error = error;
        
        }
    })
}
handleCellChange(event)
{
    // this.errors={};
    
    const enteredData = event.detail.draftValues;
    for(var i =0 ; i< enteredData.length;i++)
    {
      // const rowNumber = enteredData[i].id;
        if(enteredData[i].membership_Year__c < 1 || enteredData[i].membership_Year__c > 5)
        {
            this.errorFlag = true; 
            this.errors={
                rows:{
                    title: 'This row error title',
                         messages :['Enter valid Value form 1 to 5'],
                    fieldNames: ['Membership Year']
                }
            
            ,
                table:{
                    messages:['Enter from to 1 to 5 only']
                } 
                
                 
            }
             console.log("draft Error Ran..!");
           // this.format = 'slds-text-color_error'
            
        
        } // if ends
        else{
            this.errors ={};
            this.errorFlag = false; 
        }
}

}

   // Update the editable field
   handleSave(event)
   {
       if( this.errorFlag == false)
       {
       this.errors ={};
       this.draftValues =[...event.detail.draftValues];
       console.log("draftValues===> " + JSON.stringify(event.detail.draftValues[0]))
        console.log('Save Ran!!!!')
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.draftValues[0].Id;
        fields[MEMBERSHIPYEAR_FIELD.fieldApiName] =  this.draftValues[0].membership_Year__c;
        fields[EMAIL_FIELD.fieldApiName] = this.draftValues[0].Email;
       // fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.draftValues[0].LastName;
        const recordInput = {fields};
        console.log("recordInput==> "+ JSON.stringify(recordInput))
        updateRecord(recordInput)
        .then(() => {
           
            
           
          
                console.log("Updation Done");
                setTimeout(()=>{this.getTheContacts();},2000);
                
        })
        .catch(error =>{

            // this.errors ={ rows:{},table:{}};

            // this.errors.rows[this.draftValues[0].id] ={title: 'test error title',
            //                                             messages:['Enter only 1 to 5 numbers'],
            //                                            fieldNames: ['membership_Year__c']}
            this.errors={
                rows:{
                    b : { messages :['Enter valid Value form 1 to 5']},
                    fieldNames: ['membership_Year__c']
                },
                table:{
                    messages:['Enter from to 1 to 5 only']
                } 
                } //errors end
            
        })// catch ends
        this.draftValues = [];
        
        return refreshApex(this.recordInput);
    }
    else
    {
        this.errors={table:{
            messages:['Please enter valid Data in membership Year']
        } 
        }
    }
   }
   
   //Navigation
    navigateToCreateRecordPage()
    {
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
           typeAttributes:{
            name:'Create_Record'
           } 
        })
    }

}