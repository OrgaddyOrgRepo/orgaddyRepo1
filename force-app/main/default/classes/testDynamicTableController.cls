public class testDynamicTableController {
    
    
    //public string phoneNo { get; set;}
    
    public List<Case> caseList{get;set;}
    public boolean resultTable {get; set;}
    public List<String> selectedFields {get;set;}
    public integer size {get;set;}
    public integer noOfRecords {get;set;}
    public string caseQuery;
    public List<Case> records {get;set;}
    public List<Case> filteredCases{get;set;}
    public boolean filterApplied = false;
    PUblic string contactRecId {get;set;}
    public string fieldListString='';
      //FilterPopup
    public  String[] Priority_choices = new String[]{};
    public  String[] Status_choices = new String[]{};    
    public string[] allChoices = new String[]{};    
    public boolean displayPopup {get; set;}              
        // Record type
    public string defaultRecordTypeId {get;set;}        
    
    public testDynamicTableController(){
        system.debug('constructor ran..');
        contactRecId = '0035g000006gXiwAAE';
        case[] caseList = new List<Case>();
        List<Case> records = New List<Case>();
        filteredCases = New Case[]{};
        selectedFields = New List<String>();
        resultTable = false;
        fetchCases(filterApplied);        
        size=2;
        
        //getting default recordTyoeFor CASE
        Schema.DescribeSObjectResult describeResult = Case.getsObjectType().getDescribe();
        List<Schema.RecordTypeInfo> rtInfos = describeResult.getRecordTypeInfos();
        for(Schema.RecordTypeInfo rtInfo : rtInfos) {
            
            if(rtInfo.isDefaultRecordTypeMapping()) {       
                System.debug('Default Record Type Id ====> '+rtInfo.getRecordTypeId());
                defaultRecordTypeId = rtInfo.getRecordTypeId();
            }
        }  
       
    }
    
    public ApexPages.StandardSetController ssc{
        get{
            
            system.debug('ApexPages.StandardSetController ssc functionVariable');
           if(filterApplied == false)
            {
               if(ssc == null)
               {
                 size = caseList.size()>10 ? 10 : caseList.size();
                ssc = new ApexPages.StandardSetController(caseList);
                
                ssc.setPageSize(size);
                noOfRecords = ssc.getResultSize();
                }
              
             }
       /*     if(filterApplied == true )
            {
                
                ApexPages.StandardSetController ssc_filtered = new ApexPages.StandardSetController(caseList);
				//ssc = new ApexPages.StandardSetController(caseList);
                ssc_filtered.setPageSize(size);
                noOfRecords = ssc_filtered.getResultSize();
                
                ssc = ssc_filtered;
               
            }
*/
            return ssc ;
           }
        
        set;
    }
    
    public List<Case> getCases(){
         system.Debug('getCases FUNCTION');
        
            return (List<Case>)ssc.getRecords();
          
    }
    
    public pagereference NewCase()
    {
         PageReference pageref = new PageReference(
             '/lightning/o/Case/new?defaultFieldValues='
             +'Description=My Description,'
             +'Priority=High,'
             );
                
                
               
               
        return pageref;
    }
    
    public void fetchCases(boolean filterApplied){
        
        system.Debug('testinput FUNCTION');
        List<Contact> contactData = [SELECT Id, Phone FROM Contact WHERE Id = '0035g000006gXiwAAE'];  
        contactRecId = contactData[0].id;
        //Fetching Case fields form custom Metadata and Placing them in Query String
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
        
        
        //Fetching Cases related to a contact
        if(contactData.size()>0){
            system.debug('---contactData----'); 
            
            
        if(filterApplied == false)
        {
           
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
        else if(filterApplied == true)
        {
             caseQuery = 'SELECT '+ fieldListString + ' FROM Case '+ 'WHERE ContactId = '+'\''  +contactData[0].Id + '\'' + ' AND priority=: '+priority_choices;
            system.debug(caseQuery);
            try{
                caseList = Database.Query(caseQuery);
            }
            catch(exception e)
            {
                system.debug(e.getCause());
            }
        }
            
        }        
        if(caseList.size()>0)
            resultTable = true;
        else
            resultTable = false;
        system.debug('caseList----' + caseList); 
        
    
    
    
    }
    
   public void CreateCase()
    {
        // Navigate to standard Case Create Page
    }
    
    
    //Filtering==> Priority Status Source
    
    
    
    public void closeFilter() {  
      
        displayPopup = false; 
        
    }     
    public void ShowFilter() {   
         system.Debug('ShowFilter FUNCTION');
        displayPopup = true;  
        
    }
    public void clearFilter()
    {
        caseList.clear();
        caseList = [SELECT Id,CaseNumber, ContactId, Type, Priority,Status, Reason, Origin FROM Case WHERE ContactId ='0035g000006gXiwAAE'];
        priority_Choices.clear();
        status_Choices.clear();
        ssc = new ApexPages.StandardSetController(caseList);
        size = caseList.size()>10 ? 10 : caseList.size();
        ssc.setPageSize(size);
        
         
         noOfRecords = ssc.getResultSize();
    }
   
    
    
    public void applyFilter()
    {
       
        filterApplied = true;
        allChoices.addAll(Status_choices);
        allChoices.addAll(Priority_choices);
    	 if(filterApplied == true)
            {  
                 system.debug('SSC inside else for filter');
                //String queryResult = 'SELECT Id, Name, Phone FROM Contact ORDER BY Name';
                 caseList.clear();
                if(priority_Choices.size() != 0 && status_Choices.size() < 0)
                {
                    caseList = [SELECT Id,CaseNumber, ContactId, Type, Priority,Status, Reason, Origin FROM Case WHERE ContactId ='0035g000006gXiwAAE' AND Priority IN: priority_choices];
                }
                else if(priority_Choices.size() < 0 && status_Choices.size() != 0)
                {
                    caseList = [SELECT Id,CaseNumber, ContactId, Type, Priority,Status, Reason, Origin FROM Case WHERE ContactId ='0035g000006gXiwAAE' AND Status IN: status_choices];
                }
                else if(priority_Choices.size() != 0 && status_Choices.size() != 0)
                {
                    caseList = [SELECT Id,CaseNumber, ContactId, Type, Priority,Status, Reason, Origin FROM Case WHERE ContactId ='0035g000006gXiwAAE' AND Status IN: status_choices AND Priority IN: priority_choices];
                }
                else
                {
                     caseList = [SELECT Id,CaseNumber, ContactId, Type, Priority,Status, Reason, Origin FROM Case WHERE ContactId ='0035g000006gXiwAAE'];
                }
                
               if(caseList.size() != 0)
               {
                   ssc = new ApexPages.StandardSetController(caseList);
                   size = caseList.size()>10 ? 10 : caseList.size();
                   ssc.setPageSize(size);
                   noOfRecords = ssc.getResultSize();
               }
              

            }

      //  system.debug(allChoices);
       
        /*       string filterQuery = 'SELECT ' + ' priority,caseNumber,Status,CaseReason,CaseOrigin,ContactId ' + ' FROM Case WHERE ContactId= \'0035g000006gXiwAAE\' ' ;
                if(priority_choices.size() != 0)
                {
                    system.debug('priority_choices=> '+priority_choices);
                    filterQuery += ' AND Priority IN :' + priority_choices ;
                }
                else if(status_Choices.size() != 0)
                {
                     system.debug('Status_choices=> '+Status_choices);
                    filterQuery += ' AND Status IN :(' + Status_choices +')';
                }

                system.debug('FilterQuery===> '+ filterQuery);
*/			
        displayPopup = false; 
    }
    
              
    public String[] getPriority_choices() {
        return Priority_choices;
    }
    
    public void setPriority_choices(String[] Priority_choices)
    {
        this.Priority_choices = Priority_choices;
    }
    
    public List<SelectOption> getPriorities()
    {
        List<SelectOption> options = new List<SelectOption>();
        Schema.DescribeFieldResult fieldResult = Case.Priority.getDescribe();
        List<Schema.PicklistEntry> ple_Priority = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry f : ple_Priority)
        {
            options.add(new SelectOption(f.getLabel(), f.getValue()));
        }     
        return options;
    }
    
    public string[] getStatus_choices()
    {
        return Status_choices;
    }
    
    public void setStatus_choices(string[] Status_choices)
    {
        this.Status_choices =Status_choices;
        
    }
    
    public List<SelectOption> getStatus()
    {
        List<Selectoption> options = New List<selectOption>();
        Schema.describeFieldResult fieldResult = Case.Status.getDescribe();
        List<Schema.PicklistEntry> ple_Status =  fieldResult.getPickListValues();
        for(schema.PicklistEntry p : ple_Status)
        {
            options.add(new selectOption(p.getLabel(),p.getValue()));
        }
        return Options;
    }
    
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