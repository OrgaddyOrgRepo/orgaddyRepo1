import { LightningElement,wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import orderStatusHistoryChannel  from '@salesforce/messageChannel/orderStatusHistoryChannel__c';
export default class ContactDataSubscriberCompLMS extends LightningElement {

    @wire(MessageContext)
    messageContext;

    subscription = undefined;
    contactData;

    connectedCallback() {
        this.subscribeToMessage();
    }

    subscribeToMessage() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                orderStatusHistoryChannel,
                (message) => {
                    this.contactData = message.contactData;
                }
            );
        }
    }

}