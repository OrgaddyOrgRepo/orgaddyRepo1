public class CL_1309_TabsReference_InstManagement 
{
	public pageReference GotoEnquiryPage()
    {
        pagereference EnquiryHome = Page.VF_O1O9_StudentEnquiry_Homepage;
        EnquiryHome.setRedirect(true);
        return EnquiryHome;
    }
    
    public pageReference GotoStudentPage()
    {
        pagereference StudentHome = Page.VF_0109_Student_Object_Homepage;
        StudentHome.setRedirect(true);
        return StudentHome;
    }
    
   /*  public pageReference GotoCoursePage()
    {
        pagereference CourseHome = Page.VF_0109_Course_Object_Homepage;
        CourseHome.setRedirect(true);
        return CourseHome;
    }
   */ 

    
}