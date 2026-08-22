import { LightningElement,track } from 'lwc';
export default class Lwc_inputOutputComp extends LightningElement {

@track inputValue ; 


handleInputChange(event)
{
    
    this.inputValue = event.target.value;
}

handleInputClick(event)
{
    console.log("Clicked the text input");
}

}