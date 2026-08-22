public virtual class CL_1207_Evaluator Extends CL_1107_CalEvalSum
{
    public void GreaterSmallerMain()
    {
       
        if(Choice=='Greatest')
        {
            TheGreatestNumber();
        }
        else if(Choice=='Smallest')
        {
            TheSmallestNumber();
        }
        
    }
    
    
    
        void TheGreatestNumber()
    {
        if(Num1>Num2 && Num1>Num3)
        {
            Result = Num1;
           
        }
        else if(Num2>Num1 && Num2 > Num3)
        {
            Result = Num2;
           
        }
        else if (Num3 > Num1 && Num3 > Num2)
        {
            Result = Num3;
        }
        else 
        {
            Result = Num1;
        }
         
    }
    
   void TheSmallestNumber()
    {
        if(Num1<Num2 && Num1<Num3)
        {
            Result = Num1;
           
        }
        else if(Num2<Num1 && Num2 < Num3)
        {
            Result = Num2;
           
        }
         else if (Num3 < Num1 && Num3 < Num2)
        {
            Result = Num3;
        }
        else 
        {
            Result = Num1;
        }         
    }
}