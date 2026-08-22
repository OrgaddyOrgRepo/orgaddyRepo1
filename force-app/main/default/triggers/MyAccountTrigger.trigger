trigger MyAccountTrigger on Account (before insert,after insert) 
{
   for(Account a : Trigger.New)
   {
       if(a.Name == 'Bikaram' || a.billingCity=='Hyderabad')
       {
           a.addError('You cannot insert this Account with name '+ a.Name + ' OR billing City '+a.billingCity);
       }
       else
       {
           //Send Email To the Account Customer
           //Just use the CL_2902_SingleEmailMessage class to pass the Address and Send Email
         CL_2902_SimgleEmailMessage.SendEmail('adi.92sfdc2@gmail.com');
           
       }   
           
          
       
   }

}