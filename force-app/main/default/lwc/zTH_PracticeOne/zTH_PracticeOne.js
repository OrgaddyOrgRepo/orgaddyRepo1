import { LightningElement } from 'lwc';



export default class ZTH_PracticeOne extends LightningElement {
    input1;
    comboAria= true;
    inputHandler(event){
        this.input1 = event.target.value;
    }
    handleComboboxActions(event)
    {
        this.comboAria = false;
    }



  
    
}