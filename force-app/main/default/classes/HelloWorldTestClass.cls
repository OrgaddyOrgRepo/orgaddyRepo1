@isTest 
private class HelloWorldTestClass {
    static testMethod void validateHelloWorld() {
       Book__c bookrec = new Book__c(Name='Behind the Cloud', Price__c=100);
       System.debug('Price before inserting new book: ' + bookrec.Price__c);
	   Test.startTest();
           // Insert book     
           insert bookrec;
        
           // Retrieve the new book     
           Book__c bookRecord = [SELECT Price__c FROM Book__c WHERE Id =:bookrec.Id];
           System.debug('Price after trigger fired: ' + bookRecord.Price__c);
    
           // Test that the trigger correctly updated the price     
           System.assertEquals(90, bookRecord.Price__c);
       Test.StopTest();
    }
}