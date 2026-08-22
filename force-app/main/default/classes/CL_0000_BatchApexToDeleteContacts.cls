public class CL_0000_BatchApexToDeleteContacts  
{
	public void DeleteContacts()
    {
        List<Contact> ContactIds = New List<Contact>();
        List<Contact> Cons = [Select id,FirstName FROM Contact WHERE FirstName like '%daya%'];
        for(Contact C:Cons)
        { 
            ContactIds.add(C);
        }
        Delete ContactIds;
    }
}