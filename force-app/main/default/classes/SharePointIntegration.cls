public class SharePointIntegration {
    private static final String TENANT_ID = '6016d5cc-0739-434b-b415-0237dad2195b';
    private static final String CLIENT_ID = 'b4702cf1-c458-44c4-9c45-724dbce43d7a';
    private static final String CLIENT_SECRET = 'lfaQ3Z0ho9mNsnL3bGH/fU4oHOjlfHf4gIRypDBP2xM=';
    private static final String RESOURCE = 'https://cloud011292.sharepoint.com';
    private static final String TOKEN_URL = 'https://login.microsoftonline.com/' + TENANT_ID + '/oauth2/token';

    // Method to get access token
    public static String getAccessToken() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(TOKEN_URL);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');

        String body = 'grant_type=client_credentials' +
                      '&client_id=' + CLIENT_ID +
                      '&client_secret=' + CLIENT_SECRET +
                      '&resource=' + RESOURCE;
        req.setBody(body);

        Http https = new Http();
        HttpResponse res;
        try {
            res = https.send(req);
            if (res.getStatusCode() == 200) {
                // Parse the JSON response to get the access token
                Map<String, Object> resMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                return (String) resMap.get('access_token');
            } else {
                System.debug('Error getting access token: ' + res.getBody());
                return null;
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            return null;
        }
    }

  /*// Method to make a SharePoint REST API call
    public static String getSharePointData() {
        String accessToken = getAccessToken();
        system.debug('accessToken==>'+accessToken);
        if (accessToken == null) {
            return 'Error: Unable to get access token';
        }

        String apiEndpoint = 'https://cloud011292.sharepoint.com/_api/web';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(apiEndpoint);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('Accept', 'application/json;odata=verbose');

        Http https = new Http();
        HttpResponse res;
        try {
            res = https.send(req);
            if (res.getStatusCode() == 200) {
                return res.getBody();
            } else {
                System.debug('Error calling SharePoint API: ' + res.getBody());
                return null;
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            return null;
        }
    }
*/
    // Method to make a SharePoint REST API call
    public static String getSharePointData() {
        String accessToken = getAccessToken();
        if (accessToken == null) {
            return 'Error: Unable to get access token';
        }

        //String apiEndpoint = 'https://cloud011292.sharepoint.com/_api/web';
        String getRootfolderEndpoint ='https://cloud011292.sharepoint.com/_api/web/GetFolderByServerRelativeUrl(\'Shared%20Documents\')';
        HttpRequest req = new HttpRequest();
        //req.setEndpoint(apiEndpoint);
        req.setEndPoint(getRootfolderEndpoint);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('Accept', 'application/json;odata=verbose');

        System.debug('Authorization Header: Bearer ' + accessToken); // Debug statement

        Http http = new Http();
        HttpResponse res;
        try {
            res = http.send(req);
            System.debug('Response Status: ' + res.getStatusCode()); // Debug statement
            System.debug('Response Body: ' + res.getBody()); // Debug statement
            if (res.getStatusCode() == 200) {
                return res.getBody();
            } else {
                System.debug('Error calling SharePoint API: ' + res.getBody());
                return 'Error: ' + res.getStatusCode() + ' ' + res.getBody();
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            return 'Exception: ' + e.getMessage();
        }
    }
}