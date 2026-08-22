import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import createRecord from '@salesforce/apex/cl01_CreateRecord.createRecord' ; 

const myVariable = 'Hi Ankuraya'

export default class Lwc01_createRecordComp extends  NavigationMixin(LightningElement) 
{
    
    value = '';
    isReadOnly = false;
    myRec = {Name : '' , Phone: '', Email : '' }; // human body---> parts ---> naav---> function kiva values

    functionalBody = {hand :  (param)=> 'Hello '+ param, foot: 'this is foot'};


  selectedVal =''
    recId = '';
    error;
    connectedCallback() // when component is rendered/iserted in dom 
    {
        console.log('Connected callback ran....');
        console.log('myRec====> '+JSON.stringify(this.myRec));
    }

    handleInputChange(event)
    {

        
        if(event.target.name == 'firstNameField')
        {
            this.myRec.Name = event.target.value;
        }
        if(event.target.name == 'middleNameField')
        {
            this.myRec.Phone = event.target.value;
        }
        else if(event.target.name == 'lastNameField')
        {
            this.myRec.Email = event.target.value ; 
        }

        if(this.myRec.middleName != null && this.myRec.lastName != null && this.myRec.middleName.length >= 6 && this.myRec.lastName.length >= 6)
        {
           console.log('myrec Name   ===> '+ this.myRec.firstName);
            console.log('myrec Phone ===> '+ this.myRec.middleName);
            console.log('myrec Email ===> '+ this.myRec.lastName);
            
        }
       
    }


    handleCreateRecord(event) // event.target.value;
    // event.target.name ;
    {
        // imperative == ORDER
        // alert('Create Record Clicked..');
        //IMPERATIVE 
        
        createRecord({sObjectName : 'Account',  recordDetails : JSON.stringify(this.myRec)}) // key : value ...pair
        .then((result)=> {
            this.recId = JSON.parse(JSON.stringify(result)); // encoded asto mhanun to console.log wr  read karaysathi tyala stringify
        //    this.recId = JSON.parse(this.recId );
        })
        .catch((error)=>{
            this.error =  JSON.stringify(error);
        })
       // console.log(this.functionalBody.hand(this.myRec.firstName));
    }

    sayHello(someName)
    {
       return  'Hello , ' + someName;
    }

    handleBodyFunction(event)
    {
     
        
     
        console.log(JSON.stringify(this.functionalBody.hand(21)));// 210
       console.log(JSON.stringify(this.functionalBody.foot)); // string
       console.log(JSON.stringify(this.functionalBody.hand)); // undefined
       console.log(JSON.stringify(this.functionalBody)); // object
       console.log(this.functionalBody.hand(this.myRec.Name));

       let myName = this.functionalBody.hand(this.myRec.Name); // function as a place holder or manipulated variable
       console.log(myName);
    }


    picklistValChanegHandler(event)
    {
        if(event.target.value == 'Contact')//account ...multiples
        {
            this.selectedVal = true;
        }
        
    }
    
    // navigateToNewContactPage() {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__objectPage',
    //         attributes: {
    //             objectApiName: 'Contact',
    //             actionName: 'new'
    //         },
    //     });
    // }

    navigateToEditContactPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recId,
                objectApiName: 'Account',
                actionName: 'edit' // view -- detail page and
                // edit--> edit popup(popup with existing  field values)
                // new --> popup with blank fields..
            },
        });
    }
}