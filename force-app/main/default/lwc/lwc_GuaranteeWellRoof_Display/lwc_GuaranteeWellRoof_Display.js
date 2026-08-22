import { LightningElement,wire,api } from 'lwc';
import getTheGuaranteeRoofs from '@salesforce/apex/Cl_00_WrapperForWellRoof.getTheGuaranteeRoofs';

export default class Lwc_GuaranteeWellRoof_Display extends LightningElement 
{
    
@api error;
@api GuaranteeRoofs;

    @wire(getTheGuaranteeRoofs) 
    GuaranteeAndRoofs({data,error})
    {
        if(data)
        {
            this.GuaranteeRoofs =data;

        }else if(error)
        {
            this.error = error
        }
    }
    
}