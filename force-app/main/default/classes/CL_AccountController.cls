public with sharing class CL_AccountController {
    
    @AuraEnabled(cacheable= true)
    public static List<Account> getAccounts()
    {
        return [SELECT Id,Name,AccountNumber,Rating,Phone FROM Account LIMIT 10];
    }
}