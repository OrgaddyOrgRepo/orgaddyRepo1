public class Cl_Loopy
{
  Public List<Contact> Con =  [Select Firstname, LastName From Contact Where Account.Name like '%a%'];
   
    
    // fETCH One by one FORM lIST
    Public void PullContact()
      { 
          List<Contact> InsCont = New List<Contact>(); 
          System.debug(Con);
          For(Contact E : Con)
        {
            E.FirstName = 'KJBSDFAG';  // Changing The Value Of FirstName
            InsCont.Add(E);
        }
          system.debug(InsCont);
          Update InsCont;
          Delete InsCont;
          
    }
}