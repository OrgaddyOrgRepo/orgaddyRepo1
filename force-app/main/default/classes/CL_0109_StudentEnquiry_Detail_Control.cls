public virtual class CL_0109_StudentEnquiry_Detail_Control 
{
    public Student_Enquiry__c  DetailRecord {get;set;}
    public Student_Enquiry__c ReadOnlyPageRecord     {get;set;}   // Brings the id Here
    Public string StuEnq {get;set;}
    Public String recId2 {get;set;}
    
    
    public CL_0109_StudentEnquiry_Detail_Control(apexPages.StandardController SC)
    {       
      	ReadOnlyPageRecord = (Student_Enquiry__c)SC.getRecord();
      		
      	 String CancelPageBackId = System.currentPageReference().getParameters().get('cancelvar');
           
        if(CancelPageBackId == null)
           {
            StuEnq = System.currentPagereference().getParameters().get('RecordId');// Message Received Here
            DetailRecord = [SELECT  Candidate_Name__c,Gender__c,Guardian__c,Date_Of_Birth__c,Guardian_Name__c,Father_Occupation__c,Community__c,Mother_Occupation__c,Family_Annual_Income__c,Proofs_Submitted__c,Passport_No__c,Educational_Qualification__c,Year_Of_Pass__c,Passed_Out_Organisation__c,Mobile_No__c,Father_Mobile_No__c,Address_For_Correspondence__c,Email__c,Permanent_Address__c,Interested_Course_1__c,Other_Interested_Course__c,Interested_Course_2__c //Course__c,
                       FROM Student_Enquiry__c
                       WHERE ID=: StuEnq]; //All Fields have been called
        	
           } 
       else 
            {
                
                DetailRecord = [SELECT  Candidate_Name__c,Gender__c,Guardian__c,Date_Of_Birth__c,Guardian_Name__c,Father_Occupation__c,Community__c,Mother_Occupation__c,Family_Annual_Income__c,Proofs_Submitted__c,Passport_No__c,Educational_Qualification__c,Year_Of_Pass__c,Passed_Out_Organisation__c,Mobile_No__c,Father_Mobile_No__c,Address_For_Correspondence__c,Email__c,Permanent_Address__c,Interested_Course_1__c,Other_Interested_Course__c,Interested_Course_2__c //Course__c,
                       FROM Student_Enquiry__c
                       WHERE ID=: CancelPageBackId];
            }
          
           
    }
    
   
    	public PageReference DirectToEditablePage()
    {
        Pagereference EditablePage = Page.VF_0109_IndividualEnquiryEditable;
        EditablePage.getParameters().put('EditVar',recId2);  //Sends the Id To Referered Page
        Return EditablePage;
		// recId2 was not written inside sinle quote because it was sent by CommandLink not by OUTPUTlINK
    }
    
    
    public PageReference ConvertToStudent()
    {   
       //List<Student__c> NewStudent = New List<Student__c>();
       Student_Enquiry__c DetailRecord =  [SELECT  Candidate_Name__c,Gender__c,Guardian__c,Date_Of_Birth__c,Guardian_Name__c,Father_Occupation__c,Community__c,Mother_Occupation__c,Family_Annual_Income__c,Proofs_Submitted__c,Passport_No__c,Educational_Qualification__c,Year_Of_Pass__c,Passed_Out_Organisation__c,Mobile_No__c,Father_Mobile_No__c,Address_For_Correspondence__c,Email__c,Permanent_Address__c,Interested_Course_1__c,Other_Interested_Course__c,Interested_Course_2__c//Course__c,
                                                       FROM Student_Enquiry__c
                                                       WHERE ID=: StuEnq]; //apexpages.currentPage().getParameters().get('Id')
      
       
       
       
       Student__c  ConvertedEnquiry = New Student__c
           
           (  
              		   Name = DetailRecord.Candidate_Name__c,
                       Address_For_Correspondence__c= DetailRecord.Address_For_Correspondence__c,
                       Community__c =  DetailRecord.Community__c,
                   //    Course__c = DetailRecord.Course__c,
               		   
                       Date_Of_Birth__c=DetailRecord.Date_Of_Birth__c,
                       Educational_Qualification__c = DetailRecord.Educational_Qualification__c,
                       Email__c = DetailRecord.Email__c,
                       Family_Annual_Income__c = DetailRecord.Family_Annual_Income__c,
                       Father_Mobile_No__c = DetailRecord.Father_Mobile_No__c,
                       Father_Occupation__c = DetailRecord.Father_Occupation__c,
                       Gender__c = DetailRecord.Gender__c,
                       Guardian__c = DetailRecord.Guardian__c,
                       Guardian_Name__c = DetailRecord.Guardian_Name__c,
                       Interested_Course_1__c = DetailRecord.Interested_Course_1__c,
                       Interested_Course_2__c = DetailRecord.Interested_Course_2__c,
                       Mobile_No__c = DetailRecord.Mobile_No__c,
                       Mother_Occupation__c= DetailRecord.Mother_Occupation__c,
                       Other_Interested_Course__c = DetailRecord.Other_Interested_Course__c,
                	   Passed_Out_Organisation__c = DetailRecord.Passed_Out_Organisation__c,
                       Passport_No__c = DetailRecord.Passport_No__c,
                       Permanent_Address__c = DetailRecord.Permanent_Address__c,
                       Proofs_Submitted__c = DetailRecord.Proofs_Submitted__c,
                       Year_Of_Pass__c = DetailRecord.Year_Of_Pass__c
           
               );
       
       //NewStudent.add(ConvertedEnquiry);
       insert ConvertedEnquiry;
	   Delete DetailRecord;
   


     
       //Convert();
       PageReference gotoStudentHomePage = Page.VF_0109_Student_Object_HomePage;
       gotoStudentHomePage.setRedirect(true);
       return gotoStudentHomePage;
    }
             
      

    public PageReference deleteMe()
    {
        delete DetailRecord;
        PageReference Home = Page.VF_O1O9_StudentEnquiry_Homepage;
        Home.setRedirect(true);
        Return Home;
    }
    
}