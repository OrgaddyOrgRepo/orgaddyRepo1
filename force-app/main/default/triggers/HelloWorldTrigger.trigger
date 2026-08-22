trigger HelloWorldTrigger on Book__c (before insert) {

    if(trigger.isBefore && trigger.isInsert)
    {
        Book__c[] books = Trigger.new;
		MyHelloWorld.applyDiscount(books);
    }

    
}