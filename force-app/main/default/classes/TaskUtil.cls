public class TaskUtil 
{
    public static string getTaskPriority(String leadstate)
    {
        // Validate input
        if(string.isBlank(leadstate) || leadstate.length() > 2 )
        {
            return null;
        }
        
        string TaskPriority;
        
        if(leadstate == 'CA')
        {
            TaskPriority = 'High';
        }
        else
        {
            TaskPriority = 'Normal';
        }
        
        return TaskPriority;
    }

}