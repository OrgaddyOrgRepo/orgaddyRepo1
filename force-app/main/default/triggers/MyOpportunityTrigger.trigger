trigger MyOpportunityTrigger on Opportunity ( After insert) 
{   
   List<Opportunity> listOpp = New List<Opportunity>();
   List<Task> TskList = New List<Task>();
       for(Opportunity Opp : Trigger.New)
       {
           if(Opp.stageName != 'Closed Won' )
           {
             Task Tsk = New Task(); 
                Tsk.OwnerId = Opp.OwnerId;
               Tsk.WhoId = '0035g00000A9UY6AAN';// Id of contact Nikita Deshpande
               Tsk.Status = 'In Progress';
               Tsk.Priority = 'High';
               Tsk.Description='This has been Created Using Trigger..Please Win The Opp just created!!!!';
              
               TskList.add(Tsk);
           }
           else
           {
               Opp.addError('Hey Error Occured..!!!');
           }
       }
    Insert TskList;
  
   
   
}