import { LightningElement } from 'lwc';

export default class Lwc_01_firstLwc extends LightningElement {
    showInput= false;
  alreadyOpen= false;
    letMeSearch(event)
    {
        if(this.showInput ==false)
        {
            this.showInput = true;
            this.alreadyOpen= true;
        }
        else if(this.alreadyOpen== true){
            this.alreadyOpen=false;
            thsi.showInput=false;
        }
        
    }
}