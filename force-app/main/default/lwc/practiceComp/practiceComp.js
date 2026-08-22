import { LightningElement } from 'lwc';
export default class PracticeComp extends LightningElement 
{
    handleToggleComponents(event)
    {
        console.log('button clicked..'+ event.target.name);
        const divElement = this.template.querySelector(`div[class=${event.target.name}]`);
        if(divElement.style.display == 'none')
        {
            divElement.style.display = 'block';
        }
        else
        {
             divElement.style.display = 'none';
        }
        
    }
}