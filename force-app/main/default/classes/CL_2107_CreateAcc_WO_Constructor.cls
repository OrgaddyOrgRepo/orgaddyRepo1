/*

  // Class Variable  
  	     Public String  nam 					{get;set;}
   		 Public String	ph				{get;set;}
	     Public String	fx				{get;set;}
         Public String  indust				{get;set;}
     	 
         Public String  Descrip			{get;set;} 	
    	Public String Result 			{get;set;}  
    	Public String AccId					{get;set;} 
    
    //Method
    
    
  

        Account A= New Account();   // Initialisation of Account
        A.Name = nam;
        A.Phone = ph;
        A.Fax = fx;
        A.Industry = indust;
      
        A.Description = Descrip;
        
        try
        {
            Insert A;
            Result = 'The Account insertion is Successful..!!' + ' With the ID : ' ;
           	AccId = A.Id;
        }
        Catch(exception e)
        {
        Result =   'Account Insertion Failed with the error : ' + e.getMessage();
        }
        
  */      
        //Creation Of PASSENGER
        // // Class Variable For Passenger
		


	public class CL_2107_CreateAcc_WO_Constructor
    {
        
   		Public String PassName      	{get;set;}
        Public String PassEmail 		{get;set;}
        Public String PassMobile 		{get;set;}
        Public String RegisNumber 		{get;set;}
  	    Public String Result2			{get;set;} 
    
    
      Public void CreateAccount()
    {
       
        Passenger__c P = New Passenger__c();  //Initialisation of Passenger 
        
        P.Passenger_Name__c = PassName; 
        P.Mobile__c = PassMobile;
        P.Email__c = PassEmail;
        
        try
        {
			Insert P;
        
          
            // Accessing the P.name
            
            List<Passenger__c> PassengerData;
            PassengerData = [SELECT Name,Id FROM Passenger__C WHERE Id= :P.Id ];
            
            For(Passenger__c R : PassengerData)
            {
                RegisNumber = R.Name;
            }
            
                        Result2 =  'The Passenger has been Successfully created with Registration Number : '+ RegisNumber ;
                  
        }
        
         
        Catch(exception ee)
        {
            Result2 =  'The Passenger Registration Failed With Error  :' + ee.getMessage();
        }
        
        
	}
        //Clear Button fUNCTION
        Public  void ClearValues()
        {
            PassName ='';
            PassEmail='';
            PassMobile = '';
            RegisNumber= '';
            Result2 ='';
        }

}