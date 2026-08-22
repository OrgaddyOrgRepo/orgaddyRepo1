public class showCaseDataController {

    public string phoneNo { get; set;}
    public List<Case> caseList{get;set;}
    public boolean resultTable {get; set;}
    public List<String> selectedFields {get;set;} // dynamic columns
   
    public showCaseDataController(){
        selectedFields = New List<String>();
        resultTable = false;
        testinput();
    }
    
    public void testinput(){
        caseList = new List<Case>();
       string caseQuery;
        phoneNo = apexpages.currentPage().getParameters().get('callerNumber');
        system.debug('phoneNo---'+phoneNo);
        
        List<Contact> contactData = [SELECT Id, Phone FROM Contact WHERE Phone =:phoneNo LIMIT 1];
        system.debug('contactData----' + contactData); 
        
        //Fetching Case fields form custom Metadata and Placing them in Query String
        List<String> fieldList = New List<String>();
        
        Map<String, Case_Fields__mdt> mapCaseFields = Case_Fields__mdt.getAll(); // case field from Custom metadata
        system.debug(mapCaseFields);
        fieldList.addAll(mapCaseFields.keySet());
        
        system.debug(fieldList);
        
        
        string fieldListString='';
        // Constructing the field list string to be passed to Query
         if (fieldList != NULL && fieldList.size() > 0)
                {            
                    for (Integer i=0; i < fieldList.size(); i++)
                    {
                        if( i <= (fieldList.size() - 2))
                            fieldListString = fieldListString+fieldList[i]+',';
                        else
                            fieldListString = fieldListString+fieldList[i];    
                    }
                }     
        system.debug(fieldListString);
         selectedFields.addAll(fieldList); 
        
        
        //Fetching Cases related to a contact
        if(contactData.size()>0){
            system.debug('---contactData----'); 
           // caseList =  [SELECT Id,CaseNumber, ContactId, Type, Status, Reason, Origin, Subject FROM Case WHERE ContactId =:contactData[0].Id];
            caseQuery = 'SELECT '+ fieldListString + ' FROM Case '+ 'WHERE ContactId = '+'\''  +contactData[0].Id + '\'';
            system.debug(caseQuery);
            try{
                caseList = Database.Query(caseQuery);
            }
            catch(exception e)
            {
                system.debug(e.getCause());
            }
            
        }
        if(caseList.size()>0)
        	resultTable = true;
        else
            resultTable = false;
        system.debug('caseList----' + caseList); 
    }
    
    
    
}