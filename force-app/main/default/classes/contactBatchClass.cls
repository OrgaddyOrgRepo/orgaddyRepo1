public class contactBatchClass implements database.Batchable<sObject> {
 public integer count =0 ;
    public database.QueryLocator start(Database.BatchableContext BC)
    {
        system.debug('Executed');
        string query = 'SELECT Name,Id, billingCity FROM Contact';
        database.QueryLocator queryResult = database.getQueryLocator(query);
        system.debug(queryResult);
        database.QueryLocatorIterator i = queryResult.iterator();
        
        while(i.hasNext())
        {	
            system.debug(Count);
            count++;
        }
        system.debug('Count==> '+ count);
        return queryResult;
    }
    public void execute(Database.BatchableContext BC, List<sObject>scope)
    {
        for (sObject s : scope)
        {
            system.debug((Contact)s);
        }
    }
    public void finish(Database.BatchableContext BC)
    {
        
    }
}