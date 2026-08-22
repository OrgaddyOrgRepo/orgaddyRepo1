public virtual class CL_1107_CalEvalSum
{		
    Public Integer Num  	{set;get;}
    Public Integer Sum  	{get;set;}
    Public String NatureOfNum {get;set;}
    
    Public Decimal Num1 		{set;get;}
    Public Decimal Num2 		{set;get;}
    Public Decimal Num3 		{Set;get;}
    Public Decimal Result 		{get;set;}
    public String Choice		{set;get;}
    Public String Choice2		{set;get;}
    
    Public Decimal Principal 	{set;get;}
    Public Decimal RoI			{set;get;}
    Public Integer NoY			{set;get;}
    Public Decimal Simple_Interest {set;get;}
    
    Public Void Main()
    {

        
         SimpleInterestCalc();
    }
    
    //Functions
    
 		public void SumOfEvenNos()
 	   {
       Integer Count=0;
        Sum=0;
        While(Count<=Num)
        {
            Sum=Sum+Count;
            Count++;
            Count++;
        } 
    }
    
 		public void SumOfOddNos()
    {  
        Integer Count=1;
        Sum=0;
        While(Count<=Num)
        {
            Sum=Sum+Count;
            Count++;
            Count++;
        }
    }
    
   
    
    void  SimpleInterestCalc()
    {
        Simple_Interest = (Principal * RoI * NoY)/100;
    }
    
    
}