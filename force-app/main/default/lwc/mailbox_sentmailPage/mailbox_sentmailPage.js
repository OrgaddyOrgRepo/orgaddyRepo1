import { LightningElement,track } from 'lwc';
const columns = [{label:"Email Subject",fieldName:"",type:"text"},
                 {label:"Date And Time",fieldName:"",type:"text"},
                {label:"Sent To Members", fieldName:"",type:"text"}];

export default class Mailbox_sentmailPage extends LightningElement 
{
    columns = columns;
    @track showCreateMailPage = false;
    @track ShowSentMailPage = true;
    
    CreateMail(event)
    {
        this.showCreateMailPage =true;
        this.ShowSentMailPage = false;
    }
    
    
}