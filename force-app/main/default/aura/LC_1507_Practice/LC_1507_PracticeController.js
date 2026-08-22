({
   
	subme : function(component, event, helper) 
    {
        component.set("v.Nam","Sagar");
        component.set("v.City","Mumbai");
        component.set("v.Sal","90000");
        component.set("v.Category","A");
			
	},
    clearme : function(component, event, helper)
    {	var A = component.get("v.num1")	;
     	var AA = parseInt(A);
		component.set("v.Nam","");
        component.set("v.City","");
        component.set("v.Sal","");
        component.set("v.Category","");  
        component.set("v.num1",AA+10);
     	component.set("v.Sent","1500");
    },
    
  
})