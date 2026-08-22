public class CL_1010_Emaling 
{   
    public void MassMailing()
    {
        List<String> SeachList= New List<String>{'%Deven%' , '%Nikita%' ,  '%Sugandha%'} ; 
    	 List<Contact> Cons = [Select id, Email FROM Contact WHERE name LIKE : SeachList]; 
   	  
        emailTemplate et = [SELECT id From EmailTemplate Where Name = 'HelloContact'];
        messaging.MassEmailMessage MEM = NEW messaging.MassEmailMessage();
        MEM.setTemplateId(et.id);
        MEM.setReplyTo('adi.92sfdc@gmail.com');
        List<id> whoIds = new List<id>();
        for(Contact EC : Cons)
        {	
            whoIds.add(EC.id);
        } 
        MEM.setTargetObjectIds(whoIds);
       
        messaging.Email[] Em = new Messaging.Email[]{MEM};
        messaging.sendEmail(Em);
        
        
    }
}