// context variable
// new, newMap , old,oldMap   ===> data
// trigger.old ===> old copy of data in list format
// trigger.oldMap ===> old copy of data in map format
// trigger.New ==> new copy of data in list format
// trigger.NewMap ==> new copy of data in map format


trigger AccountTutorialTrigger on Account (after update) 
{
	if(trigger.isUpdate && trigger.isAfter)
    {
       
    	accountTriggerHandler.accountAfterUpdate(Trigger.New, Trigger.OldMap);
    }
}
/*
  for(Account acc : trigger.new)
   {
       //check if billing city has changed or not
       for(account accrec : trigger.old)
       {
           	if(accrec.id == acc.id)
            {
                if(accrec.BillingCity != acc.BillingCity)
                {
                    //then get his billing and map on contact
                    for(Contact con : conList)
                    {	
                        if(con.accountId == acc.id)
                        {
                            con.mailingCity = acc.BillingCity;
                           
                        }
                    }
                }
            }
       }
   }
    update conList;
    }
 */