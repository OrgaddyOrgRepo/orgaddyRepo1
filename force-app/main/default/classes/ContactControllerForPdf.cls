public class ContactControllerForPdf {

@AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, FirstName, LastName, MobilePhone FROM Contact WHERE FirstName <> null AND LastName <> null AND MobilePhone <> null LIMIT 5];
    }
}