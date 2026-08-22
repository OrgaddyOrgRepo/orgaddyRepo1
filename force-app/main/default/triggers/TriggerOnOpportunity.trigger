trigger TriggerOnOpportunity on Opportunity (After Insert, after Update) 
{
// Create Task After an Opportunity is Created
 List<Task> oTasks = new List<Task>();
 If(Trigger.isInsert)
 { 
    
    for(Opportunity Opp : Trigger.New)
    {
        if(Opp.Amount >= 10000)
        {
            oTasks.add(new Task(Subject='New Opportunity Follow up AP', ActivityDate=Date.today(), WhatId=Opp.Id,OwnerId=Opp.OwnerId));
        }
    }
     if(Otasks.size() >0)
     {
        INSERT OTasks;
     }
 }
    if(Trigger.isUpdate)
    { 
        try{ 
           // List<Task> oTasks = new List<Task>(); 
            for(Opportunity Opp : Trigger.Old)
            {
                if(Opp.Amount < Trigger.NewMap.get(Opp.id).Amount)
                {
                     oTasks.add(new Task(Subject='Updated Opportunity Follow up AP', ActivityDate=Date.today(), WhatId=Opp.Id,OwnerId=Opp.OwnerId));
                }
            }
         if(Otasks.size() >0)
             {
                INSERT OTasks;
             }
        }
        
        Catch(exception e)
        {
            system.debug(e.getLineNumber());
            system.debug(e.getCause());
            system.debug(e.getMessage());
            system.debug(e.getStackTraceString());
            
        }
    }
}
/*
  trigger Lost_Opportunity_Follow_up on Opportunity (after insert, after update) {
    Task[] oTasks = new List<Task>();
    for (Opportunity oOpty : trigger.new ) {
        if (oOpty.StageName == 'Closed Lost'){
            oTasks.add(new Task(Subject='New Opportunity Follow up AP', ActivityDate=Date.today(), WhatId=Opp.Id,OwnerId=Opp.OwnerId));
        }
    }
    if (oTasks.size()>0) insert oTasks;

}
*/