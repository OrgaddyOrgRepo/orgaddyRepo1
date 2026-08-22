import { LightningElement } from 'lwc';


export default class Lwc_2509_TakeAndDisplayInput extends LightningElement 
{
    num1;
    num2;
    num3;
    flag = false;
    null_input = false;
    greatestnum;
    smallestnum;
    
    inp1(event)
    {
        this.num1 = event.target.value;
        this.num1 = parseFloat(this.num1);
    }
    inp2(event)
    {
        this.num2 = event.target.value;
        this.num2 = parseFloat(this.num2);
    }
    inp3(event)
    {
        this.num3 = event.target.value;
        this.num3 = parseFloat(this.num3);
    }

    calculate_greatest()
    {  
        
        if(this.num1 != null && this.num2 != null && this.num3 != null)
            {
                    this.flag = true;
                    this.null_input =true;
                if(this.num1 > this.num2 && this.num1 > this.num3 )
                {
                    this.greatestnum = this.num1 ;

                }
                else if(this.num2 > this.num3 && this.num2 > this.num1)
                {
                    this.greatestnum = this.num2 ;

                }
                else
                {
                    this.greatestnum = this.num3 ;
                }
                
            }
       else {
                 alert('Please Give Inputs...!!');
              }
    }

    calculate_smallest()
    {
        if((this.num1!=null) && (this.num2!=null) && (this.num3!=null))
           {
                this.flag = true;
                this.null_input =true;
                if(this.num1 < this.num2 && this.num1 < this.num3)
                {
                    this.smallestnum = this.num1 ; 
                }
                else if(this.num2 < this.num1 && this.num2 < this.num3)
                {
                    this.smallestnum = this.num2 ;
                }
                else
                {
                    this.smallestnum = this.num3;
                }
           }
        else
        {
        
                alert('Please Give Inputs...!!'); 
            
            
        }
    }

    clear_all(event)
    {
        
            this.template.querySelector('lightning-input[data-name="input1"]').value = null;  
            this.template.querySelector('lightning-input[data-name="input2"]').value= null;
            this.template.querySelector('lightning-input[data-name="input3"]').value = null;  
            this.num1 = null;
            this.num2 = null;
            this.num3 = null;
            this.greatestnum = null;
            this.smallestnum = null;
         this.flag = false; 
    }

}