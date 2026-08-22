import { LightningElement,wire,api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ListViews extends LightningElement {
     
   
    @api columns;
    error;
    draftValues=[];
    @api tableData=[];
   // @api filtervar;
    records;
    //data=[];
    error;
    noRecordsFound;
    filteredCases=[];

    // get data()
    // {
       
    //     if(this.searchedRecords.length != 0)
    //     {   
    //        this.noRecordsFound = false;
    //         return [...this.searchedRecords];
    //     }
    //     else if(this.searchedRecords.length == 0 || this.searchKey == null )
    //      {
    //          if(this.filtervar.status == 'Open' && this.filtervar.owner== null)
    //          {
    //             this.filteredCases =[];
    //                     for(let i=0 ; i< this.tableData.length ; i++)
    //                     {
    //                         if(this.tableData[i].Status != 'Closed')
    //                         {
    //                             this.filteredCases.push(this.tableData[i]);
    //                         }
    //                     }
    //                     return this.filteredCases;
                   
    //         }
    //         else if(this.filtervar.status == 'Closed' && this.filtervar.owner== null)
    //         {
    //             this.filteredCases =[];
    //             for(let i=0 ; i< this.tableData.length ; i++)
    //             {
    //                 if(this.tableData[i].Status == 'Closed')
    //                 {
    //                     this.filteredCases.push(this.tableData[i]);
    //                 }
    //             }
    //             return this.filteredCases;
    //         }
                    
    //     }
            
           
    // }  
           
        
       
     
     
 

    connectedCallback()
        {
            
            console.log('Child COnnected ran...');
           
        }
    
    saveHandleAction(event) {
        this.draftValues = event.detail.draftValues;
        const inputsItems = this.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 
       
        const promises = inputsItems.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            this.draftValues = [];
            return this.refresh();
        })
        .finally(() => {
            this.draftValues = [];
        });
    }
 
   
     refresh() {

        const custEvent = new CustomEvent('savedraft',{detail:{refreshData:true}});

        this.dispatchEvent(custEvent);
      
    }
     searchedRecords =[];
     searchKey;
    handleTableSearch(event)
    {
        
        this.searchKey = event.target.value.toLowerCase();
        console.log(this.searchKey); 
        if(this.searchKey)
        {   
            this.searchedRecords=[];
            this.records = [...this.tableData];
            console.log(this.records.length + '===> this.records')

            if(this.records)
            {
               
                for ( let rec of this.records ) {

                    let valuesArray = Object.values( rec );
                  //  console.log('line 71..' +JSON.stringify(valuesArray));
                    for ( let val of valuesArray ) {
                    if ( val ) {
                        //console.log('line==74 '+  val.toString().toLowerCase());
                        if ( val.toString().toLowerCase().includes( this.searchKey ) ) {
                            this.searchedRecords.push( rec );
                            console.log(this.searchedRecords.length);
                            console.log('line 77=> '+ JSON.stringify(this.searchedRecords));
                           break;
                    
                        }
                      }
                    }//FOR ENDS
                }
               
            }
      
        
        }
        
     
        
    }


   
}













/*

const searchKey = event.target.value.toLowerCase();
      
        if ( searchKey ) { 


            this.records = [...this.tableData];

            if ( this.records ) {

                let searchedRecords = [];
                for ( let rec of this.records ) {

                    let valuesArray = Object.values( rec );
                    for ( let val of valuesArray ) {
                        if ( val ) {
                          if ( val.toLowerCase().includes( searchKey ) ) {
                                searchedRecords.push( rec );
                                break;
                        
                            }

                        }
                    }//second for ends
                }// first for  ends
                if(searchedRecords.length != 0)
                {
                    this.data=[];
                    this.data = [...searchedRecords];
                }
                else{
                    this.data=[];
                    this.data = [...this.tableData];
                }
            }

        }
        else if(searchKey == null || searchKey=='')
        {
            this.data = this.tableData;
        }

*/