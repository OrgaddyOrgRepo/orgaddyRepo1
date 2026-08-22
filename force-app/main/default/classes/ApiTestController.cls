public with sharing class ApiTestController {
    @AuraEnabled
    public static String testApiCall(String method, String url, Map<String, String> headers, String body) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod(method);

        if (headers != null) {
            for (String key : headers.keySet()) {
                req.setHeader(key, headers.get(key));
            }
        }

        if (method == 'POST' || method == 'PUT') {
            req.setBody(body);
        }

        Http http = new Http();
        HttpResponse res = http.send(req);

        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('statusCode', res.getStatusCode());
        responseMap.put('status', res.getStatus());
        responseMap.put('body', res.getBody());
        responseMap.put('headers', res.getHeaderKeys());

        return JSON.serialize(responseMap);  // Returns full JSON string
    }
}





// /**
// * @File Name : ApiTestController.cls
// * @Description :
// * @Author :
// * @Last Modified By :
// * @Last Modified On : June 27, 2025
// * @Modification Log :
// *==============================================================================
// * Ver | Date | Author | Modification
// *==============================================================================
// * 1.0 | June 27, 2025 |   | Initial Version
// **/

// public class ApiTestController {
// 	@AuraEnabled
//     public static String testApiCall(String method, String url, Map<String, String> headers, String body) {
//         HttpRequest req = new HttpRequest();
//         req.setEndpoint(url);
//         req.setMethod(method);

//         if (headers != null) {
//             for (String key : headers.keySet()) {
//                 req.setHeader(key, headers.get(key));
//             }
//         }

//         if (method == 'POST' || method == 'PUT') {
//             req.setBody(body);
//         }

//         Http http = new Http();
//         HttpResponse res = http.send(req);
//         return res.getBody();
//     }
// }