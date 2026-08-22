public class cl_0000_CreatingMapOfObjectData 
{

    public void mapOfAccount()
    {
       // map<id,Account> mapOfAccounts = New map<id,Account>();
        
        account[] accs = [Select Name,billingCity From Account Limit 5 ];
        string accStringified = JSON.serializePretty(accs);
        system.debug(accs);
        system.debug(accStringified);
        
        Map<ID, Account> m = new Map<ID, Account>();
    }
    public void mapFromSoql()
    {
        Map<ID, Account> m = new Map<ID, Account>([Select Name,billingCity From Account Limit 1]);
		// After populating the map, iterate through the map entries
		system.debug(m);
        string AccString = JSON.serializePretty(m);
        system.debug(AccString);
        /*
		for (ID idKey : m.keyset()) {
   		Account a = m.get(idKey);
    	System.debug(a);

	}*/
    }
    
}