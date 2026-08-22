public class CL_0308_BatchApex Implements Database.Batchable<Lead>

{
	//Start
	public List<Lead> Start (database.batchableContext LtC)
    {
        List<Lead> L = [select Name From Lead ];
        Return L;
        
    }
    public void Execute(database.BatchableContext LtC, List<Lead> LD)    
    {
         List<Contact> Con = New List<Contact>{};
        For(Lead LE:LD)
        { 	
           Contact C= New Contact();
          	C.LastName =  LE.Name;
      
            Con.add(C);
        }
        Insert Con;
    }
    
    public Void Finish(Database.batchableContext BL)
    {
        // I will Send Email After The process Is Over...By calling the Class For Messaging
        
        
        
 
    }
        
}