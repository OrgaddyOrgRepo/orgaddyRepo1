({
	ShowTable : function(component, event, helper) 
    {  
      component.set("v.flag",true);
        // Calling the Apex Function
		var action = component.get("c.RetrieveContact");
       
    
        //  SetCallBack-- Putting the retrieved data in Component variable
        action.setCallback(this,function(response)
                           {
                           var result = response.getReturnValue();
                           var evt = $A.get("e.c:LE_0909_ReceiveContacts");     
            			   evt.setParams({"contactList":result});
        				   evt.fire();
                           });
        
        $A.enqueueAction(action);
         
	}
    
 
})