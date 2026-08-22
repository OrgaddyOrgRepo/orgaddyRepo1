@RestResource(urlMapping='/IntegrationClass/V1/*')
global class IntegrationClass
{
    // @httpGet
    //  global static String getContacts()
    //  {
    //      RestRequest req = RestContext.request;
    //     String requestUri = req.requestURI;
    //      String  val = requestUri.substringAfterLast('/');
    //      Integer num = (Integer)JSON.deserialize(String.valueOf(val),Integer.class);
    //      Contact[] conList =[SELECT Id,Name FROM Contact LIMIT : num];
    //         return JSON.serialize(conList);
    //  }

    //  @HttpPost
    //  global static String PostContact(String FirstName , String LastName)
    // {
    //     RestRequest req = RestContext.request;
    //     // String requestUri = req.requestURI;
    //     // String recordString = requestUri.substringAfter('/');
    //   //  Contact conRec = (Contact)JSON.deserialize(recordString,Contact.class);
    // Contact conRec = New Contact( FirstName =FirstName , LastName =LastName);
    //     insert conRec;
    //     if(conRec.Id != null || conRec.Id != '')
    //     {
    //           return JSON.serialize(conRec);
    //     }
    //     else
    //     {
    //         return 'Contact creation failed!!';
    //     }
      
    // }
    @HttpPost
    global static String PostAccount(String record) // parmater goes in body of api request 
    {
      System.debug('record=> '+ record);
      Account accRec =(Account)JSON.deserialize(record,Account.Class);
      insert accRec;
      if(accRec.Id != null || accRec.Id != '')
      {
          return JSON.serialize(accRec) ;
      }
      else
      {
          return 'Account Creation Failed...!!';
      }
   // return 'ran..';
     
    }

}