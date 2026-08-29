public with sharing class FSL_OpportunityTriggerHandler extends triggerHandler {
    

    public  override  void afterInsert()
    {
        updateLatestOppCountToAccount(Trigger.New);
    }
    public Override void afterDelete()
    {   
        updateLatestOppCountToAccount(Trigger.New);
    }
     public override void afterUndelete()
    {
        updateLatestOppCountToAccount(Trigger.New);    
    }

     public void updateLatestOppCountToAccount(List<Opportunity> newOppList)
    {
        //GroupQueryOnAccount and update the latest count on it

        set<id> accIds = New Set<Id>();
        map<id,Integer> accAndoppCount = New Map<Id,Integer>();
        for(Account agr : [SELECT Id, (Select Id from Opportunities) FROM Account])
        {
            if(agr != null)
            {
                if(agr?.Opportunities != null)
                {
                    accAndoppCount.put((Id)agr.get('id') ,agr.Opportunities.size() );
                }
            }
            
        }

        if(!accAndoppCount.isEmpty())
        {   
            List<Account> acclist = New list<Account>();
            for(Id accId : accAndoppCount.keySet())
            {
                 acclist.add(New account(Id = accId, Total_Opportunities__c  = accAndoppCount.get(accId)));
            }
            if(! acclist.isEmpty())
            {
                update accList;
            }
           
        }
    }
}