/**
* @author Sayali Bhambure
* @date 15/12/2021
* @description This class is a generic utility class for SOQL queries
*/
public class projectQueryUtility {
    /* variable declarations*/
    static final String RECORD_COUNT = '50000';

    /**
    * @author Sayali B
    * @date 15/12/2021
    * @description This method forms and executes dynamic query based on 
    * 				params passed and returns the query result
    * @param objectName : Object to be queried
    * @param fieldNames : List of fields to be queried
    * @param condition : query condition for where clasue
    * @param sortBy : Field to be sorted by
    * @param sortAscending : true if sort order is ascending
    * @param recordCount : number of records to be queried
    * @return queryResult : returns list of sObject
    */
    public static List<sObject> runQuery(String objectName, String[] fieldNames, String condition, 
                                         String sortBy,Boolean sortAscending, String recordCount)
    {
        List<sObject> queryResult = new List<sObject>();
        String queryString;
        String fieldsList = '';
        //default limit 50k if limit is blank
        String limitClause = String.isNotBlank(recordCount) ? recordCount : RECORD_COUNT;
        // Generate the fieldslist from the string array
        if (fieldNames != NULL && fieldNames.size() > 0)
        {            
            for (Integer i=0; i < fieldNames.size(); i++)
            {
                if( i <= (fieldNames.size() - 2))
                    fieldsList = fieldsList+fieldNames[i]+',';
                else
                    fieldsList = fieldsList+fieldNames[i];    
            }
        } 
        // Construct the query string
        if(String.isNotBlank(objectName) && String.isNotBlank(fieldsList)){
            queryString = 'SELECT '+ fieldslist + ' FROM '+ objectName;
        }        
        if(String.isNotBlank(condition)){
        	queryString += ' WHERE ' + condition;
        }
        if(String.isNotBlank(sortBy)){
            queryString += ' ORDER BY ' + sortBy + (sortAscending?' ASC ':' DESC ');
        }        
        if(String.isNotBlank(limitClause)) {
            queryString += ' LIMIT ' + limitClause;
        }
        System.debug('query formed---'+queryString);
        // Run the query
        try{
        	queryResult = Database.query(queryString);
	    }
        catch(QueryException ex){
            System.debug('exception occurred' + ex.getmessage());
    		//insert in error log
    		//CSCErrorLogUtility.createErrorLog(ex,objectName);
    		//return null;
        }        
        return queryResult;               
    }

}