public class CL_2902_SimgleEmailMessage 
{
	public static void SendEmail( string Addresses)
    {	
        /*First I Created a Contact
       Contact C = New Contact();
       C.FirstName = 'Vidhi';
       C.LastName = 'Malhotra';
       C.Email = 'adi.92sfdc2@gmail.com';
       Insert C;
       */ 
       //Initialise
       Messaging.SingleEmailMessage Em = New Messaging.SingleEmailMessage();
        //Create List of the Address
        
       List<String>  Address = New List<string>();
         Address.add(Addresses);
            // Retrieved the Fields of The Inserted COntact
      /*  List<Contact> Cont = New List<Contact>{[Select Email,Name From Contact Where FirstName =:C.FirstName]};
        
         For(Contact P : Cont)
            
        {
            Address.Add(P.Email);
            System.debug(P.Name +' and email is : '+ P.Email);  // to Check the values are Coming Or not
        }
         System.debug(Address);
       */     
        //Composing The Email Now
        
        Em.setToAddresses(Address);
        Em.setSubject('Sent Using Trigger...!!!');
        Em.setPlainTextBody('Enjoyed!!!.This is fascinating...!!!!!');
        
        
        // Now  sending Email
     
        Messaging.sendEmail(New List<Messaging.Email> {Em});
        
    }
}