import { LightningElement,track } from 'lwc';
import lightningAlert from 'lightning/alert';
import convert from  '@salesforce/apex/CurrencyConverterHandler.convert';
export default class CurrencyConverter extends LightningElement 
{
  @track convertedvalue ; 
  inputVal
  handleInput(event)
  {
      this.inputVal = event.target.value ;
      
  }

  handleConvert()
  {
      convert({num : this.inputVal})
      .then(result=>{
          this.convertedvalue = result ;
          console.log('Apex convert result=> '+ result);
      })
      .catch(error=>{
          console.log('Error in catch=> '+ JSON.stringify(error));
      })
  }
}