public with sharing class ContactController {
  
    @AuraEnabled
    public static List<Contact> getContacts() {
        List<Contact> contactList = [
            SELECT
                Id,
                Name,
                AccountId,
                Account.Name,
                Title,
                Phone,
                Email,
                OwnerId,
                Owner.Name,
                Owner.Email
            FROM CONTACT
            WITH SECURITY_ENFORCED
        ];
        return contactList;
    }

//   JSON OBJECT===>ACCliST=   {AccName: "acc1", AccId:"as9d8a7s9dgauikja",Contacts:[{name:"contact1",MobilePhone="123123123"},{name:"contact2",MobilePhone="123123223"}]}
// STRINGIFY ===> "{\"AccName\": \"acc1\", \"AccId\":"as9d8a7s9dgauikja",Contacts:[{name:"contact1",MobilePhone="123123123"},{name:"contact2",MobilePhone="123123223"}]}"

// AccName ===> String
// AccId  ===> String
// Contacts ===> List<Contact>

    @AuraEnabled
    public static contact getContact(){
        try {
                return [Select Name, Id, MobilePhone FROM Contact limit 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static string getAccount(){
        try {   
                 
            Account Acc = [SELECT Name, Id, Phone FROM Account LIMIT 1];
            List<Contact> conResult = [SELECT Id, FirstName, LastNAme, MobilePhone FROM contact WHERE AccountId =: Acc.Id ];
            accountWrapper accWrap = New accountWrapper();
            
            if(Acc != null && ! conResult.isEmpty())
            {
                

                accWrap.acc = Acc;
                accWrap.conList = conResult;
            }
            
            return JSON.serialize(accWrap);
            
         
     }
     catch(Exception ex)
     {
        system.debug('exception===> '+ex.getMessage());
        return null;
     }
    
    }

    @AuraEnabled
    public static string getAccounts(){


        List<Account> accList = [Select Id, name , (Select Id, FIRSTNAME,lastname FROM Contacts) from Account];
        
        List<accountWrapper> wrapList = New  List<accountWrapper>();

        if(! accList.isEmpty())
        {
            for(Account acc : accList)
            {
                accountWrapper accWrap = new accountWrapper();
                if(! acc.Contacts.isEmpty())
                {
                    accWrap.acc = acc;
                    accWrap.conList = acc.Contacts;
                    wrapList.add(accWrap);
                }
            }
        }
        return JSON.serialize(wrapList);
    }



    public class accountWrapper{
        Account acc ;
        List<Contact> conList;
    }

}