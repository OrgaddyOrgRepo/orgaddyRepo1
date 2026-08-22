@RestResource(urlMapping='/v1/Account/*')
global class RestServiceClass {
    
    @httpGet
    global static String deleteAccount()
    {
        RestRequest req = RestContext.request;
        string reqURI = req.requestURI;
        String accId = '\''+reqURI.substringAfterLast('/')+'%\'';
        
        account[] accLIst =[SELECT Name, Id FROM Account Where Name like : accId];
        Return JSON.serializePretty(accLIst);
    }

}