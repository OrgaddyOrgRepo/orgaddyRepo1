import { LightningElement, track } from 'lwc';
import uploadFileToSharePoint from '@salesforce/apex/UploadFileToSharepoint.upload';
export default class UploadFileToSharepoint extends LightningElement {
 @track accountId = '';
    @track fileName = '';
    @track fileContent;
    @track file;

    handleAccountNameChange(event) {
        console.log('acc value=>'+event.target.value);
        this.accountId = event.target.value;
    }

    handleFileNameChange(event) {
        console.log('filename=> '+event.target.value);
        this.fileName = event.target.value;
    }

    handleFileChange(event) {
        console.log('file change ran');
        const file = event.target.files[0];
        this.file = file;

        const reader = new FileReader();
        reader.onload = () => {
            this.fileContent = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
    }

    handleUpload() {
        console.log('uploaded');
        if (this.fileName  && this.fileContent) //&& this.accountId
        {
            //const fileNameWithaccountId = `${this.accountId}_${this.fileName}`;
            const fileNameWithaccountId = `${this.fileName}`;
            uploadFileToSharePoint({ fileName: fileNameWithaccountId, accountId: 'acc', base64Data: this.fileContent })
                .then(result => {
                    // Handle success
                    alert(result);
                })
                .catch(error => {
                    // Handle error
                    console.log(' Handle error=>'+JSON.stringify(error.body.message));
                    //alert('Error uploading file: ' + error.body.message);
                });
        } else {
            alert('Please provide all the required details.');
        }
    }
}