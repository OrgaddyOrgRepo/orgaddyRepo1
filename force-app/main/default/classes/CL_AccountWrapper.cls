public class CL_AccountWrapper 
{	
        @AuraEnabled
        public Account accRecord {get;set;}
    
        @auraEnabled
       public List<Contact> conList {get;set;}
    
        @auraEnabled
        public Integer contactCount {get;set;}
}