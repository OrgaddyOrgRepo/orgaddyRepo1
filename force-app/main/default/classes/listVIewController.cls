public with sharing class listVIewController {

    @AuraEnabled(cacheable=true)
    public static list<listView> fetchListView(string objectApiName){
        list<listView> lstListView = [SELECT Id, Name, DeveloperName, SobjectType FROM ListView
                                      WHERE sobjectType =: objectApiName ORDER by DeveloperName Asc];
    return lstListView;
    }
   
   @AuraEnabled(cacheable = true)
    public static List<sObject> getListviewRecords(String listviewId, string objectApiName){
        system.debug('SessionId'+ UserInfo.getSessionId());
        HttpRequest req = new HttpRequest();
		String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
		String endPoinURL = baseUrl+'/services/data/v52.0/sobjects/' + objectApiName + '/listviews/'+listviewId+'/describe';
		string sessionId = getSessionIdForLWC();
		req.setEndpoint(endPoinURL);
		req.setMethod('GET');
		req.setHeader('Authorization', 'Bearer ' +UserInfo.getSessionId());
        
		Http http = new Http();
		HTTPResponse res = http.send(req);
        
      

        Map<String, Object> tokenResponse = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        system.debug(tokenResponse);
         String query = (String) tokenResponse.get('query');
         system.debug('Query===> '+ query);
    	List<sObject> sobjectList = new List<sObject>();
		for(sObject obj : database.query(query)){
            sobjectList.add(obj);
		}
    	return sobjectList;

	}
    
     public static string getSessionIdForLWC(){
        pageReference pr = Page.vf_sessionId;
        string content = pr.getContent().toString();
        integer startp = content.indexOf('Start_Of_Session_id') + 'Start_Of_Session_id'.length();
        integer endP = content.indexOf('End_Of_Session_Id');
        string sessionId = content.substring(startp,endP);
        return sessionId;
     }

     public class MockResponse{
        public String Id;
        public String Name;
      }
    }