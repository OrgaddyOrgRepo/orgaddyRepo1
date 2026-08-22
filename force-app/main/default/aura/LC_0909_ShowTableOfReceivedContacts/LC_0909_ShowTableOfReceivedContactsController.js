({
   
    TableFormat :function(component, event, helper)
    {  
        
      var action = component.get("c.RetrieveContact");
       
        action.setCallback(this,function(response){
            var result =  response.getReturnValue();
            component.set("v.receivedCon",result);
        });
        $A.enqueueAction(action);
        
        
        
        component.set("v.col",
                      [
            {label:"Name",fieldName:"Name", type:"text"},
            {label:"Mobile",fieldName:"MobilePhone",type:"Phone"},
            {label:"Email",fieldName:"Email", type:"Email"},
            {label:"Account Id", fieldName:"AccountId"}
           
             ]); 
         
    }
})