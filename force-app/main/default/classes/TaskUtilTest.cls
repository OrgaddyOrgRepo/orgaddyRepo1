@isTest
private class TaskUtilTest {
    @isTest(seeAllData=true)
    static void testTaskPriority() {
        String pri = TaskUtil.getTaskPriority('NY');
        System.assertEquals('Normal', pri);
    }
    
    @isTest(seeAllData=true)
    static void testTaskHighPriority() {
        String pri = TaskUtil.getTaskPriority('CA');
        System.assertEquals('High', pri);
    }
    
    @isTest(seeAllData=true)
    static void testTaskPriorityInvalid() {
        String pri = TaskUtil.getTaskPriority('Montana');
        System.assertEquals(null, pri);
    }
}