import { LightningElement,track } from 'lwc';
import getContact from '@salesforce/apex/ContactController.getContact';
import getAccounts  from '@salesforce/apex/ContactController.getAccounts';
export default class WrapperStudyComponent extends LightningElement {

//     conRec= {Name:"testName", Phone:"12736198273"};  //JSON OBJECT --- its like custom object in salesforce...
//   //  conRec =(Name="testName", Phone="12736198273");
//    contactRecord ={};
//    contactRecord = Object.assign(this.contactRecord, this.conRec);

    data
    error
    @track accData
    wrapList
   connectedCallback()
   {
    //imperative Order=== based on some action ---> ewither system action or User action===> callback methods OR
    //    onClick onCursorUp
        getContact()
        .then(result=>{
            this.data = JSON.stringify(result);    // {Name:"AAAADDDUUUU 11",Id:"0035g00000HQPCdAAP",MobilePhone:"123123123123123"}
        }) 
        .catch(error=>{
            this.error = JSON.stringify(error);
        })

   }

   getAccountHandler(event)
   {
    getAccounts()
    .then(result=>{
        this.wrapList = JSON.parse(result) ;
        //console.log("this.accData===> "+ JSON.stringify(this.wrapList))

        for(let i=0 ; i< this.wrapList.length ; i++)
        {
           console.log('this.wrapList[i].acc==> '+ JSON.stringify(this.wrapList[i].acc.Name));
           this.wrapList[i].conList.forEach(element=>{
            console.log(JSON.stringify(this.wrapList[i].acc.Name)+ '==> '+  JSON.stringify(element.FirstName));
           })
        }
        
    })
    .catch(error=>{
        this.error = JSON.stringify(error) ;
    })
   }
   

  
}