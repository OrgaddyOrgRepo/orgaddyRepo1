import { LightningElement } from 'lwc';

showPopUp = false;
    


export default class mailBoxFunction extends LightningElement 
{
    
    openPopUp(event)
    {
      alert('You havent put the Popup yet!!!');
      showPopUp = true;
    }
}