import { LightningElement,api,wire } from 'lwc';
import { getListInfoByName } from 'lightning/uiListsApi';
import CASE_OBJECT from '@salesforce/schema/Case';
export default class ListVIewChildComponent extends LightningElement {

@api listName;
error
COLUMNS=[];
listViewFields;
sobjectResult;
// listName;
displayColumns;
@wire(getListInfoByName, {objectApiName: CASE_OBJECT,listViewApiName: '$listName'})
lastView({error,data}){
    
    if (data) {
        //this.sobjectResult = data.records.records;  
        //console.log('Columnssss  ==>' + JSON.stringify(this.sobjectResult))
        this.displayColumns= data.displayColumns;
           console.log('displayColumns===> '+JSON.stringify(this.displayColumns));
        this.listViewFields=[];
         this.COLUMNS = this.displayColumns.map(element=>{
             this.listViewFields.push(element.fieldApiName);
             return {fieldName: `${element.fieldApiName}`,label:`${element.label}`,sortable:`${element.sortable}`,editable:true};
             
         });
         console.log('Columns==> '+ JSON.stringify(this.COLUMNS))
    } else if (error) {
        this.error = error;
    }
}

connectedCallback()
{
    this.listName = this.listApiName;
}
}