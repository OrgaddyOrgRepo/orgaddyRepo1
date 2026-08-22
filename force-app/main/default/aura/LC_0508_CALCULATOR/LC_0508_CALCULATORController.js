({   
    

	calc : function(component, event, helper) 
    {  
        // Getting The Values From Component TO Controller
        var AA = component.get("v.num1"); //String
        var BB = component.get("v.num2"); // String
        var CC = component.get("v.num3");  // String
        
      
        // Parsing the inputs String to Integer
   
        var N1 = parseFloat(AA);
        var N2 = parseFloat(BB);
        var N3 = parseFloat(CC);
        
        // Logic to Calculate
        
        if(N1 > N2 && N1 > N3)
        {
            component.set("v.result",N1);
        }
        else if(N2 > N1 && N2 > N3)
        {
            component.set("v.result",N2);
            
        }
         else
           {
                component.set("v.result",N3);
           }
	}
    
})