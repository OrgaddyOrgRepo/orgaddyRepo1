public with sharing class CL_poc {

@Auraenabled(cacheable = true)
public static list<Contact> getContacts()
{
    return [SELECT firstName,lastName,Name, Email,id FROM Contact limit 10];    
} 
// @Auraenabled
// public static Contact updateContact(string con)
// {
//    system.debug('Received COntact =>'+con);
  
//    Contact C = (contact)JSON.deserialize(con,Contact.class);
    
          
//            update C;
//         return C;
   

// }  

// @AuraEnabled
// public static list<Contact> getFreshData()
// {
//     return getContacts();
// }
   
}