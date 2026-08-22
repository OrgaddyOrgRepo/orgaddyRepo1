public with sharing class cl01_CreateRecord {
    
    @auraEnabled
    public static string createRecord(String sObjectName , string recordDetails ) // seraileed (string), deserialized mhanje 'sObject/obejct'
    {
        
        sObject record = (Account) JSON.deserialize(recordDetails, Account.class );
        
       //GENERIC DATATYPE --> OBJECT
        
        insert record; //Account
        
        string successfulRecordId = record.id;

        boolean isSuccess = successfulRecordId.containsIgnoreCase(record.id) ; 

        string successVar = isSuccess ? 'SUCCESS'  : 'Failed' ; // always use ternary when some default value has to be given 
       
       
        id insertedRecId = successVar == 'SUCCESS' ? successfulRecordId : ''; 
        system.debug('insertedRecId======> '+insertedRecId);

        if(insertedRecId == null)
        {
            system.debug('insertedRecId----> '+ insertedRecId);
        }
        if(successVar == 'SUCCESS')
        {
            return  record.id;
        }
        else 
        {
            return 'Record Creation Failed !!!' ; 
        }
        
    }


    // Search Records component

    @AuraEnabled
    public static list<Account> fetchAccounts(string searchKey)// value de nai t nako deu...query nahi faatat
    {
        

        //string query
        string qry = 'SELECT Id, Name , Phone, BillingCity, cc_email__c FROM Account ' ; // all accounts

        if(string.isNotBlank(searchKey))
        qry += 'WHERE Name LIKE ' + '\'' + searchKey + '%\'' ; // LIKE 'Gaurav' --> LIKE 'Gaurav%'

      
        account[] accResult = database.query(qry); // aggregate not allowed
        // string result = '';
        // if(! accResult.isEmpty())
        // {
        //     result =  
        // }
       
        return accResult;
    }


    @AuraEnabled
    public static Account[] getAccounts(){
        try {
                string qry = 'SELECT Name,Phone,BillingCity FROM ACCOUNT';
                return database.query(qry);
            } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    /*

        TERNARY: 
        declare var = condition ? (true--> this value) : (false ---> this value) ;

        integer a = 10 ;
        // if a is greater than 10 then say yes else say NO
        string result = 
    */


 // HOME WORK
 // Create another method without stringify and deserialise 
//same functionality with different way
//CreateRecordCompClone
// Use imperative in apex
}