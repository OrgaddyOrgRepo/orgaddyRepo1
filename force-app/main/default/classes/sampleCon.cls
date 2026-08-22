public class sampleCon {
    String[] countries = new String[]{};
	String[] choices = new String[]{};
        
    
    
    public PageReference test() {
        return null;
    }

    public List<SelectOption> getItems() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('US','US'));
        options.add(new SelectOption('CANADA','Canada'));
        options.add(new SelectOption('MEXICO','Mexico'));

        return options;
    }

    public String[] getCountries() {
        return countries;
    }

    public void setCountries(String[] countries) {
        this.countries = countries;
    }
    
    public String[] getchoices() {
        return choices;
    }
    
    public void setChoices(String[] choices)
    {
        this.choices = choices;
    }
    
          public List<SelectOption> getPriorities()
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