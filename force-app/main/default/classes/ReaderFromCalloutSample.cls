public class ReaderFromCalloutSample {

  public void getAndParse() {

    // Get the XML document from the external server
    Http http = new Http();
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://docsample.herokuapp.com/xmlSample');
    req.setMethod('GET');
    HttpResponse res = http.send(req);

    // Log the XML content
    System.debug(res.getBody());

    // Generate the HTTP response as an XML stream
    XmlStreamReader reader = res.getXmlStreamReader();

    // Read through the XML
    while(reader.hasNext()) {
      System.debug('Event Type:' + reader.getEventType());
      if (reader.getEventType() == XmlTag.START_ELEMENT) {
        System.debug(reader.getLocalName());
      }
      reader.next();
    }
 
  }
}