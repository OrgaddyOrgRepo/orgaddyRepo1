public class CL_000_FucntionOverloading
{
    // FUNTIN IS ALSO CALLed Method
   integer a=10;
    
    Public void MAIN()
    {
        //Function overloading and methods differentiated with Parameters
        myFunction(); //
        myFunction('aditya');  
        myFunction(a);
   calculator(10,10); //20   //This was not returning anything..called directly
   String returnedvalue = calculator( 'A','B');// AB  //YThis is ging to retrurn something
        system.debug('This is main waala returned debug==> '+ returnedvalue);
      //  string returnedvalue2 = 'AB';
      //  system.debug(returnedvalue);
       //system.debug(calculator( 'A','B'));
     
}
    Public string Calculator(string x, string y )
    {
        string Concated = x + y;
        system.debug('function ke andar wala Debug==> '+ Concated);
        return Concated;
       
    }

// DRY code==> Dont Repeat Yourself
    PUBLIC void CALCULATOR(iNTEGER a, iNTEGER b) // void = nothing is being returned
    {
        INTEGER SUM = a + b;
        system.debug('This is integer Sum ==> '+ SUM);
       
    }
    
    
    
    
    PUBLIC VOID Myfunction()
    {
        system.debug('I am first wal afunction');
        myFunction('sam');
    }
    
    public void myFunction(string name)
    {
        system.debug('I am second wala function with name ===> '+ name);  //
    }
    
    public void myFunction(INteger num)
    {
        system.debug('I am the metho wiuth INteger==> '+ num);
    }

}