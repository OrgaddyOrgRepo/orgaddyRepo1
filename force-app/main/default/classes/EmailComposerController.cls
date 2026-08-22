public with sharing class EmailComposerController {
    @AuraEnabled(cacheable=true)
    public static List<String> getValidFromAddresses() {
        // Get the queues that the current user is a member of
        List<GroupMember> groupMembers = [
            SELECT Group.Name, GroupId FROM GroupMember WHERE UserOrGroupId = :UserInfo.getUserId()
        ];
        system.debug('groupMembers=> '+ groupMembers);
        Set<String> queueNames = new Set<String>();
        for (GroupMember gm : groupMembers) {
            queueNames.add(gm.Group.Name);
        }
        system.debug(queueNames);
        // Get email addresses from custom setting based on the user's queue(s)
        List<QueueEmailSettings__c> queueSettings = [
            SELECT QueueName__c, EmailAddress__c FROM QueueEmailSettings__c WHERE QueueName__c IN :queueNames
        ];
        system.debug('queueSettings=> '+ queueSettings);
        List<String> validEmails = new List<String>();
        for (QueueEmailSettings__c setting : queueSettings) {
            validEmails.add(setting.EmailAddress__c);
        }
        system.debug('validEmails=> '+ validEmails);
        return validEmails;
    }
    
    @AuraEnabled
    public static String sendEmail(String toAddress, String fromAddress, String subject, String body) {
        // Logic to send email using Messaging.SingleEmailMessage
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] {toAddress});
        mail.setSubject(subject);
        mail.setPlainTextBody(body);
        mail.setReplyTo(fromAddress);
        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
		String sendResult ;
		for (Messaging.SendEmailResult result : results) {

			if (result.isSuccess()) { // isSuccess only tell if the eamil has been submit for delivery. Does not mean delivered.
			// Delivery status cannot be checked.
				sendResult = 'Success';
				//System.debug('Email sent successfully.');

			} else {

				
				sendResult = 'Failed';
			}

		}
		return sendResult;
    }
}