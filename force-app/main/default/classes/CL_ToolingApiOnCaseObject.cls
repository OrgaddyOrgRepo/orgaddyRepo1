public with sharing class CL_ToolingApiOnCaseObject 
{
    string OBJECT_NAME = 'Case';
    
      
   @AuraEnabled(cacheable=true)
    public static  list<listView> fetchListViews()
    {
        http h = new http();
        HttpRequest req = New HttpRequest();    
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionID());
        req.setHeader('Content-Type', 'application/json');

        string baseUrl = System.URL.getSalesforceBaseUrl().toExternalForm();
        string endPoint = baseUrl + '/services/data/v53.0/sobjects/Case/listviews';//  /services/data/v53.0/tooling/sobjects/EntityDefinition/listviews'; //   ;
        //   /services/data/v53.0/tooling//sobjects/Case/listviews
        
        req.setEndpoint(endPoint);
        req.setMethod('GET');
        //response
        HttpResponse res = h.send(req);
        system.debug(res.getBody());
        //string response = res.getBody();
        List<LIstView> response = (List<LIstView>)JSON.deserialize(res.getBody(),listView.class);

       //List<Object> objtList = (List<Object>)response.get('listviews');
      //  system.debug(objtList);
       
      //   for(Object O : objtList)
      //   {
      //     system.debug(O);
      //     //mapOflistViews.put(O.get(developerName), o.get(label));
        
      //   }
       
      return response;
    }
    
    @AuraEnabled(cacheable=true)
    public static case[] getCases()
    {
        return [SELECT CaseNumber, Priority, Subject, Contact.Name,Account.Name FROM Case];
    }



}