/* Using Trigger Frmaework*/


trigger AccountTutorialTrigger on Account (before insert,
                                            before update,
                                            before delete,
                                            after insert,
                                            after update,
                                            after delete,
                                            after undelete)

{
   new accountTriggerHandler().run();
}