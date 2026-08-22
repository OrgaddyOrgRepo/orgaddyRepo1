public class CL_Eval_GnSnSI 
{
		//Class Variables
    Public Integer Num1  	{Set;get;}
    Public Integer Num2 	{Set;get;}
    Public Integer Num3 	{Set;get;}
    public String Choice	{set;get;}
    public Integer Result 	{get;set;}
   
    //Sum calculation Variables
    Public Integer Num		{set;get;}
    public Integer Sum		{get;set;}
    //Simple Interest Variabless
    public Integer Principal{set;get;}
    public Integer NOY		{set;get;}
    public Decimal RoI		{set;get;}
    public Decimal SI		{get;set;}
    
    
    //Main Function
   	
    public void EvaCalMain(){
      
        //Calling Greatest or Smallest
        if(Choice=='Greatest')
        {
            TheGreatestNumber();
        }
        else If(Choice=='Smallest')
        {
            TheSmallestNumber();
        }
         
      /*  //Calling Sum
        if(Num/2==0)
        {
            SumOfEvenNos();
        }
        else if(Num/2 !=0)
        {
            SumOfOddNos();
        }
        */
    }
    
    //Functions Declarations
    
   void TheGreatestNumber()
    {
        
        if(Num1>Num2 && Num1>Num3)
        {
            Result=Num1;
        }
        else if(Num2>Num1 && Num2>Num3)
        {
            Result=Num2;
        }
        else
        {
            Result=Num3;
        }
    }
    
  void TheSmallestNumber()
    {
		
        if(Num1<Num2 && Num1<Num3)
        {
            Result=Num1;
        }
        else if(Num2<Num1 && Num2<Num3)
        {
            Result=Num2;
        }
        else
        {
            Result=Num3;
        }        
    }
    /*
    //Sum
    	void SumOfEvenNos()
        {
            
           Integer count=0;
           While(Count<=Num)
            {
           	    sum=sum+count;
            	count++;
            	count++;
      	    }
               
               
        }
    
    void SumOfOddNos()
        {
            
           Integer count=1;
           While(Count<=Num)
            {
           	    sum=sum+count;
            	count++;
            	count++;
      	    }
               
               
        }
    
 */      
}