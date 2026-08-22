public class CL_0308_SingleEmailMessage 
{
    String  Nam {get;set;}
    String  Email {get;Set;}
    String Result {get;set;}
    String ADitya ='aditya';
    
    Public void Alert()
    {
        //COnstructor
       
        Messaging.SingleEmailMessage MyEmail = New Messaging.SingleEmailMessage();
        
        List<String>Address = New List<String>{};
            
            string EmailAdd = 'adi.92sfdc2@gmail.com';
        	Address.add(EmailAdd);
        
        // Compose
        MyEmail.setToAddresses(Address);
        MyEmail.setSubject('The batch Apex is COmplete..!!!');
        MyEmail.setplaintextbody('Congratulations Entire Your LEad HAve Been Converted TO Contact...');
        
        // Sending
        
        
        List<Messaging.Email> SE = New List<Messaging.Email>();
        Messaging.sendEmail(SE);
        
        
        
        
        
        
        
    }
}