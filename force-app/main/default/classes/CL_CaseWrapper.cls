public class CL_CaseWrapper {

    @AuraEnabled
        public Contact conRecord {get;set;}
        
        @AuraEnabled
        public List<Case> caseList {get;set;}
        
        @AuraEnabled
        public integer noOfCases {get;set;}  
            
}