public class CL_0109_StudentEnquiryDetailControl 
{ 	
    public List<Student_Enquiry__c> DetailRecord {get;set;}
	public CL_0109_StudentEnquiryDetailControl(apexPages.standardController SC)
    {
       

       String message = System.currentPagereference().getParameters().get('msg');
       DetailRecord = [SELECT Name, Candidate_Name__c, Email__c,Mobile_No__c,Interested_Course_1__c,Interested_Course_2__c,Father_Occupation__c,Family_Annual_Income__c,Permanent_Address__c,Educational_Qualification__c,Date_Of_Birth__c,Age__c
                        FROM Student_Enquiry__c WHERE Id =: message];

    }
    
}