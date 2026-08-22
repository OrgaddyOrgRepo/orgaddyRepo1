trigger OpportuityTriggrr222 on Opportunity (after update, after Insert) 
{
	set<Id> accIds = New Set<Id>();
    
	if(Trigger.isAfter)
	{
		if(Trigger.isUpdate )
		{
            for(opportunity opp : Trigger.New){
                if(opp.stageName == 'Closed Won' && Trigger.OldMap.get(opp.id).stageName != 'Closed Won')
                {
                    accIds.add(Opp.accountId);
                   // triggeringOppIds.add(Opp.Id);
                }
            }
            
       // fetching Other Opportunitites
       Opportunity[] otherOpportunities = [SELECT Name, StageName, Id 
                                           FROM Opportunity
                                           WHERE accountId IN:(accIds)  AND Id NOT IN:(Trigger.New) ];     
        List<Opportunity> otherOppListToUpdate  = New List<Opportunity>();
         for(opportunity OtherOpp : otherOpportunities)  
         {
             if(OtherOpp.stageName != 'Closed Won' )
             {
                 OtherOpp.stageName = 'Closed Lost';
                 otherOppListToUpdate.add(OtherOpp);
             }
                 
         }
            
            UPDATE otherOppListToUpdate;
            system.debug(otherOppListToUpdate);
            
    }
		
        // Insert
        if(Trigger.isInsert || Trigger.isUpdate){
            system.debug('Task wala has started');
            
            set<Id> conIds = New Set<Id>();
            
            
            
            List<Task> taskList = New List<Task>();
            for(Opportunity opp: Trigger.New)
            {
                system.debug('for loop ...');
               if(opp.accountId != null && opp.ContactId__c != null)
                {
                    system.debug('AccountId==> ' +opp.accountId);
                    system.debug('Contact ==> '+  opp.ContactId__c);
					conIds.add(opp.ContactId__c);  
                    
                    
                }   
                   
                
            }
            if(conIds.size() !=0)
            {
                      contact[] conList = [SELECT name , id, accountId FROM Contact Where Id IN :(conIds)];
                system.debug(conList);
                 Map<Id, Contact> oppConMap = New Map<id,Contact>();
                for(Contact c : conList)
                {
                 oppConMap.put(c.Id, c);   
                }
               
                
                for(Opportunity Opp : Trigger.New)
                {
                    if(Opp.accountId == oppConMap.get(Opp.contactId__c).AccountID)
                    {
                         Task myTask = New Task();
                            myTask.Priority = 'High';
                            myTask.WhatId= opp.accountId;
                            myTask.Subject='Common Opportunity for Account And Contact!!!';
                            myTask.Description= 'Dear Owner, you have common opportunity for an Account and Its contact.' +'The Opp Name is '+ Opp.Name;
                            myTask.OwnerId = opp.OwnerId;
                            system.debug(myTask);
                            taskList.add(myTask);    
                        }
                    }
            
            }
          
            
           
                   if(taskList.size() != 0  )
                   {
                       system.debug('Insert wala block ran..');
                       System.debug(taskList);
                       INSERT taskList;
                   }
                
                
             
            
        }
        
  }
}