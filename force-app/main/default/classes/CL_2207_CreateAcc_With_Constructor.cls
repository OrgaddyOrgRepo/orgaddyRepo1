public class CL_2207_CreateAcc_With_Constructor 
{
      // Class Variable  
  	     Public Account A               {get;set;} 
    	Public String Result 			{get;set;}  
    
    //Constructor TO Initialise the Account Object
    
   Public CL_2207_CreateAcc_With_Constructor()
   {
         A= New Account();   // Initialisation of Account
       
   }
    
    //Method
    
    
    Public void InsertingAccount ()
    {

        try
        {
            Insert A;
            Result = 'The Account insertion is Successful..!!' + ' With the ID : ' + A.id ;
           	
        }
        Catch(exception e)
        {
        Result =   'Account Insertion Failed with the error : ' + e.getMessage();
        }

    }
    
      //Clear Button fUNCTION
        Public  void ClearValues()
        { 
			
            A.Name ='';
            A.phone='';
            A.Fax = '';
            A.Industry= '';
            Result ='';
        }
}