@restResource(urlMapping = '/v1/myrest/*')
global with sharing class RestServiceClass_1
{
    global static string message = 'Hello !!';
    
  /*  @httpGet
    global static string getGreetings()
    {
        RestRequest req = restContext.request;
        string requestUrlString = req.requestURI;
        
        system.debug('url===> '+requestUrlString);
        map<string,string> header = req.headers;
        system.debug('Header ==> '+header);
        system.debug(header.get('Host')+'/services'+requestUrlString);
        return 'Hi, Welcome to the Apex Rest Services.. ';
    }
   */
    @httpGet
    global static string getAccounts()
    {
        restRequest req = restContext.request;
        string reqUri = req.requestURI;
        string searchKey =   reqUri.substringAfterLast('/') + '%';
        system.debug(searchKey);
        Account [] accList = [Select name, Id from Account Where name like: searchKey];
        return JSON.serialize(accList);
    }
   /* 
    @httpPatch
    global static string updateMessage(string name)
    {
        message += ' '+name;
        return message;
    }
*/
    
    @httpDelete
    global static string deleteMessage()
    {
        message = '';
        return message;
    }
    
    @httpPatch
    global Static string getAccounts(string searchname)
    {
        string key =  searchname +'%';
      account[] accLIst = [select id,name,  billingCity from account where name like : key];
        system.debug(accLIst);
        return JSON.serialize(accLIst);
    }
    
}