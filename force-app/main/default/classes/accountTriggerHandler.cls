public class accountTriggerHandler extends triggerHandler
{
	 protected override void beforeDelete()
    {
        // If account is being deleted, throw error if it is not archived.
        
        for(account acc : Trigger.old)
        {
            if(!acc.Is_archived__c)
            {
                acc.addError('The account is not archived. So it cannot be deleted!');
            }
        }
    }
}