public class CL_0109_IndividiualEnquiryEditControl 
{
	
  
    public Student_Enquiry__c  DetailRecord  {get;set;}
   
    Public string EditableStuEnqId           {get;set;}
    Public Student_Enquiry__c editedRecord ;
    Public String CancelRecId {get;set;}
    
   public  CL_0109_IndividiualEnquiryEditControl(Apexpages.standardController SC)
  { 
     EditableStuEnqId = System.currentPageReference().getParameters().get('EditVar');
     DetailRecord = [SELECT   Candidate_Name__c,Gender__c,Guardian__c,Date_Of_Birth__c,Guardian_Name__c,Father_Occupation__c,Community__c,Mother_Occupation__c,Family_Annual_Income__c,Proofs_Submitted__c,Passport_No__c,Educational_Qualification__c,Year_Of_Pass__c,Passed_Out_Organisation__c,Mobile_No__c,Father_Mobile_No__c,Address_For_Correspondence__c,Email__c,Permanent_Address__c,Interested_Course_1__c,Other_Interested_Course__c,Interested_Course_2__c
                      FROM Student_Enquiry__c WHERE id=:EditableStuEnqId];           
     
  }  
   Public PageReference UpdateEdited()
   {   
      Update DetailRecord;
       Pagereference ReadOnlyPage = Page.VF_O1O9_StudentEnquiry_Homepage;  
       ReadOnlyPage.setRedirect(true);
       Return ReadOnlyPage;
   }
  
  Public PageReference CancelWithPageRef()
  {
      PageReference BackPage = Page.VF_0109_StudentEnquiryDetail_Individual;
      BackPage.getParameters().put('cancelvar',CancelRecId);
      BackPage.setRedirect(true);
      return BackPage;
  }
   
    
    
    
}