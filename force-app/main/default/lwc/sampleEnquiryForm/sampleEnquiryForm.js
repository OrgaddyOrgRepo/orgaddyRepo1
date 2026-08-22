import { LightningElement,api,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import TEAM_FIELD  from '@salesforce/schema/User.Team__c';
import getDesignAndShadeOptions from '@salesforce/apex/SampleManagementController.getDesignAndShadeOptions';
import getQualityPicklistOptions from '@salesforce/apex/SampleManagementController.getQualityPicklistOptions';
import getSampleDataRecord from '@salesforce/apex/SampleManagementController.getSampleDataRecord';

import {refreshApex} from '@salesforce/apex';

const SAMPLE_RECORD = {Quality__c:'', Design__c:'',Shade__c:'',Quantity__c:'',Rate__c:'',GSM__c:''};
const fields = [TEAM_FIELD];

export default class SampleEnquiryForm extends LightningElement 
{
    @track sampleRec = SAMPLE_RECORD;
    
    team;
    error;
    showSampleCreationPage = false;

    //combobox vars
    qualityOptions =[];
    designOptions = new Set();
    shadeOptions =new Set();
    //FETCH USER TEAM
     @wire(getRecord, {recordId: USER_ID,fields: [TEAM_FIELD] })
     userrec({error,data}) 
     {
         if (error) {
            this.error = error ; 
         } else if (data) {
             this.team = data.fields.Team__c.value;
             console.log('team==> '+ JSON.stringify(this.team));
         }
     }

    @wire(getQualityPicklistOptions)
    qualityOptions({data,error})
    {
        if(data)
        {
            if(data != '')
            {
                this.qualityOptions = JSON.parse(data);
                if(this.team == 'Domestic OD Team')
                {
                    let newVal = {label:'+ Add New',value:'New Quality'};
                    this.qualityOptions = [...this.qualityOptions,newVal];
                }
                console.log('QulaityOptions=> '+ JSON.stringify(this.qualityOptions))
            }
            else
            {
                this.showNotification('NO QUALITY FOUND','NO QUALITY FOUND!','info');
            }
            
            
        }
        else if(error)
        {
            const message = 'Error occurred during quality options query : '+ JSON.stringify(error);
            this.showNotification('Error!',message,'error');
        }
    }
     get isDoemsticODTeam()
     {
         return  this.team =='Domestic OD Team' && this.showSampleCreationPage == true ? true : false ;
     }

     showNotification(title,message,variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
 
    
    handleInputChange(event)
    {
        this.sampleRec[event.target.name] = event.target.value;
       // console.log(JSON.stringify(this.sampleRec));
    }

    

    
    handleNewSampleSaved(event)
    {
        refreshApex(this.qualityOptions);
        console.log('after refresh apex=> '+ this.qualityOptions)
        console.log(JSON.stringify(event.detail));
        const result = event.detail ;
        if(result.Id != null)
            {   
                for(let prop of result)
                {   
                    if(this.sampleRec.hasOwnProperty(prop))
                    {
                         this.sampleRec[prop] = result[prop];
                    }
                   
                }
                
            }
    }
    
    handleQualityComboboxChange(event)
    {
        if(event.target.value == 'New Quality')
        {
            this.showSampleCreationPage = true ;
        }
        else
        {
            this.handleReset();
            this.sampleRec[event.target.name] = event.target.value;
            this.fetchDesignAndShades(this.sampleRec[event.target.name]);
        }
        
    }


    fetchDesignAndShades(val)
    {
        console.log(JSON.stringify(val))
        getDesignAndShadeOptions({quality: val})
        .then(result=>{
            console.log('designandShades=> '+ result)
            const data = JSON.parse(result);
            this.shadeOptions = data.shadeOptions;
            this.designOptions = data.designOptions;
        })
        .catch(error=>{
             console.log('error=> '+ JSON.stringify(error))
        })
    }


    handleComboboxChange(event)
    {
        this.sampleRec[event.target.name] = event.target.value;
        console.log( event.target.name + '=> '+ this.sampleRec[event.target.name]);
        this.fetchSampleDataForQDS(this.sampleRec.Quality__c,this.sampleRec.Design__c,this.sampleRec.Shade__c);
    }

    fetchSampleDataForQDS(qualityVal,designVal,shadeVal)
    {
        console.log('qualityVal=> '+ qualityVal + ' designVal=> '+ shadeVal+' shadeVal=> '+shadeVal);
        // if(qualityVal != '' && designVal != '' && shadeVal != '')
        // {
            getSampleDataRecord({quality:qualityVal.toString(), design: designVal.toString(), shade: shadeVal.toString()})
            .then(result=>{
                const data = JSON.parse(result);
                console.log('157=> ' + result);
                if((typeof data) == 'object')
                {
                    console.log('160=> '+ result);
                    for(let prop in data)
                    {
                        console.log('prop=> '+ prop)
                        if(this.sampleRec.hasOwnProperty(prop))
                        {
                             this.sampleRec[prop] = data[prop];
                        }
                        
                       
                    }
                }
                else{
                    this.showNotification('No data found!',data,'error');
                }
            })
            .catch(error=>{
                console.log('error=> '+ JSON.stringify(error));
            })
        // }
        
        
    }


    
    handleReset(event)
    {
        let forms = this.template.querySelectorAll('form');
        forms.forEach(currentItem => {
           currentItem.reset();
           console.log('reset');
        });
        this.sampleRec.Quality__c = this.qualityOptions[0].value;
        this.sampleRec.Design__c = '';
        this.sampleRec.Shade__c = '';
    }

}