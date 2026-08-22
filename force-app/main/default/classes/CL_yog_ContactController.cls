public with sharing class CL_yog_ContactController {
   
@AuraEnabled(cacheable=true)
public static List<Contact> getContacts()
{
    return [SELECT firstName, lastName, Phone FROM Contact Limit 10];
}

}