public class CL_0908_BatchableApex implements Database.batchable<sObject>
{
    // Start Method
    public database.queryLocator start(Database.BatchableContext BC)
    {
        String Q = 'select Id From Contact'; 
        Return Database.getQueryLocator(Q);
    }
    // Execute Method
    public void Execute(Database.batchableContext BC, List<Contact>ContList)
    {
        List<Contact> C = New List<Contact>{};  
        For(Contact EC : ContList)
        {   
            
        	EC.Description ='This was Again Updated USing BatchableApex';
            EC.MailingCity ='Nagpur';
            EC.Email = 'batchable.apex@wemail.com';
            C.add(EC);
        }
        
        update C;
    }
        
	// Finish
	public Void Finish(Database.BatchableContext BC)
    {
        System.debug('All The Contacts Have been successfully updated..!');
    }
}