public class CL_CaseTableManagement 
{
   @Auraenabled(Cacheable=true)
    public static List<CL_CaseWrapper> getTheRelatedCases()
    {
        //Initialising The Wrapper
       
        List<CL_CaseWrapper> CaseWrapperList= New List<CL_CaseWrapper>();
        List<Contact> conList = [Select firstName,lastName,id,
                                 (SELECT ContactId,CaseNumber,Origin,Status,Priority FROM Cases )
                                 From Contact ];
       for(Contact C: conList)
       {
            CL_CaseWrapper CaseWrap = New CL_CaseWrapper();
           CaseWrap.conRecord = C;
           CaseWrap.caseList  = C.cases;
           CaseWrap.noOfCases = C.Cases.size();
           CaseWrapperList.add(CaseWrap);
       }
        Return CaseWrapperList;
    }
    
   
}