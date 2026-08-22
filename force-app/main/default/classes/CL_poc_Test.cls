@isTest
public with sharing class CL_poc_Test {
    
    
    public static testMethod void  getContactsTest(){
     contact[] conLIst = New List<contact>() ;  
    for(integer i=0; i<= 90 ; i++ ){
     Contact c = new Contact();
     c.firstName = 'ConFirstName '+i;

     c.lastName = 'ConLastName' +i;
     c.Phone = '1234567890';
     
     c.Email = 'myEmail'+i+'@guMail.invalid'; 
     conList.add(c);
    }

    insert conList;

    Test.startTest();
    LIst<Contact> conListData = CL_poc.getContacts();
    system.debug(conListData.size());
    system.assertEquals(10, conListData.size());
    
    Test.stopTest();
}
}