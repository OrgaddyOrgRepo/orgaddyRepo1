public class SharePointAccessToken {
//https://www.bing.com/videos/riverview/relatedvideo?q=hpw+tp+get+auth+token+of+sharepoint+from+salesforce&mid=345AC52CF5ECD7D4754A345AC52CF5ECD7D4754A&FORM=VIRE
    
    public static String getSharePointAccessToken()
    {
        http https = new http();
        httprequest request = New HttpRequest();
        request.setEndpoint('https://accounts.accesscontrol.windows.net/6016d5cc-0739-434b-b415-0237dad2195b/tokens/oAuth/2');
    	request.setMethod('GET');
        
        String requestBody = 'grant_type=client_credentials';
        requestBody += '&client_id=b4702cf1-c458-44c4-9c45-724dbce43d7a@6016d5cc-0739-434b-b415-0237dad2195b';
        requestBody += '&client_secret=lfaQ3Z0ho9mNsnL3bGH/fU4oHOjlfHf4gIRypDBP2xM=';
        requestBody += '&resource=00000003-0000-0ff1-ce00-000000000000/cloud011292.sharepoint.com@6016d5cc-0739-434b-b415-0237dad2195b';
        
        request.setBody(requestBody);
		
        httpResponse response = https.send(request);
        
        system.debug('status code=> '+response.getStatusCode());
        system.debug('body==> '+ response.getBody());
        wrapResponse wrap = (wrapResponse)JSON.deserialize(response.getBody(),wrapResponse.class);
      system.debug('wrap==>'+wrap);
        return wrap.access_token;
    }
      //token_type":"Bearer","expires_in":"86399","not_before":"1716543451","expires_on":"1716630151","resource":"00000003-0000-0ff1-ce00-000000000000/cloud011292.sharepoint.com@6016d5cc-0739-434b-b415-0237dad2195b","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAw
        Class wrapResponse
        {
            public String 	access_token = '';
            public String   token_type = '';
            public String   expires_in = '';
            public String   not_before = '';
            public String   expires_on = '';
            public String   resource = '';
        }
}