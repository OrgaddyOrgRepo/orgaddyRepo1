public class CL_0908_DecimalTobinary
{
	    //Class Variable
   public integer Num1 =101;
   public String Bin ;

    // Method

 public Void Convert()
 {
     Integer Quotient=1;
     String Bin =string.valueOf(Math.Mod(Num1,2));
     Quotient = Num1 / 2 ;

    while (Quotient>0)
   {

    String Remainder = String.valueOf(Math.Mod(Quotient,2));
    Quotient = Quotient /2 ;

    Bin = Remainder + Bin;
   }
     System.debug(Bin);
 }
    
    
  
  
}