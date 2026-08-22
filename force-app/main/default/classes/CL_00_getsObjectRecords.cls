public with sharing class CL_00_getsObjectRecords {
   
    @auraEnabled(cacheable=true)
    public static List<Account> getAccounts(string accName)
    {
        string searchkey = '%'+accName+'%';
        Return [Select Name,Phone,id, BillingCity FROM Account Where Name Like:searchkey];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts()
    {
        Return [SELECT id, FirstName, LastName, mailingCity From Contact LIMIT 10];
    }
}
//CL_00_getsObjectRecords.getContacts()