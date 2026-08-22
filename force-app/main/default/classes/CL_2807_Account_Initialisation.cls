public class CL_2807_Account_Initialisation  Implements Schedulable  // INthis Class I am Trying to use Scheduled Apex too..!!!
{
    
    public void Execute(SchedulableContext SC)
    {
    String Message = 'Hey there , See I Sent you this message Using APex Scheduler..!!! ' ; 
	String address = 'adi.92sfdc2@gmail.com';
    }
    public Void Main()
    {
        messaging.singleEmailMessage MyEm = New messaging.singleEmailMessage();
        
        
        
        
    }
    
        
}