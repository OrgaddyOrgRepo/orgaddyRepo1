public class practiceClass 
{
    Public Integer myint = 10;
    Public Account myacc = New Account(Name= 'testAccName', Phone= '1111155555');
    
    public practiceClass()
    {
        integer var = editIntegerVar(myInt);
        system.debug('var=> '+ var);
        system.debug('myint=> ' +myint);
        
        account acc = editAccount(myacc);
        system.debug('acc=> '+ acc);
        system.debug('actual=> '+ myAcc);
    }
	public integer editIntegerVar(Integer myvar)
    { 
        myVar ++ ;
        system.debug(myVar);
        return myVar;
    }
    
    public account editAccount(Account accRec)
    {
        accRec.Name = 'newtestName';
        return accRec;
    }
}