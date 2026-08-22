({
	Fire_C13 : function(component, event, helper)
    {
		//Bring The Event
		var Evt = component.getEvent("Bullet_C13");
        //Fire The Event
        Evt.fire();
        alert('The Event has been successfully fired');
        
       
	},
    PingMe : function(component,event,helper)
    {
        // Reaction after receiving The Event
        alert('From C13 : I recieved the Event of my Component Here....!!! :-D ...');
    }
})