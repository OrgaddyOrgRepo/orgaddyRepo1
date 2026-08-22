import { LightningElement,wire } from 'lwc';
import { getListUi} from 'lightning/uiListApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import getCasesASCalloutResponse from '@salesforce/apex/listVIewController.getCasesASCalloutResponse';
export default class Parent extends LightningElement {
    listSelected='RecentlyViewedList';
    listViews = [];
    allListViews
    error
    sobjectResult
    data=[];
    COLUMNS;
    listViewFields=[];
    columnfield;
    @wire(getListUi, {objectApiName: CASE_OBJECT})
wiredlistView({error,data}) {
    if(data){
        console.log('wore ran...')
        this.allListViews = data.lists;
       
    for(var i=0;i<this.allListViews.length;i++){
        this.listViews.push({"label" : this.allListViews[i].label, "value" : this.allListViews[i].apiName});
    }
    this.allListViews = this.listViews;
    console.log('listVIews==> '+  JSON.stringify(this.allListViews))
    }else if(error){
        console.log('An error has occurred:');
        console.log(error);
    }
}





@wire(getListUi, {objectApiName: CASE_OBJECT,listViewApiName: '$listSelected'})
lastView({error,data}){
    
    if (data) {
        console.log('UI wire ran...')
        this.sobjectResult =data.records.records;  
     //   console.log(JSON.stringify(this.sobjectResult));
      //  console.log('columns=> '+ JSON.stringify(data.info.displayColumns));
        var displayColumns = data.info.displayColumns;
        
        this.COLUMNS = displayColumns.map(element=>{
            this.listViewFields.push(element.fieldApiName);
            return {fieldName: `${element.fieldApiName}`,label:`${element.label}`,sortable:`${element.sortable}`,editable:true};
            
        });

        console.log('Recs of list===> '+ JSON.stringify(data.records.columns));
        console.log('\n');

      
       // console.log('fields api==> '+ JSON.stringify(this.listViewFields));

         //console.log(JSON.stringify(data.records[records]));

    //    for(let i=0; i< this.sobjectResult.length;i++)
    //    {
    //         console.log(JSON.stringify(this.sobjectResult[i].fields));
    //         console.log('\n');
    //         console.log(this.sobjectResult.length);
    //         const recs = {};
    //         for(let j=0;j<this.listViewFields.length ; j++)
    //         {
    //             let fieldApi='';
    //             fieldApi = this.listViewFields[j].toString();
    //             if(fieldApi.includes('Contact'))
    //             {
    //                 fieldApi= 'Contact';
    //                 recs[this.listViewFields[j]] = this.sobjectResult[i].fields[fieldApi].displayValue;
    //                 this.data.push(recs);
    //                 console.log( this.sobjectResult[i].fields[fieldApi].displayValue);
                    
    //             }
    //             else if(fieldApi.includes('Owner'))
    //             {
    //                 fieldApi= 'Owner';
    //                 recs[this.listViewFields[j]] = this.sobjectResult[i].fields[fieldApi].displayValue;
    //                 this.data.push(recs);
    //                 console.log( this.sobjectResult[i].fields[fieldApi].displayValue);
                 
    //             }
    //             else
    //             {
    //                 recs[this.listViewFields[j]] = this.sobjectResult[i].fields[fieldApi].value;
    //                 this.data.push(recs);
    //                 console.log( this.sobjectResult[i].fields[fieldApi].value);
                    
    //             }
            
    //         }
           
    //    }
    //    console.log('this.data===> '+ JSON.stringify(this.data));
      
    } else if (error) 
    {
        this.error = error;
    }
}


@wire(getCasesASCalloutResponse,{listApiName:'$listSelected'})
result({error,data})
{
    console.log('callout wwire rann...')
    if(data)
    {
        console.log(JSON.stringify(data));
    }
    else if(error)
    {
        console.log(JSON.stringify(error));
    }
}



    handleChange(event)
    {
        this.data=[];
        this.listSelected = event.detail.value;
        
    }
}