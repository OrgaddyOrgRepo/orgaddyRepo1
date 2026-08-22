import { LightningElement } from 'lwc';
export default class InputTagPractice extends LightningElement 
{
 handleInput(event)
 {
     console.log(event.target.name + '=> '+ event.target.value);
     var inpComp = this.template.querySelector('lightning-input');
     console.log(inpComp.value);
     //inpComp.reportValidity();
     let input = inpComp.value;
    
     
     
    //  if(inpComp.value === 'Adi')
    //  {
         
    //       inpComp.setCustomValidity('Adi is not permitted...');
    //       console.log('line 17')
    //  }
    //  else
    //  {
    //       inpComp.setCustomValidity('');
    //  }
      inpComp.reportValidity(); 
    //  if(inpComp.value === 'Aditya')
    //  {
    //      inpComp.setCustomValidity('Aditya is not acceptable input');
    //  }
    //  else{
    //       inpComp.setCustomValidity('');
    //  }
     
 }
}