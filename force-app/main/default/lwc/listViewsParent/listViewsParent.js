import { LightningElement,wire,api } from 'lwc';
import fetchListViews from '@salesforce/apex/CL_CaseController.fetchListViews';
import  CASE_OBJECT from '@salesforce/schema/Case';
import { getListInfoByName } from 'lightning/uiListsApi';
import getCasesAndLIstViews from '@salesforce/apex/CL_CaseController.getCasesAndLIstViews'
import { refreshApex } from '@salesforce/apex';
import USER_ID from '@salesforce/user/Id';


export default class ListViewsParent extends LightningElement {
 

   userId = USER_ID;
    displayColumns;
    
    error;
    error_cases
    selectedListView = '';
    listViews = [];
    caseList=[]
    options=[];
    result=[]
    
   listViewFields=[];
   fieldList='';
   COLUMNS=[];
    

   @wire(getListInfoByName, { objectApiName: CASE_OBJECT.objectApiName, listViewApiName: '$selectedListView' })
   listInfo({ error, data }) {
       if (data) {
           console.log('wire ran...');
           console.log(JSON.stringify(data))
           this.displayColumns= data.displayColumns;
           
           this.listViewFields=[];
            this.COLUMNS = this.displayColumns.map(element=>{
                this.listViewFields.push(element.fieldApiName);
                return {fieldName: `${element.fieldApiName}`,label:`${element.label}`,sortable:`${element.sortable}`,editable:true};
                
            });
            
            this.fieldList = this.listViewFields.join(',');
            
            console.log('COLUMNCSS===> '+JSON.stringify(this.COLUMNS))

          console.log('fieldLIst=> '+ this.fieldList);
     
            this.error = undefined;
       } else if (error) {
           this.error = error;
           this.COLUMNS = undefined;
       }
       
       getCasesAndLIstViews({fieldList : this.fieldList})
        .then(result=>{
            this.result = [...result];
           this.caseList = [...this.result];
            this.data=[...this.caseList];
            console.log('Cases===> '+JSON.stringify(this.result));
        })
        .catch(error=>{
            this.error_cases = JSON.stringify(error);
        })
    
        if(this.caseList.length != 0 && this.filterVars.status =='Closed' && this.filterVars.owner =='All' )
        {
            console.log('makeCaseDataforlist for closed ran....')
            for(let i=0 ; i< this.caseList.length;i++)
            {
                if(this.caseList[i].Status === 'Closed')
                {
                    this.data=[...this.caseList[i]];
                }
            }
        }
        // else if(this.caseList.length != 0  && this.filterVars.status =='Open' && this.filterVars.owner =='All' )
        // {
        //     console.log('makeCaseDataforlist for Open ran....')
        //     this.makeListViewData();
        // }
    }

    filteredCasesforListView=[];
   data=[];
       
       
    
      

    connectedCallback()
    {
        this.caseList=[];
        console.log('Connected Run...');
        fetchListViews()
        .then(result=>{
            this.listViews =[];
            this.listViews=[...result];
            console.log(JSON.stringify(this.listViews));

            this.options =  this.listViews.map( element => {
                return {
                    label: `${element.Name}`,
                    value: `${element.DeveloperName}`
                };
            });
            
        })
        .catch(error=>{
            this.error = error;
        })
     
       
      
    }
    filterVars={};
    handleChange(event)
    {
        this.caseList = [...this.result];
        this.selectedListView =  event.detail.value;
        console.log('sleected list view==> '+ JSON.stringify(this.selectedListView))
   
      if(event.detail.value == 'AllOpenCases')
      {
          console.log("all open cases===> ran...");

        this.filterVars.status = 'Open';
        this.filterVars.owner ='All';
       
        
      }
      if(event.detail.value = 'AllClosedCases')
      {
        this.filterVars.status = 'Closed';
        this.filterVars.owner ='All';
       
      }
      
      
    }

    get data()
    {
        console.log('data===> '+ JSON.stringify(this.data))
        if(this.filterVars.status == 'Closed' && this.filterVars.owner =='All')
        {
            return this.caseList.filter(element=>{
                return element.Status != this.filterVars.status;
            })
        }
    }
    handleRefreshCaseData(event)
    {
        if(event.detail.refreshData == true)
        {
            console.log('Event received...');
            
             this.refresh();
            
           }
        }
    
        // async refresh() {
        //     await refreshApex(this.caseList);
        // }

        
    }