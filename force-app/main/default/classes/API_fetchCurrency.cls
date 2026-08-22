public class API_fetchCurrency 
{
    public static string getDollar(List<String> currencylist)
    {
        http htp = New http();
        httprequest req=new httprequest();
        req.setMethod('GET');
        req.setEndpoint('https://api.freecurrencyapi.com/v1/latest');
        req.setHeader('apikey','fca_live_I8FolOQzLSz6QqCkM7qNHlv4qqncFbdgzMQlnLfl');
        req.setHeader('currencies',JSON.Serialize(currencylist) != null? JSON.serialize(currencyList):'[]');
        httpResponse res = htp.send(req);
        RETURN res.getBody();
     }
 
}