import { LightningElement, wire, api } from 'lwc';
import getContacts from '@salesforce/apex/CL_poc.getContacts';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';



export default class DatatableUpdateExample extends LightningElement {

    // static customTypes = {
    //     customText: {
    //         template: customName,
    //         standardCellLayout: true,
    //         typeAttributes: ['accountName'],
    //     }
    // }
    errortext = 'slds-text-color_success slds-text-title_caps';
     COLS = [
        { label: 'MembershipYear', fieldName: 'membership_Year__c', editable: true ,type : 'number',  cellAttributes : { class: this.errortext,
                                                                                               }
        },
        { label: 'Last Name', fieldName: 'LastName', editable: false },
        { label: 'Title', fieldName: 'Title' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Email', fieldName: 'Email', type: 'email' }
    ];
    // type valildation save draft validation
    @api recordId;
    columns = this.COLS;
    draftValues = [];
    data;
    dataerror;
    checkBool;
    // @wire(getContacts, { accId: '$recordId' })
    // contact;
   @wire(getContacts)
   contact({data,error})
   {
       if(data)
       {
           this.data = data;
       }
       else{
           this.dataerror = error;
       }
   }
    
//  



// get draftValues()
// {
//     return this.draftValues;
// }

errors
// ERROR TOAST 
    handleSave(event) {
        
       
        this.checkBool = true;
        let fields = {}; 
        this.draftValues = [...event.detail.draftValues];
       
       fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
      
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        console.log(JSON.stringify(event.detail.draftValues[0].FirstName));
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;
        console.log("fields==> "+ JSON.stringify(fields));
        const recordInput = {fields};
        console.log("Draft Values===> "+ JSON.stringify(event.detail.draftValues[0]))
       
        for(let i=0 ; i < this.draftValues.length ; i++){
            if (this.draftValues[i].membership_Year__c  == 0 || this.draftValues[i].membership_Year__c == null) {

            console.log("entered the loop")
                const rowNumber =  this.draftValues[i].id;
                this.errors =  {
                    rows: {
                      
                        rowNumber :{   title: 'First Error Found!!!',
                            messages: [
                                'Enter a valid Membership Year.',
                                
                            ],
                            fieldNames: ['membership_Year__c']
                         }
                         },
                    
                    table: {
                        title: 'Entry Error',
                        messages: [
                              this.draftValues[i].id + " must not be blank"
                           
                        ]
                    }
                    
                }
              

                // const evt = new ShowToastEvent({
                //     message: ' FirstName cannot be kept blank',
                //     variant: 'error',
                // });
                // this.dispatchEvent( evt );
                this.checkBool = false;
                
              
             console.log("Exiting the loop")
            }
            // break;   
        }
        console.log(JSON.stringify(this.error))
        if(this.checkBool == true)
        {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
        }
        console.log("Fields before Null "+ JSON.stringify(fields))
        console.log("draftValues===>  "+ JSON.stringify(this.draftValues))
        fields = null;
        this.draftValues = [];
        console.log("fields ==> " + fields);
        console.log("this.draftValues==> "+ this.draftValues)
        return refreshApex(this.contact)
   }


   // row level error message
 
//  inputValue
//  // for field level validation event
//   handleinput(event)
//  {
//     this.inputValue = event.target.value;
//  }
//  get inputValue()
//  {
//      return this.inputValue;
//  }
 

 
 

element
atomicChange =[]
inputValue = 0

validateCellValue(event)
{   
    
    this.atomicChange  = [...event.detail.draftValues];
    console.log("atomicChange ===> "+ this.atomicChange.length)
    for(let k=0 ; k < this.atomicChange.length ; k++){
        console.log("Value Entered==> " + parseInt(this.atomicChange[k].membership_Year__c));
    }
   
        if( this.atomicChange[0].membership_Year__c === 1)
        {         
            console.log("Entered the if by checking length ");
            this.element = this.atomicChange[0].membership_Year__c
                    const eachElement = parseInt(this.element);
                if(Number.isInteger(eachElement))
                {
                    this.inputValue= parseInt(eachElement);
                }
                else{
                    //  alert("Please enter Integer From 1 To 5")
                    console.error("Please enter Integer From 1 To 5");
                }
        }
        else{
            // alert("Please enter only one digit")
            console.error("Please enter only one digit");
        }
        
       
        
    

    console.log("onCellCahanges Ran..!!");
   

        if( parseInt(this.atomicChange[0].membership_Year__c) > 0 && parseInt(this.atomicChange[0].membership_Year__c) < 6 )
            {
               
                console.log("Done!!!!")
            }
            else{
                this.errortext ='slds-text-color_error slds-text-title_caps'  //'slds-text-color_error slds-text-title_caps'
                console.warn("You entered value other than 1, 2,3,4,5")
                console.error("Errorrrr!!!!")
                this.errors = {
                  rows:{
                      messages:['You entered wrong input']
                  },
                    table: {
                        title: 'Entry Error',
                        messages: [
                              "Please enter 1 to 5 integer"
                           
                        ]
                    }
                    
                }
            
    
            this.atomicChange = [];
    
        
    


}
validationFunction()
{
    this.atomicChange  = [...event.detail.draftValues];
    console.log("atomicChange ===> "+ this.atomicChange.length)
    for(let k=0 ; k < this.atomicChange.length ; k++){
        console.log("Value Entered==> " + parseInt(this.atomicChange[k].membership_Year__c));
    }
   
        if( this.atomicChange[0].membership_Year__c === 1)
        {         
            console.log("Entered the if by checking length ");
            this.element = this.atomicChange[0].membership_Year__c
                    const eachElement = parseInt(this.element);
                if(Number.isInteger(eachElement))
                {
                    this.inputValue= parseInt(eachElement);
                }
                else{
                    //  alert("Please enter Integer From 1 To 5")
                    console.error("Please enter Integer From 1 To 5");
                }
        }
        else{
            // alert("Please enter only one digit")
            console.error("Please enter only one digit");
        }
        
       
        
    

    console.log("onCellCahanges Ran..!!");
   

        if( parseInt(this.atomicChange[0].membership_Year__c) > 0 && parseInt(this.atomicChange[0].membership_Year__c) < 6 )
            {
               
                console.log("Done!!!!")
            }
            else{
                this.errortext ='slds-text-color_error slds-text-title_caps'  //'slds-text-color_error slds-text-title_caps'
                console.warn("You entered value other than 1, 2,3,4,5")
                console.error("Errorrrr!!!!")
                // this.errors = {
                //   rows:{
                //       messages:['You entered wrong input']
                //   },
                //     table: {
                //         title: 'Entry Error',
                //         messages: [
                //               "Please enter 1 to 5 integer"
                           
                //         ]
                //     }
                    
                }
            
    
            this.atomicChange = [];
    
        
    
            }
        }



// import { LightningElement,wire } from 'lwc';
// import getContacts from '@salesforce/apex/CL_poc.getContacts';
// import getFreshData from '@salesforce/apex/CL_poc.getFreshData';
// import { NavigationMixin } from 'lightning/navigation';
// import {CurrentPageReference} from 'lightning/navigation';
// import { refreshApex } from '@salesforce/apex';
// import { updateRecord } from 'lightning/uiRecordApi';
// import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
// import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
// import ID_FIELD from '@salesforce/schema/Contact.Id';
// import LEADSOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';
// import {ShowToastEvent} from 'lightning/platformShowToastEvent';


// // Web Phone Inquiry , Partner Referral, Purchased List, Other
                 

// export default class Lwc_poc_datatable extends NavigationMixin(LightningElement) {

//      actions = [
//         { label: 'Web', value: 'Web' },
//         { label: 'Phone Inquiry', value: 'Phone Inquiry' },
//         { label: 'Partner Referral', value: 'Partner Referral' },
//         { label: 'Purchased List', value: 'Purchased List' },
//         { label: 'Other', value: 'Other' }
//     ];

//      COLUMNS= [{label:"first Name", fieldName:"FirstName", editable:true},
//                 {label:"Last  Name", fieldName:"LastName", editable:true},

              
//                 {label:"Lead Source", fieldName:"LeadSource"}
                   
//                     // type: 'picklist',
//                     // fixedWidth : 200,
//                     // typeAttributes: {
//                     //     placeholder: 'Choose rating', options: [
//                     //         { label: 'Hot', value: 'Hot' },
//                     //         { label: 'Warm', value: 'Warm' },
//                     //         { label: 'Cold', value: 'Cold' },
//                     //     ] // list of all picklist options
//                     //     , value: { fieldName: 'LeadSource' } // default value for picklist
//                     //     , context: { fieldName: 'Id' }
//                     // }
//                 ];

//             //     columnscustomtable = [{
//             //         label: ' Record Name' , fieldName:'name', type:'text'},
//             //         {label: 'Custom Type A', fieldName:'id', type: 'customTypeA', typeAttributes: {
//             //             customValueA : {fieldName : 'customA'}
//             //         }
//             //     },
//             // {label: 'Custom Type B', fieldName: 'customA'}]
//     draftValues = [];
//     data=[]  ;
//     columns = this.COLUMNS;
//     error;
//     record;
//     freshdata = [];
//     CurrentPageReference = null ;
//     hasConnectedCallbackRun = false;
   
//     handleSave(event) {
//         console.log("Save Handle ran...!!!");
//         const fields = {}; 
      
//         fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
//         fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
//         fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;
//       //  fields[LEADSOURCE_FIELD.fieldApiName] = event.detail.draftValues[0].LeadSource;
//         //const recordInput = {fields};
//         console.log("draft value===> " + JSON.stringify(event.detail.draftValues[0]));
//     //    console.log("record INput===> "+ JSON.stringify(recordInput));

//         updateRecord({fields})
//         .then(() => {
//             this.dispatchEvent(
//                 new ShowToastEvent({
//                     title: 'Success',
//                     message: 'Contact updated',
//                     variant: 'success'
//                 })
//             );
//         });
//         this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Contact updated',
//                         variant: 'success'
//                     })
//                 );
//          //   Display fresh data in the datatable
//             return refreshApex(this.contact).then(() => {

//                 // Clear all draft values in the datatable
//                 this.draftValues = [];

            
//         }).catch(error => {
//             this.dispatchEvent(
//                 new ShowToastEvent({
//                     title: 'Error updating or reloading record',
//                     message: error.body.message,
//                     variant: 'error'
//                 })
//             );
//         });

//     }

    
   
          
//     connectedCallback()
//     {
//         this.data = [];
//         console.log('connected method call started...!!!');
//         getFreshData()
//         .then(result => {
           
//             this.data= [...JSON.parse(JSON.stringify(result))];
//            this.data.forEach(element)
//            {
//                this.sourceLabel = element.LeadSource;
//                console.log("each source===> "+ this.sourceLabel);
//            }
//              console.log('this.data with newData=> '+ this.data.length);
          
            
            
//         })
//         .catch(error =>{
//             this.error = error;
//         });
//         console.log('connected method call ended...!!!');
       
        
//     }
    

//      callFreshData(event)
//    {

//         this.data = [];
//         console.log('CallFreshDatA method call started...!!!');
//         getFreshData()
//         .then(result => {
           
//             const newData = [...JSON.parse(JSON.stringify(result))];
//             console.log('newdata = > ' + newData.length);
//             //  var freshdata = Object.assign({} , ...newData);
            
//             console.log('this.data nulified=> ' +this.data.length);
           
//              this.data = [...newData];
//              console.log('this.data with newData=> '+ this.data.length);
//            //newData =[];
            
            
//         })
//         .catch(error =>{
//             this.error = error;
//         });
//         console.log('CallFreshDatA method call ended...!!!');
        
    
   
//    }

//     handleRowAction(event)
//     {
//         const action = event.detail.action.name;
//         const row = event.detail.row;
//         this.record = row;
//         switch (action) {
//             case 'edit_details':

//                 console.log('edit Details: ' + JSON.stringify(row));
//                 console.log('this.record=> ' +JSON.stringify(this.record.Id));
//                 this.data = [];
                
                
//                 this[NavigationMixin.Navigate]({
//                     type: 'comm__namedPage',
//                     attributes: {
//                         name: 'poceditcontact__c'
//                     },
//                     state: {
//                        "c__urlid" : this.record.Id
                         
//                     }
//                 });
                
                
//                 break;
//             }

//     }
    }