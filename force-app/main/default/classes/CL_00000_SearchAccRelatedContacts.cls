public with sharing class CL_00000_SearchAccRelatedContacts
{
  //public  static String SearchKey_1;
    @AuraEnabled(Cacheable=true)
   Public static List<Contact> findTheContacts(String accName)
    {
        String SearchKey = '%'+accName+'%';
       List<Contact> contactsToReturn = New List<Contact>();
       List<Account> acc = [Select id,(SELECT Name,id,MobilePhone,MailingCity FROM Contacts) FROM Account Where Name LIKE : SearchKey ];
        for(Account A : acc)
        {
            List<Contact> Con = A.Contacts;
            contactsToReturn.addAll(Con);
        }
    
        Return contactsToReturn;
        
    }
   
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> findTheAccounts(String accName)
    {
         String SearchKey = '%'+accName+'%';
      Return[ Select Name,id,Phone,BillingCity From Account Where Name LIKE : SearchKey];
     }
}