public class CL_0000_MathPrograms
{	
    public integer Num {get;set;} 
    public List<Integer>ArrayOut {Get;Set;}
    public List<Integer>EnteredArray {get;set;}
 
  List<Integer>ArrayIN = New List<Integer>(); //The Num will be Inserted in this List
  
    
 /*Public Void Main()
 {
     ReverseTheInputArray();
 }
*/
  public Void enter()
  {
      ArrayIN.add(Num);
     
      Num=null;
      EnteredArray = New List<Integer>(ArrayIN.clone());
      
  }
   
 public void ReverseTheInputArray()
 {
   List<Integer> InputArr = New List<Integer>(ArrayIN.clone());  

   List<Integer> OutputArr = New List<Integer>();    //initialisation
   Integer LastIndex = InputArr.Size()-1; 

   For(integer i=0 ; i<=LastIndex ;i++)
    {
        Integer N =InputArr.get(LastIndex-i); 
        OutputArr.add(N);
    }
    ArrayOut = New List<Integer> (OutputArr.clone());
    EnteredArray = New List<Integer>(ArrayIN.clone()); 
   
 }
    
    
    public void ClearAll()
    {
        EnteredArray = New List<integer>{};
            ArrayOut  = New list<integer>{} ;
    }
    
    
}