/**
* @File Name : LwcForgeController.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : August 11, 2025
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | August 11, 2025 |   | Initial Version
**/

public with sharing class LwcForgeController {
    private static final String BASE = 'callout:SF_Tooling/services/data/v62.0/tooling/sobjects';

    @AuraEnabled
    public static String createFullLwc(
        String fullName,
        Decimal apiVersion,
        String description,
        Boolean isExposed,
        String htmlSource,
        String jsSource,
        String cssSource,
        List<String> targets // e.g. ['lightning__AppPage','lightning__RecordPage']
    ){
        // 1) Create bundle
        String bundleId = createBundle(fullName, apiVersion, description, isExposed);

        // 2) Create resources
        createResource(bundleId, 'html', htmlSource, fullName + '/' + fullName + '.html');
        createResource(bundleId, 'js',   jsSource,   fullName + '/' + fullName + '.js');
        if (cssSource != null && cssSource.trim().length() > 0) {
            createResource(bundleId, 'css',  cssSource,  fullName + '/' + fullName + '.css');
        }
        // 3) Meta XML
        String metaXml = buildMetaXml(apiVersion, isExposed, targets);
        createResource(bundleId, 'xml',  metaXml,   fullName + '/' + fullName + '.js-meta.xml');

        return bundleId; // you can navigate to the new component in the UI from the LWC after this
    }

    private static String buildMetaXml(Decimal apiVersion, Boolean isExposed, List<String> targets){
    String targetsXml = '';
    if (targets != null && !targets.isEmpty()) {
        String iner = '';
        for (String t : targets) {
            iner += '<target>' + t + '</target>';
        }
        targetsXml = '<targets>' + iner + '</targets>';
    }
    return '<?xml version="1.0" encoding="UTF-8"?>'
        + '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">'
        + '<apiVersion>' + String.valueOf(apiVersion) + '</apiVersion>'
        + '<isExposed>' + (isExposed ? 'true' : 'false') + '</isExposed>'
        + targetsXml
        + '</LightningComponentBundle>';
}

    private static String createBundle(String fullName, Decimal apiVersion, String description, Boolean isExposed){
        Map<String,Object> body = new Map<String,Object>{
            'FullName' => fullName,
            'ApiVersion' => apiVersion,
            'Description' => description,
            'IsExposed' => isExposed
        };
        HttpRequest req = new HttpRequest();
        req.setEndpoint(BASE + '/LightningComponentBundle');
        req.setMethod('POST');
        req.setHeader('Content-Type','application/json');
        req.setBody(JSON.serialize(body));
        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() >= 200 && res.getStatusCode() < 300) {
            Map<String,Object> out = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
            return (String)out.get('id');
        }
        throw new AuraHandledException('Bundle create failed: ' + res.getStatus() + ' ' + res.getBody());
    }

    private static void createResource(String bundleId, String format, String source, String filePath){
        Map<String,Object> body = new Map<String,Object>{
            'LightningComponentBundleId' => bundleId,
            'Format' => format,               // 'html' | 'js' | 'css' | 'xml'
            'Source' => source,
            'FilePath' => filePath            // ensures correct filenames inside the bundle
        };
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://orgaddysolutionspvtltd-dev-ed.lightning.force.com/services/data/v62.0/tooling/sobjects' + '/LightningComponentResource');
        req.setMethod('POST');
        req.setHeader('Content-Type','application/json');
        req.setBody(JSON.serialize(body));
        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() >= 200 && res.getStatusCode() < 300) return;
        throw new AuraHandledException('Resource create failed: ' + res.getStatus() + ' ' + res.getBody());
    }
}