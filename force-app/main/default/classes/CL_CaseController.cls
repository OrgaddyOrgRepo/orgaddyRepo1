public with sharing class CL_CaseController {
   
    @auraEnabled(cacheable=true)
    public static List<case> getCasesAndLIstViews(string fieldList)
    {
        
            string query = 'SELECT '+fieldList + ' FROM case';
          

           
            return Database.query(query);
        }

    @auraenabled(cacheable=true)
    public static list<listVIew> fetchListViews()
    {
        return [SELECT Id, Name, DeveloperName, SobjectType FROM ListView WHERE sObjectType='Case'] ;
    }

    
}