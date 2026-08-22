public class UploadFileToSharepoint 
{
	
    @AuraEnabled
    public static String upload(String fileName, String accountId, String base64Data) {
        // Prepare the HTTP request
        HttpRequest req = new HttpRequest();
        //req.setEndpoint('https://cloud011292.sharepoint.com/_api/web/GetFolderByServerRelativeUrl(\'/sites/DocSite/Shared%20Documents/FarmerDocs\')/Files/add(url=\'' + fileName + '\',overwrite=true)');
       // req.setEndpoint('https://cloud011292.sharepoint.com/_api/v2.0/sites/DocSite');
       // req.setEndpoint('https://graph.microsoft.com/v1.0/sites/microsoft.sharepoint.com,b9b0bc03-cbc4-40d2-aba9-2c9dd9821ddf,6a742cee-9216-4db5-8046-13a595684e74/termStore/groups');
       // req.setEndpoint('lists/getbytitle('listname')/items');
        req.setEndpoint('https://cloud011292.sharepoint.com/_api/web/lists');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + SharePointAccessToken.getSharePointAccessToken());
        req.setHeader('Accept', 'application/json;odata=verbose');
        req.setHeader('content-type', 'application/json');
        req.setHeader('content-length', String.valueOf(base64Data.length()));

        // Set the request body with base64 data
        req.setBody(base64Data);

        // Send the HTTP request
        Http https = new Http();
        HttpResponse res = https.send(req);

        // Return the response
        if (res.getStatusCode() == 200 || res.getStatusCode() == 201) {
            system.debug('resbody==> '+ res.getBody());
            return 'File uploaded successfully';
        } else {
            return 'Error uploading file: ' + res.getBody();
        }
    }

    
}