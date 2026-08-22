public with sharing class Cl_00_WrapperForWellRoof 
{

    @AuraEnabled(cacheable=true)
    public static List<GuaranteeRoofWrapper> getTheGuaranteeRoofs()
    {
        List<GuaranteeRoofWrapper> GuaRoofWrapList =New List<GuaranteeRoofWrapper>();
        //Now the PARENT 
        List<Guarantee__c> GuaranteeList = [SELECT id,Name,Claimant_Name__c,
                                    (SELECT id,Due_Date__c,Status__c,Year__c,Name FROM WellRoofMaintenances__r)  FROM Guarantee__c];

        
        //Pull one by one Parent Record and Attach Property to them as per our Wrapper Class
        
        for ( Guarantee__c G : GuaranteeList)
        {
            GuaranteeRoofWrapper GR_Wrapper = New GuaranteeRoofWrapper();
            GR_Wrapper.guaranteeRecord = G ;
            GR_Wrapper.WrmList = G.WellRoofMaintenances__r;
            GR_Wrapper.WrmCount = G.WellRoofMaintenances__r.size();  // Doubtful about the Plural

            GuaRoofWrapList.add(GR_Wrapper);
            //hERE THE ENDS THE cREATION OF One Wrapper
            //Each wrapper Will have a Parent Record, its Related Wrm Records and Toal COunt of WRM records...
            //All the Wrappers Have been Listed to be ready To sent to LWC controller.
        }
        Return GuaRoofWrapList;

                                }


    
}