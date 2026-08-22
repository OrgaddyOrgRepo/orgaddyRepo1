public class CL_SendingEmail 
{	
   // Insert A contact
   
    Public Contact C;
         
   public Void main()
   {
        C = New Contact();
       C.FirstName = 'Vidhi';
       C.LastName = 'Gayakwad';
       C.Email = 'adi.92sfdc2@gmail.com';
       C.MailingCity ='Mumbai';
       Insert C;
       
       
   }
    public void Email()
    {	
        //Initialisation OF Namespace and Its Method SingleEmailMessages
        Messaging.SingleEmailMessage SE = New Messaging.SingleEmailMessage();
        
        //Pulling The address Form The Database
        List<String>Address = New List<String>{};
        List<Contact> DataFromContact = New List<Contact>{[Select FirstName ,Email From Contact Where FirstName = : C.FirstName]};
            
            For(Contact P:DataFromContact)
        {
            Address.add(P.Email);
        }
        
    }
}