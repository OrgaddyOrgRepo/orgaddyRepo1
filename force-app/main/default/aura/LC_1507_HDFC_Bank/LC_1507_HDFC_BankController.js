({
  
    calc : function(component,event,helper)
    {
      
      let Prin = component.get("v.Amount");
      let DT =  component.get("v.DepositTerm");
      let RT =  component.get("v.Rate");
	  let A = 0;
        
        //Parsing String to Integer
        
        var P = parseInt(Prin); 
		var N = parseInt(DT);
		var R = parseInt(RT);       
        
        //Logic
        
        
           A = P * Math.pow((1+R/100),N);
        
       let IntAccumulated = (A - P);
        component.set("v.IntAccu",IntAccumulated);
        component.set("v.Maturity",A);
      
	},
    
    clear : function(component, event, helper)
    {
        component.set("v.Amount","");
        component.set("v.DepositTerm","");
        component.set("v.Rate","");
        component.set("v.IntAccu","");
        component.set("v.Maturity","");
    }, 
    
    CalculateEmi : function(component,event,helper)
    {
    	var LA = component.get("v.LoanAmount");
    	var LT = component.get("v.Tenure");
    	component.set("v.RoI","10 % per annum");
        
    	
        var P = parseInt(LA);
        var N = parseInt(LT)*12;  // TO convert the NO. OF years to months
        var R = 0.10/12 ; 
        
     var EMI = P*R*((Math.pow((1+R),N))/((Math.pow((1+R),N)-1)));
       var interestpaid = (EMI * N) - P ; 
        
       component.set("v.EMI",EMI);
       component.set("v.InterestPaid",interestpaid);
	},
    
    ClearMe : function(component,event,helper)
    {
        component.set("v.LoanAmount","");
        component.set("v.Tenure","");
        component.set("v.RoI","");
        component.set("v.EMI","");
        component.set("v.InterestPaid","");
    }
    
})