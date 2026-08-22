public  class CL_SumOfOddOrEvenNumbers Extends CL_1207_Evaluator
{

    	public void sumMain()
        {
            
			   if(Choice2=='Even')									//((Math.mod(Num,2))==0)
        	{
            SumOfEvenNos();
            NatureOfNum = 'Even';
       
     	  	 }
        	else if(Choice2=='Odd')								//(Math.mod(Num,2)!=0)
       		 {
         	 SumOfOddNos();
            NatureOfNum = 'Odd';
        		}
            else
       		 {
	           Sum=0;
      		  }            
            
        }
    
    
    
}