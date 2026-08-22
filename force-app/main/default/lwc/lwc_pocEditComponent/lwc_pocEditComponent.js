import {LightningElement,wire} from 'lwc';

import updateContact from '@salesforce/apex/CL_poc.updateContact';
import {NavigationMixin} from 'lightning/navigation';
import {CurrentPageReference} from 'lightning/navigation';


export default class Lwc_pocEditComponent extends  NavigationMixin(LightningElement) {

   /* currentPageReference = null; 
    
 
   
    newdata;
    error;
    contactRecord = new Object(); 
    
    
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          const contactid = currentPageReference.state;
      
          this.contactRecord.id =  contactid.c__urlid;
          console.log('id==> '+ this.contactRecord );
         console.log("Id from url==> "+  JSON.stringify(contactid.c__urlid));
        
       }
    }

    

     

     changeHandler(event)
     {
         if(event.target.name==="firstnameInput")
         {
            this.contactRecord.firstname = event.target.value;
         }
         if(event.target.name==="lastnameInput")
         {
            this.contactRecord.lastname = event.target.value;
         }
         if(event.target.name==="emailInput")
         {
            this.contactRecord.email = event.target.value;
         }
         if(event.target.name==="cityInput")
         {
            this.contactRecord.mailingcity = event.target.value;
         }
         
         console.log('The record to update => '+ this.contactRecord);
     }

     updateHandler(event)
     { 
      
         console.log('Record being sent to Update=> ' +JSON.stringify(this.contactRecord));
         var cont = this.contactRecord;
         //console.log(cont);
         updateContact({con : JSON.stringify(cont)})
         .then(result=> {
             console.log("Update Result => " + JSON.stringify(result));
         });
         this.handleGoBack();

        
       
        }

        handleGoBack(event)
        {
         this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'pocdatatable'
            }
            // ,
            // state : {
            //    c__isnewdata : 'yes'
            // }
            
            
        });
        }

        handleGoBackWithoutChanges()
        {
         
          this[NavigationMixin.Navigate]({
             type: 'comm__namedPage',
             attributes: {
                 pageName: 'pocdatatable'
             }, state : {
               c__isnewdata : 'no'
            }
            
             
         });
         
        }
     
   

}
*/

currentPageReference = null; 
    
 
/* Params from Url */
//contactid = null;

newdata;
error;
contactRecord = new Object(); 


@wire(CurrentPageReference)
getStateParameters(currentPageReference) {
   if (currentPageReference) {
      const contactid = currentPageReference.state;
  
      this.contactRecord.id =  contactid.c__urlid;
      console.log('id==> '+ this.contactRecord );
     console.log("Id from url==> "+  JSON.stringify(contactid.c__urlid));
    
   }
}



 

 changeHandler(event)
 {
     if(event.target.name==="firstnameInput" && event.target.value !== null)
     {

        this.contactRecord.firstname = event.target.value;
     }
     if(event.target.name==="lastnameInput"  && event.target.value !== null)
     {
        this.contactRecord.lastname = event.target.value;
     }
     if(event.target.name==="emailInput"  && event.target.value !== null)
     {
        this.contactRecord.email = event.target.value;
     }
     if(event.target.name==="cityInput"  && event.target.value !== null)
     {
        this.contactRecord.mailingcity = event.target.value;
     }
     
     console.log('The record to update => '+ this.contactRecord);
 }

 updateHandler(event)
 { 
  
     console.log('Record being sent to Update=> ' +JSON.stringify(this.contactRecord));
     var cont = this.contactRecord;
     //console.log(cont);
     updateContact({con : JSON.stringify(cont)})
     .then(result=> {
         console.log("Update Result => " + JSON.stringify(result));
         this.handleGoBack(); // this solved the rendering discrepancy issue.. 
         //Now the navigatino will happen only after updating
         
     });
     
     //this.handleGoBack();  //This was causing the inconsistency of data rendering
     //if the data is larger, teh update used to hppen late by that time component used to navigate 
     //and populate unupdated data from server.
    
   
    }

    handleGoBack(event)
    {
       console.log('handle go back to data table has run');
     this[NavigationMixin.Navigate]({
        type: 'comm__namedPage',
        attributes: {
            name: 'pocdatatable__c'
        }
        
        
        
    });
    }

    handleGoBackWithoutChanges()
    {
     
      this[NavigationMixin.Navigate]({
         type: 'comm__namedPage',
         attributes: {
             name: 'pocdatatable__c'
         }
        //  ,
        //  state:{
        //     c__newData : 'yes'
        //  }
        
         
     });
     
    }
}