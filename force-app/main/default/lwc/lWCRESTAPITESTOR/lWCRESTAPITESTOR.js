import { LightningElement, track } from 'lwc';
import testApiCall from '@salesforce/apex/ApiTestController.testApiCall';

export default class LWCRESTAPITESTOR extends LightningElement {
  @track method = 'GET';
  @track url = '';
  @track headers = '{}';
  @track body = '{}';
  @track responseBody = '';
  @track response;

  handleMethodChange(event) {
    this.method = event.target.value;
  }
  handleUrlChange(event) {
    this.url = event.target.value;
  }
  handleHeadersChange(event) {
    this.headers = event.target.value;
  }
  handleBodyChange(event) {
    this.body = event.target.value;
  }

  async sendRequest() {
    try {
      const headersMap = JSON.parse(this.headers);
      const result = await testApiCall({
        method: this.method,
        url: this.url,
        headers: headersMap,
        body: this.body
      });

      // Pretty-print response
      this.response = JSON.stringify(JSON.parse(result), null, 2);
        this.responseBody = JSON.parse(result).body;
    } catch (error) {
      this.responseBody = `Error: ${error.body ? error.body.message : error.message}`;
       
    }
  }
}

// // File: lwc/apiTester/apiTester.js
// import { LightningElement, track } from 'lwc';
// import testApiCall from '@salesforce/apex/ApiTestController.testApiCall';
// export default class LWCRESTAPITESTOR extends LightningElement {

//     @track method = 'GET';
//   @track url = '';
//   @track headers = '{}';
//   @track body = '{}';
//   @track response;

//   methodOptions = [
//     { label: 'GET', value: 'GET' },
//     { label: 'POST', value: 'POST' },
//     { label: 'PUT', value: 'PUT' },
//     { label: 'DELETE', value: 'DELETE' }
//   ];

//   handleMethodChange(event) {
//     this.method = event.detail.value;
//   }
//   handleUrlChange(event) {
//     this.url = event.detail.value;
//   }
//   handleHeadersChange(event) {
//     this.headers = event.detail.value;
//   }
//   handleBodyChange(event) {
//     this.body = event.detail.value;
//   }

//   async sendRequest() {
//     try {
//       const headersMap = JSON.parse(this.headers);
//       const result = await testApiCall({
//         method: this.method,
//         url: this.url,
//         headers: headersMap,
//         body: this.body
//       });
//       this.response = result;
//     } catch (error) {
//       this.response = `Error: ${error.message}`;
//     }
//   }

// }