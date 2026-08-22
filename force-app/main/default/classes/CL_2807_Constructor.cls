public class CL_2807_Constructor 
{
	//the Calss Variables
	Integer L; 
	Integer B;
    
    public CL_2807_Constructor(Integer X, Integer Y)   // TO pass the Class Variable
    {
         L = X;
         B= Y;
        
    }
   public void main()
   {
      
	   Area();
   }
     void Area()
    {
        Integer Area = L * B ; 
        System.debug('The area is : '+Area );
        
    }
    
}