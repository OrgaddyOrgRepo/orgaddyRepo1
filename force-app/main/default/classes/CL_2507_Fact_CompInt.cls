public class CL_2507_Fact_CompInt 
{
    // Class Variable
    //  Factorial Calculation Variables
            Integer Num   {get;set;}
    		Integer Facto {get;set;}
    		
    // Compound Interest Calculation Variables
    Decimal Principal {get;set;}
    Integer RoI {get;set;}
    Integer NoY {get;set;}
    Decimal Amount {get;set;}
    Decimal IntEarned {get;set;}
    String  Error ;
    String Error2 ; 
    //Methods
	
    public void main()
    {
        
        try{
              Factorial();
       
        }
        catch(exception e){
            Error = 'Calcualtion Failed Do tue this Error : '+e.getCause();
        }        
             
        
         try{
              CompoundInterest();
       
        }
        catch(exception ee){
            Error2 = 'Calcualtion Failed Do tue this Error : '+ee.getmessage();
        }
        
        
          
            
        
    }  
        // Function
        public void Factorial()
        {
            
            for(integer i=Num; i>0; i--)
            {
                Facto=1;
                Facto = Facto * i;
               
            }
            
        }
        
        Public void CompoundInterest()
        {
            Amount = Principal * (Math.pow((1+RoI/100),NoY)) ; 
            IntEarned = Amount - Principal ; 
           
        }
        
    }