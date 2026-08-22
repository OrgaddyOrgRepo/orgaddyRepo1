import { LightningElement,wire,track,api } from 'lwc';
import getCasesOfContact from '@salesforce/apex/CL_CasesReturn.getCasesOfContact';
import {NavigationMixin} from 'lightning/navigation';
// import getRecord  from 'lightning/uiRecordApi';


const columns = [ 
    
    {
        label: 'Case Number', fieldName: 'CaseNum',type: 'url', 
        typeAttributes: { 
           label: {fieldName: 'CaseNumber'},
            target: '_blank'
        },
        sortable: true 
    },
      {label:'Reason',fieldName:'Reason',type:'text',wrapText:true},
      {label:'Origin',fieldName:'Origin',type:'text',wrapText:true},
      {label:'Status',fieldName:'Stat',type:'text',
                typeAttributes: {
                        label:{fieldName:'Status'}
                    }
                }
                ];


export default class Lwc_DisplayCasesRelatedToContact extends NavigationMixin(LightningElement) 
{
    @api recordId;
    columns = columns;
   @track data =[];
    error;
    @track docUploadPop = false;
  @wire(getCasesOfContact)
   caseList({error,data})
   {
       if(data)
       {
          
        let tempCaseList = []; 
    let tempCaseStatusList=[];  
        data.forEach((record) => {
            let tempCaseRec = Object.assign({}, record);  
            tempCaseRec.CaseNum = 'https://orgaddysolutionspvtltd-dev-ed.lightning.force.com'+'/' + tempCaseRec.Id;
            tempCaseList.push(tempCaseRec);
               
            let tempCaseStatus = Object.assign({},record);
            tempCaseStatus.Stat = function(event){
                const uploadedFiles = event.detail.files;
                let uploadedFileNames = '';
                for(let i = 0; i < uploadedFiles.length; i++) {
                    uploadedFileNames += uploadedFiles[i].name + ', ';
                }
            }
            
        });
       
        
        this.data = tempCaseList;
        this.data = tempCaseStatusList;
        this.error = undefined;

        console.table(this.data);
    }
    else
       {
           this.error = error;
       }
   }

   get acceptedFormats() {
    return ['.pdf', '.png','.jpg','.jpeg'];
     }
     
     handleDocUpload(event) {
    // Get the list of uploaded files
  
    const uploadedFiles = event.detail.files;
    let uploadedFileNames = '';
    for(let i = 0; i < uploadedFiles.length; i++) {
        uploadedFileNames += uploadedFiles[i].name + ', ';
    }
}

navigateToRecordPage() {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: 'recordId',
            objectApiName: 'Case',
            actionName: 'view'
        }
    });
}






//   NavToCaseRecord()
//   {
    //   const row = event.detail.row;
    // this[NavigationMixin.Navigate]({
    //     type: 'standard__recordPage',
    //     attributes: {
    //         recordId: row.Id,
    //         objectApiName:'Case'
    //     }
//     // });
//   }

//   uploadDocument()
//   {

//   }
}

//https://orgaddysolutionspvtltd-dev-ed.lightning.force.com/lightning/r/Case/5005g00000FaTxkAAF/view