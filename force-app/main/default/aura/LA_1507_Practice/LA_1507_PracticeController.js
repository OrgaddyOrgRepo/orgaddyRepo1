({
	SubMe : function(component, event, helper) 
    {
        component.set("v.Nam","Sagar");
        component.set("v.City","Mumbai");
        component.set("v.Sal","90000");
        component.set("v.Category","A");
		
	},
    ClearMe : function(component, event, helper)
    {
		component.set("v.Nam","");
        component.set("v.City","");
        component.set("v.Sal","");
        component.set("v.Category","");        
    }
})