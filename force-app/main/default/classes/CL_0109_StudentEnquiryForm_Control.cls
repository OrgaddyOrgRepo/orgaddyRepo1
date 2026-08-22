public class CL_0109_StudentEnquiryForm_Control 
{	String EnquiryFormUrl {get;set;}
    String NewEnquiry ;
    Student_Enquiry__c EnquiryRecord_New;
	public CL_0109_StudentEnquiryForm_ControL(Apexpages.StandardController SC)
    {
        this.NewEnquiry = SC.getId();
        this.EnquiryRecord_New = (Student_Enquiry__c)SC.getRecord();
    }
     
    
    

    public PageReference SaveMeWithPageRef()    // After Clicking Save Button The folowing page Loads
    {  
       PageReference EnquiryFormPage = ApexPages.currentPage();
        EnquiryFormUrl =EnquiryFormPage.getUrl();   // The Url Of this PAGE is PASSED tO THE VARIABLE
        // Save 
      Student_Enquiry__c SE = New Student_Enquiry__c();
      SE = EnquiryRecord_New.Clone();
      INSERT SE;
        // Direct TO HomePage
      PageReference Home = New PageReference('/apex/VF_O1O9_StudentEnquiry_Homepage');
        Home.setRedirect(true);
        return Home; 
        
    }
 
  Public Pagereference CancelWithPageref()
  {		
        PageReference Home = Page.VF_O1O9_StudentEnquiry_Homepage;
        Home.setRedirect(true);
        return Home; 
  }
}