import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fetchAccounts from '@salesforce/apex/cl01_CreateRecord.fetchAccounts' ;
import getAccounts from '@salesforce/apex/cl01_CreateRecord.getAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name' , type: 'text'},
    
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    {label: 'Billind City', fieldName: 'BillingCity', type: 'Text'}
    
];

export default class Lwc_01_searchRecordsComp extends NavigationMixin(LightningElement)
{
    mycolumns = columns;
    value='';
    data=[] ; // this will hold the accounts
    error ; // errors will be held
    soqlSearchFlag ; 
    radioInput = '';
    searchInput = '';

    get options() {
        return [
            { label: 'Query Search', value: 'query' },
            { label: 'JS Search', value: 'js' },
        ];
    }

    
    connectedCallback()
    {
        this.data =[] ;
        getAccounts()
        .then((result)=>{
            this.data = [...JSON.parse(JSON.stringify(result))];
        })
    }

    searchInputChangeHandler(event)
    {
        this.searchInput = event.target.value ; 
        if(this.soqlSearchFlag)
        {
            this.soqlSearch();
        }
        else
        {
            // js way of search
            this.jsBasedSearch( this.searchInput);
        }
   
    }

    radioInputHandler(event)
    {
        this.radioInput = event.target.value ; //js

        switch (event.target.value ) {
            case 'query':
              this.soqlSearchFlag = true;
              break;
            case 'js':
                this.soqlSearchFlag = false;
              break;
            default:
                this.searchMethodFlag = true;
              break;
          }

          // soql way of search
        if(this.soqlSearchFlag)
        {
            this.soqlSearch();
        }
        else
        {
            // js way of search
            this.jsBasedSearch(this.searchInput);
        }
    }


    soqlSearch()
    {
        fetchAccounts({searchKey : this.searchInput })
        .then((result)=>{
         this.data =[] ;
         this.data = [...JSON.parse(JSON.stringify(result))]; // DESERIALIZAION in js  
         console.log('data===> '+  this.data.length);
 
        })
        .catch((error)=>{
         this.error = error;
         console.log('this.error===> '+JSON.stringify(this.error));
        })
    }

    jsBasedSearch( someval)
    {
            // here we willput search feature on this.data variable
           if(someval)
           {
            const searchKey = someval.toLowerCase();
            const searchableData = this.data ? this.data : null;
          var searchedRecords = [];
             if(searchableData)
             {
                 for(let rec of searchableData)   // apex==> for(account a : accountList)
                 {
                     let valuesArray = Object.values(rec);
                     for(val of valuesArray)
                     {
                         if(val)
                         {
                             if(val.toLowerCase().includes(searchKey))
                             {
                                 searchedRecords.push(rec);
                                 break;
                             }
                         }
                     }
                 }
             }
 
             if(searchableData)
             {
                 this.data=[];
                 this.data = [...searchableData];
             }
 
           }
          

    }
}

/* a,b,c arrays
a = b ; a =b=c
b = c ;

if ou make any change to c--> 
a = [...b];
b =[...c];

*/