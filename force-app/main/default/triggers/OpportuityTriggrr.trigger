trigger OpportuityTriggrr on Opportunity (after insert, after delete, after undelete) 
{
    
    New FSL_OpportunityTriggerHandler().run();
    
}