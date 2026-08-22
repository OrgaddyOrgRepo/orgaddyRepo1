public with sharing class CL_getTheContactDetails 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(string key) 
    { 
        List<contact> contactList = New List<contact>();
        String searchKey = '%' + key + '%';

        for(Contact[] con : [SELECT Name,id,Email FROM Contact Where Name LIKE: searchKey])
        {
            contactList.addAll(con);
          
        }
        return contactList;
        
    }
}