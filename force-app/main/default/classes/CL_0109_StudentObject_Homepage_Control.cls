public class CL_0109_StudentObject_Homepage_Control 
{
    public List<Student__c> tableData {get;set;}
    public String recId {get;set;}
 	
	public CL_0109_StudentObject_Homepage_Control(Apexpages.StandardController SC)
    {	
        
        tableData = [SELECT id,Name,Mobile_NO__c,Email__c
                     FROM Student__c ];
        
        
    }
    public Pagereference gotoDetailpage()
    {
         
        Pagereference pageRef = Page.VF_0109_StudentEnquiryDetail_Individual;
        pageRef.getParameters().put('Id','recId');// recId with or without single quote both works when we use outputLink
        return PageRef;
    }   
   
    
    
  Public PageReference CreateRecord()
  { 
           Pagereference EntryForm = Page.VF_0109_StudentEntry_Form;
           
          //string url = 'https://orgaddysolutionspvtltd-dev-ed--c.visualforce.com/apex/VF_0109_StudenEnquiryForm?core.apexpages.request.devconsole=1' ;
     	  //PageReference Home = New PageReference(url);
          EntryForm.setRedirect(true);
          return EntryForm;
        
  }
}