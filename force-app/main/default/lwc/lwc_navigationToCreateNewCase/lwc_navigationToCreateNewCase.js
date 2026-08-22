import { LightningElement,api } from 'lwc';
import { NavigationMixIn } from 'lightning/navigation';
// import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class lwc_navigationToCreateNewCase extends NavigationMixIn(LightningElement) {

/*
{ 
               defaultCaseFieldValues : defaultValues
            },
            "LightningComponentid" 
*/
    //@api defaultCaseFieldValues;
    defaultValues = { 
        Priority:'High',
     Description:'Default Description'
    };

    connectedCallback() {
      console.log('Component loaded');
       
    }

    navigateToCase(event)
    {
        this[NavigationMixIn.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'new',
                state:{
                    DefaultFieldValues : this.defaultValues
                }
            }
        });
    }
}