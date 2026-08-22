public class CL_0109_StudentEntryForm_Control 
{   
 	Student__c StudentRecord;
 
	public CL_0109_StudentEntryForm_Control(apexpages.StandardController SC)
    {
		this.StudentRecord = (Student__c)SC.getRecord();
    }
 
 

     

    public PageReference Save()    // After Clicking Save Button The folowing page Loads
    { 
      insert StudentRecord;
      PageReference  Home = Page.VF_0109_Student_Object_HomePage;
        return Home;
    }

}