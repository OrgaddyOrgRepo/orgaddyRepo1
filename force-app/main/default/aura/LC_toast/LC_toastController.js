({
	showit : function(component, event, helper) {
		
        var recId = component.get("v.recordId");
        component.set("v.recordChiId",recId);
        var toastEvent1 = $A.get("e.force:showToast");
        toastEvent1.setParams({
            title : 'This is ' + recId   ,//'Successful',
            message: 'This toast will show Id.',
            duration:'3000',
            key: 'info_alt',
            type: 'success',
            mode: 'dissmissible'
        });
      //  alert('first give me ok..then only i will fire');
        toastEvent1.fire();
          var toastEvent2 = $A.get("e.force:showToast");
        toastEvent2.setParams({
            title : 'Successful',
            message: 'This is an information message.',
            duration:'6000',
            key: 'info_alt',
            type: 'warning',
            mode: 'dissmissible'
        });
      //  alert('first give me ok..then only i will fire');
        toastEvent2.fire();
          var toastEvent3 = $A.get("e.force:showToast");
        toastEvent3.setParams({
            title : 'Successful',
            message: 'This is an information message.',
            duration:'9000',
            key: 'info_alt',
            type: 'error',
            mode: 'dissmissible'
        });
      //  alert('first give me ok..then only i will fire');
        toastEvent3.fire();
        component.set("v.flag",true);
        setTimeout(()=>{component.set("v.flag",false);
                       },6000) ;
                        
      
  }
  
   
})