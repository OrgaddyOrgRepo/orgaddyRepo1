public with sharing class AccordionController {
    
    public List < Account > listAccounts {get;set;}
    public String[] choices { get; set; }
    
    public AccordionController() {
        listAccounts =  New List<Account>();
        account[] acc = [ SELECT Id, Name, Industry, ( SELECT Id, FirstName, LastName, Email FROM Contacts ) FROM Account ORDER BY Name  ];
        for(account A : acc)
        {
            if(A.contacts.size() != 0)
            {
                listAccounts.add(A);
            }
        }
    }

        public List<SelectOption> getPriority()
    {
       List<SelectOption> options = new List<SelectOption>();
       Schema.DescribeFieldResult fieldResult = Case.Priority.getDescribe();
       List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
       for( Schema.PicklistEntry f : ple)
       {
               options.add(new SelectOption(f.getLabel(), f.getValue()));
       }     
       return options;
    }
  
    
}