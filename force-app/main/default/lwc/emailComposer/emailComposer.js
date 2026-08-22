import { LightningElement, wire } from 'lwc';
import getValidFromAddresses from '@salesforce/apex/EmailComposerController.getValidFromAddresses';
import sendEmail from '@salesforce/apex/EmailComposerController.sendEmail';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class EmailComposer extends LightningElement {
    fromAddressOptions = [];
    selectedFromAddress = '';
    toAddress = '';
    subject = '';
    body = '';
    showComposeEmailSection = false;

    @wire(getValidFromAddresses)
    wiredFromAddresses({ error, data }) {
        if (data) {
            console.log('data==> '+ data);
            this.fromAddressOptions = data.map(email => ({
                label: email,
                value: email
            }));
            this.selectedFromAddress = this.fromAddressOptions.length > 0 ? this.fromAddressOptions[0].value : '';
        } else if (error) {
            console.error('Error fetching from addresses: ', error);
        }
    }

    handleCancelEmailCompose()
    {
        this.showComposeEmailSection = false;
    }
    handleComposeEmail()
    {
        this.showComposeEmailSection = true;
    }

    handleFromChange(event) {
        this.selectedFromAddress = event.detail.value;
    }

    handleToChange(event) {
        this.toAddress = event.target.value;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleBodyChange(event) {
        this.body = event.target.value;
    }

    handleSendEmail() {
        sendEmail({ 
            toAddress: this.toAddress, 
            fromAddress: this.selectedFromAddress, 
            subject: this.subject, 
            body: this.body 
        })
        .then((result) => {
            if(result == 'Success')
            {
                this.showNotification('Success!','Email has been sent successfully...','success');
            }
        })
        .catch(error => {
           // console.error('Error sending email: ', error);
            this.showNotification('Failed!','Could not send email!','error');
        });
    }

    showNotification(titleText,messageText,variant) {
        const evt = new ShowToastEvent({
        title: titleText,
        message: messageText,
        variant: variant,
        });
        this.dispatchEvent(evt);
    }
}