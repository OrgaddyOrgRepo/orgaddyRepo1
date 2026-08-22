trigger InsertTriggerOnContact on Contact (after insert)
{
    if(Trigger.isInsert && Trigger.isAfter)
    {
     List<Contact> conList = Trigger.New;
     set<id> accIds = New Set<id>();
        for(Contact C : conList)
        {
            if(C.Accountid != null)
            {
                id acc_id =  C.AccountId; 
                accIds.add(acc_id);
            }
          
        }
        
        
         List<Account> AccList = [SELECT Phone,(SELECT MobilePhone FROM Contacts) FROM Account WHERE id IN : accIds];
         List<Account> accToBeUPdated =New  List<Account>();
      for(Account A: AccList)
      {
          for(Contact Con: A.Contacts)
          {
              if(Con.MobilePhone != null)
              {
               A.Phone = Con.MobilePhone;  
               accToBeUPdated.add(A);
                  
              }
              
          }
      }
         
          UPDATE accToBeUPdated;
            
    }  
}