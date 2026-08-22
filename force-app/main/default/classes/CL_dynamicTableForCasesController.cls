public class CL_dynamicTableForCasesController {
    
    public final string OBJECT_NAME = 'Case';
    public final string RECORD_TYPE_NAME = 'Product_Inquiry_Record_Type'; //The default Record type
    public contact[] contactData;
    public string phoneNo { get; set;}  	// this will come from apex page and used to fetch contact
    public List<Case> caseList{get;set;}      // Cases related to above contact are stored here
    public boolean resultTable {get; set;}
    public List<String> selectedFields {get;set;}   // Used for table display
    public integer size {get;set;}	
    public integer noOfRecords {get;set;}
    public string caseQuery;				
   
    public string fieldListString='';			// field list passed to the string query
    public string contactRecId {get;set;}    // to be passed as defualt value
    // Record type
    public string defaultRecordTypeId {get;set;}   // to be passed as defualt value     
    
    
    
    public CL_dynamicTableForCasesController()
    {
        
        selectedFields = New List<String>();
        size=10;
        
        //getting default recordType For CASE
        try{
            testinput();
            defaultRecordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get(RECORD_TYPE_NAME).getRecordTypeId();
            
        }
        catch(exception e)
        {
            system.debug( e.getCause());
        }
        
    }
    
    public void testinput(){
        caseList = new List<Case>();
        try{
            phoneNo = apexpages.currentPage().getParameters().get('callerNumber');
           contactData = [SELECT Id, Phone FROM Contact WHERE Id = '0035g000006gXiwAAE'];//Phone =:phoneNo LIMIT 1];
           contactRecId = contactData[0].Id;
        } 
        catch(exception e)
        {
            system.debug(e.getCause() );
        }
        
        // Forming String of Field list to be passed to String Query
        List<String> fieldList = New List<String>();
        
        Map<String, Case_Fields__mdt> mapCaseFields = Case_Fields__mdt.getAll(); // case field from Custom metadata
        system.debug(mapCaseFields);
        fieldList.addAll(mapCaseFields.keySet());
        
        system.debug(fieldList);
        
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
        
        
        
        if(contactData.size()>0){
           
            caseQuery = 'SELECT '+ fieldListString + ' FROM Case '+ 'WHERE ContactId = '+'\''  +contactData[0].Id +'\'' ;
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
        
    }
    
    // Pagination realised using standard set controller
    public ApexPages.StandardSetController ssc{
        get{
            
            system.debug('ApexPages.StandardSetController ssc functionVariable');
            
            if(ssc == null)
            {
                size = caseList.size()>10 ? 10 : caseList.size();
                ssc = new ApexPages.StandardSetController(caseList);
                
                ssc.setPageSize(size);
                noOfRecords = ssc.getResultSize();
            }
            return ssc ;
        }
        
        set;
    }
    
    public List<Case> getCases()
    {
        return (List<Case>)ssc.getRecords();
        
    }
    
    
    // Navigation to New Case Creation Page (Currently not in use as the navigation is happening 
    // through Javascript)
    public pagereference NewCase()
    {
        PageReference pageref = new PageReference(
            '/lightning/o/Case/new?defaultFieldValues='
            +'Description=My Description,'
            +'Priority=High,'
        );
        
        return pageref;
    }
    
    
    // Pagipnation on Standard Set Controller
    public Boolean hasNext  
    {  
        get  
        {  
            return ssc.getHasNext();  
        }  
        set;  
    }  
    public Boolean hasPrevious  
    {  
        get  
        {  
            return ssc.getHasPrevious();  
        }  
        set;  
    }  
    public Integer pageNumber  
    {  
        get  
        {  
            return ssc.getPageNumber();  
        }  
        set;  
    }  
    public void previous()  
    {  
        ssc.previous();  
    }  
    public void next()  
    {  
        ssc.next();  
    }  
    
    
    
    
}