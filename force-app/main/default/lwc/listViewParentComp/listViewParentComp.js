import { LightningElement,wire } from 'lwc';
import  CASE_OBJECT from '@salesforce/schema/Case';
//import { getListInfoByName } from 'lightning/uiListsApi';
import { getListUi} from 'lightning/uiListApi';

export default class ListViewParentComp extends LightningElement {
    displayColumns
    listViewData
    allListViews
    viewSelected;

    @wire(getListUi, {objectApiName: CASE_OBJECT})
    wiredlistView({error,data}) {
    if(data){
        this.allListViews = data.lists;
        
        this.listViewData = [];
    for(var i=0;i<this.allListViews.length;i++){
        this.listViewData.push({"label" : this.allListViews[i].label, "value" : this.allListViews[i].apiName});
    }
    this.allListViews = this.listViewData;
    console.log(JSON.stringify(this.allListViews));
    }else if(error){
        console.log('An error has occurred:');
        console.log(error);
    }
    
}




handleChange(event)
{
     this.viewSelected = event.detail.value;
    console.log(JSON.stringify(this.viewSelected));
}

}