public class CL_lwcAccount {

     
    @AuraEnabled(cacheable=true)
    public static list<Account> fetchAccounts(){
        return [SELECT Id, Name, Type, Phone FROM Account LIMIT 10];
    }

}