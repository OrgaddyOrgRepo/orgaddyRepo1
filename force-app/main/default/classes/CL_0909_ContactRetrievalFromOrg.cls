public class CL_0909_ContactRetrievalFromOrg 
{	
    @AuraEnabled
	public static List<Contact> RetrieveContact()
    {
         
       
        return [SELECT id,Name, Email, MobilePhone FROM Contact ];
        
    }
}