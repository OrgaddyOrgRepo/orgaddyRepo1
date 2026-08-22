trigger ContactTrigger on Contact (after insert, After Update) 
{  
   
  if(Trigger.IsAfter)
  { 
      If(Trigger.isInsert )
      {
          List<Account> AccsToUpdate = New List<Account>();
      	  Contact[] Con = Trigger.New;
          if(Con[0].AccountId != null)
          {
            
            String AccId = Con[0].AccountId;
            Account Acc  =[SELECT id, Phone FROM Account Where Id=: AccId ];
            for(Contact c : Con)
            {
              Acc.Phone = c.MobilePhone;
              AccsToUpdate.Add(Acc);      
            } 
           
              UPDATE AccsToUpdate;
          }
       }// is Insert Ends
      
    }//is after ends
}