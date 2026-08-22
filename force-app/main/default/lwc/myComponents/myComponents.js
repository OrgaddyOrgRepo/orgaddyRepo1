import { LightningElement } from 'lwc';

export default class MyComponents extends LightningElement 
{
showComp= false;
    connectedCallback() {
        console.log('OUTPUT : connected callback ran...');
        
    }
   
    handleButtonClick(event)
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

    handleShowComp(event)
    {
        if(event.target.name == 'templateToggle')
        {
            this.showComp = ! this.showComp;

            let button = this.template.querySelector(`lightning-button[name=${event.target.name}]`);
            console.log('OUTPUT : template queried');
            button.label = button.label == "Show" ? "Hide" : "Show";
        }
        
    }
    }