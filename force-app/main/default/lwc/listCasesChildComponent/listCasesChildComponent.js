import { LightningElement,api,wire,track } from 'lwc';
import CASE_OBJECT from '@salesforce/schema/Case';   
import { getListUi} from 'lightning/uiListApi';
import { getListInfoByName } from 'lightning/uiListsApi';
export default class ListCasesChildComponent extends LightningElement {

    @api listName;
    displayColumns
    error
    @track sobjectResult;

@track progressValue = 'AllProducts';

@wire(getListInfoByName, {objectApiName: CASE_OBJECT,listViewApiName: 'RecentlyViewedCases'})
lastView({error,data}){
    
    if (data) {
        this.sobjectResult = data.records;  
        console.log('DATA===> '+ JSON.stringify(this.sobjectResult));
        this.displayColumns = data.displayColumns;
        console.log('columns===> '+JSON.stringify(this.displayColumns));
    } else if (error) {
        this.error = error;
    }
}

}