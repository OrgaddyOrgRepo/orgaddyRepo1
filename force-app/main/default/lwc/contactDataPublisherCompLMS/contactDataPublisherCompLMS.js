import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import orderStatusHistoryChannel  from '@salesforce/messageChannel/orderStatusHistoryChannel__c';
export default class ContactDataPublisherCompLMS extends LightningElement {


    @wire(MessageContext)
    messageContext;

    handleImport() {
        const orderHistory = [
            { status: 'PAYMENT_SUCCESSFUL', date: '2025-01-23T12:21:10' },
            { status: 'ORDER_ALLOCATED', date: '2025-01-23T12:22:06' }
        ];

        publish(this.messageContext, orderStatusHistoryChannel, {
            contactData: orderHistory
        });
    }
}