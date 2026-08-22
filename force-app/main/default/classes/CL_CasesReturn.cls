public class CL_CasesReturn 
{
    public string name {get;set;}
    
    public void myNmae()
    {
        name ='Nilesh';
    }
    
	@AuraEnabled(Cacheable=true)
    public static List<Case>  getCasesOfContact()
    {
        return [SELECT CaseNumber,Origin, Status, Reason FROM Case];
    }
}