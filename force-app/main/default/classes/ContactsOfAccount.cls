public with sharing class ContactsOfAccount {
   

    @auraEnabled(cacheable=true)
    public static list<contact> getRelatedContacts(string accId)
    {
        return [SELECT Name, Email, Phone FROM Contact WHERE AccountID =: accId ];

    }


    @AuraEnabled
    public static void createContact(Contact con , string accId){
        try {
            con.AccountID = accId ;
            INSERT con;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}