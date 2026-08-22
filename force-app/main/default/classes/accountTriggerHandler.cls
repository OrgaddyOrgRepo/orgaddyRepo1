public class accountTriggerHandler 
{
	public static void accountAfterUpdate(List<Account> newAccList , Map<Id,Account> oldAccMap)    
    {
        	 List<Contact> conList = [SELECT Id, Firstname,lastname,mailingCity,AccountId FROM Contact WHERE accountId  IN :newAccList ];
        map<id,List<contact>> accConMap = New map<id,List<contact>>();  // accountId, related contacts
        List<Contact> contactstoUpdate = New List<Contact>();
        for(contact con : conList)
        {
            if(! accConMap.containsKey(con.AccountId)) // account id does not exist in map as key
            {
                accConMap.put(con.AccountId, New List<Contact>());
                accConMap.get(con.AccountId).add(con); // value --- list<Conatct>
            }
            else
            {
                accConMap.get(con.AccountId).add(con);
            }
        }
        
        for(Account acc : newAccList )
        {
            if(oldAccMap.get(acc.id).billingCity != acc.BillingCity)
            {
                for(contact con : accConMap.get(acc.id))
                {
                    con.MailingCity = acc.BillingCity;
                    contactstoUpdate.add(con);
                }
                
            }
        }
    update contactstoUpdate;
    }
}