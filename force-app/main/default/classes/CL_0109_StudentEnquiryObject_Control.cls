public class CL_0109_StudentEnquiryObject_Control 
{
    public List<Student_Enquiry__c> tableData {get;set;}
    public String recId {get;set;}
 	
	public CL_0109_StudentEnquiryObject_Control(Apexpages.StandardController SC)
    {	
        
        tableData = [SELECT id,Name,Candidate_Name__c,Mobile_NO__c,Email__c
                     FROM Student_Enquiry__c ];
        
        
    }
 //   public Pagereference gotoDetailpage()
  //  {
         
   //     Pagereference pageRef = Page.VF_0109_StudentEnquiryDetail_Individual;
   //     pageRef.getParameters().put('RecordId','recId');// recId with or without single quote both works when we use outputLink
    //    return PageRef;
  //  }   
   
    
    
  Public PageReference CreateRecord()
  { 
           
          string url = 'https://orgaddysolutionspvtltd-dev-ed--c.visualforce.com/apex/VF_0109_StudenEnquiryForm?core.apexpages.request.devconsole=1' ;
     	  PageReference Home = New PageReference(url);
          Home.setRedirect(true);
          return Home;
        
  }
}