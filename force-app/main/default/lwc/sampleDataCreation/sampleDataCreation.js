import { LightningElement,api,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createSampleData from '@salesforce/apex/SampleManagementController.createSampleData';


const SAMPLE_RECORD = {Quality__c:'', Design__c:'',Shade__c:'',Quantity__c:'',Rate__C:'',GSM__C:''};


export default class SampleDataCreation extends LightningElement {

    @track sampleRec = SAMPLE_RECORD;
    error;
    

    
     

     showNotification(title,message,variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
 
    handleReset(event)
    {
        let forms = this.template.querySelectorAll('form');
        forms.forEach(currentItem => {
           currentItem.reset();
           console.log('reset');
        });
    }

    handleInputChange(event)
    {
        this.sampleRec[event.target.name] = event.target.value;
       // console.log(JSON.stringify(this.sampleRec));
    }

    handleSampleDataSave()
    {
        createSampleData({SampleRec : JSON.stringify(this.sampleRec)})
        .then(result=>{
            console.log('result after sample data save=> '+ result);
            this.fireCustomEvent(JSON.parse(result));
        })
        .catch(error=>{
            console.log('error during sample data save=> '+ JSON.stringify(error))
        })
    }

    fireCustomEvent(obj)
    {
        const selectedEvent = new CustomEvent('samplesaved', { detail: obj });
            this.dispatchEvent(selectedEvent);
    }

    
}