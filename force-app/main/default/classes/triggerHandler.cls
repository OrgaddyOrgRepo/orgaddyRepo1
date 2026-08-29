public virtual with sharing class triggerHandler{
    
public void run()
{
    if(Trigger.IsBefore)
    {
        if(Trigger.isInsert)
        {
            beforeInsert();
        }
        if(Trigger.IsUpdate)
        {
            beforeUpdate();
        }
        if(Trigger.IsDelete)
        {
            beforeDelete();
        }
        // if(Trigger.IsUndelete)
        // {
        //     beforeUndelete();
        // }
        //Before Undelete is not supported because? the record 
        //does not exist in database before undelete/restore
    }
    if(Trigger.IsAfter)
    {
        if(Trigger.isInsert)
        {
            afterInsert();
        }
        if(Trigger.IsUpdate)
        {
            afterUpdate();
        }
        If(Trigger.IsDelete)
        {
            afterDelete();
        }
        If(Trigger.IsUndelete)
        {
            afterUndelete();
        }
    }
}


 Protected virtual void beforeInsert(){}
 Protected virtual void beforeUpdate(){}
 Protected virtual void beforeDelete(){}
//Public Protected virtual void beforeUndelete(){}// As the rec does not exist in database before undelete
 Protected virtual void afterInsert(){}
 Protected virtual void afterUpdate(){}
 Protected virtual void afterDelete(){}
 Protected virtual void afterUndelete(){}
    
}