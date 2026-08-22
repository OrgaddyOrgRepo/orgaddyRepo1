public class CL_0508_CALCULATOR 
{
    //  class Variables, Methods, class...
    //nUM1, nuM2, nUM3
  //CLASS Variables
  
    public Integer Num1      {get;set;}   // get---> Value being pushed to VF page After Processing
    public Integer Num2      {get;set;}   // set ---> Value being taken by Controller for Processing
    public Integer Num3      {get;set;}
    
    public Integer Result    {get;set;}  // We wll Send This ValUE to Vf
    Public String Choice   {get;set;}    // Value Being Returned bY rADIO bUTTON...
    Public String ErrorMessage {set;get;}    
    // Methods
    
 
    public void MyMain()        // We have calle dall the methodsw in main Method
    {
        if(Choice== 'GR')
        {
          GreaterNumber();  
        }
        ELSE IF(Choice == 'SM')
        {
            SmallerNumber();
        }
        ELSE
        {
           ErrorMessage = 'Babu Tu Kahi value dellyach naai...Barobar Value De...!!!' ;
        }
        
        
    }
    
 
    
     void GreaterNumber()
    {
        if(Num1 > Num2 && Num1 > Num3)
        {
            Result = Num1;
        }
        else If(Num2 > Num1 && Num2 > Num3)
        {
            Result= Num2;
        }
        else
        {
            Result = Num3;
        }
    }
    
     void SmallerNumber()
    {
        if(Num1 < Num2 && Num1 < Num3)
        {
            Result = Num1;
        }
        else If(Num2 < Num1 && Num2 < Num3)
        {
            Result=Num2;
        }
        else
        {
            Result = Num3;
        }
    }
    
    public void ClearMe()
    {
        Num1 = Null;
        Num2 = Null;
        Num3 = Null;
        Result = Null;
    }
    
    
}