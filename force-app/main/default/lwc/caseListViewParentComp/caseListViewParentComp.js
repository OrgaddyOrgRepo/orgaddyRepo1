import { LightningElement,wire } from 'lwc';
import fetchListView from '@salesforce/apex/caseListViewController.fetchListView';
import getListviewRecords from '@salesforce/apex/caseListViewController.getListviewRecords';
import getSessionIdForLWC from '@salesforce/apex/caseListViewController.getSessionIdForLWC';
import fetchRecords from '@salesforce/apex/caseListViewController.fetchRecords';
export default class CaseListViewParentComp extends LightningElement {


    ObjectName = 'Case';
    options=[];
    listviews=[]
    selectedList
@wire(fetchListView,{objectApiName: '$ObjectName'})
listViewsResult({data,error})
{
    if(data)
    {
        this.listviews =[...JSON.parse(JSON.stringify(data))];

        

        this.options = this.listviews.map(element=>{
            return {
                label: `${element.Name}`,
                value: `${element.Id}`
            };
            })
        
    }
    if(error)
    {
        this.error = error;
    }
}

sObjectRecords
@wire(fetchRecords,{listviewId:'$selectedList',objectApiName: 'Case'})
calloutresult({data,error})
{
    if(data)
    {
        this.sObjectRecords = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data))
        // for(let k=0; k<this.sObjectRecords.length ;k++)
        // {
        //     console.log( JSON.stringify(this.sObjectRecords[k]));
        // }
        console.log(this.sObjectRecords);
    }
    if(error)
    {
        console.log(JSON.stringify(error));
    }
}

    handleChange(event)
    {
        this.selectedList = event.detail.value;
        console.log(JSON.stringify(this.selectedList))
    }
value;
error
    handleSessionCheck(event)
    {
        getSessionIdForLWC()
        .then(result=>{
            if(result)
            {
                this.value = JSON.stringify(result);
            }
            if(error)
            {
                this.error = JSON.stringify(error);
            }
        })
    }

    
}