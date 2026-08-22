public class SampleManagementController 
{
    @AuraEnabled
    public static String createSampleData(String SampleRec)
    {
       try
       {
        if(SampleRec != null)
        {
             Sample_Data__c sampleObj  = (Sample_Data__c)JSON.Deserialize(SampleRec,Sample_Data__c.class);
            upsert sampleObj;
            system.debug('sampleObj=> '+ sampleObj);
            if(sampleObj.Id != null)
            {
                return JSON.serialize(sampleObj);
            }
            else
            {
                return 'Sample Record failed to insert..';
            }
            
        }
        else
        {
            return 'Sample Recprd was null as parameter..';
        }
       
       }
       catch(exception ex)
       {
           system.debug(ex.getMessage());
           return JSON.serialize(ex.getMessage());
       }
        
    }

    @AuraEnabled(cacheable=true)
    public static String getQualityPicklistOptions()
    {
        Set<optionWrap> qualityOptions = New Set<optionWrap>();
       

        for(Sample_Data__c sampleData : [SELECT Id, Quality__c FROM Sample_data__c ])
        {
            optionWrap option = New optionWrap();
            option.label = sampleData.Quality__c;
            option.value = sampleData.Quality__c;
            qualityOptions.add(option);
        }
        if(qualityOptions.size() > 0)
        {
            return JSON.serialize(qualityOptions);
        }
        else
        {
            return '';
        }
    }

    @AuraEnabled
    public static String getDesignAndShadeOptions(String quality)
    {
        if(quality != '')
        {
            String qry = 'SELECT Id, Quality__c,Design__c,Shade__c FROM Sample_data__c  WHERE Quality__c like ' + '\'%'+ quality + '%\'';
            
            List<Sample_Data__c> sampleDataList = Database.query(qry);
            if(! sampleDataList.isEmpty())
            {
                DesignAndShadeWrapper designsAndShadesWrap = New DesignAndShadeWrapper();
                designsAndShadesWrap.quality = quality;
                for(Sample_Data__c data : sampleDataList)
                {
                    optionWrap designoption = New optionWrap();
                    designoption.label = data.Design__c;
                    designoption.value = data.Design__c;
                   
                    designsAndShadesWrap.designOptions.add(designoption);

                    optionWrap shadeoption = New optionWrap();
                    shadeoption.label = data.shade__c;  
                    shadeoption.value = data.shade__c;  
                    designsAndShadesWrap.shadeOptions.add(shadeoption);
                }   
                
                if(designsAndShadesWrap != null)
                {
                    return JSON.serialize(designsAndShadesWrap);
                }
                else
                {
                    return 'NO DESIGN OR SHADE OPTIONS AVAILABLE FOR THIS QUALITY!';
                }
            }
            else
            {
                return 'NO DESIGN OR SHADE OPTIONS AVAILABLE FOR THIS QUALITY!';
            }
           
        }
        else
        {
            return 'Please select a Quality!';
        }
    
    }


    @AuraEnabled
    PUblic Static String getSampleDataRecord(String quality, String design, String shade)
    {
        system.debug('quality=> '+ quality + ' design=> '+ design + ' shade=> '+shade);
        if(quality !='' && design != '' && shade != '' )
        {
            try
            {
                Sample_Data__c sampleData = [SELECT Id, Design__c, Quality__c, Shade__c, GSM__c, Quantity__c, Rate__c 
                                                    FROM Sample_Data__c WHERE Quality__c =: quality AND Design__c=: design AND Shade__c =: shade LIMIT 1];
                if( sampleData != null)
                {
                    return JSON.Serialize(sampleData);
                }
                else
                {
                    return 'NO SAMPLE DATA FOUND!';
                }
            
            }
            catch(exception ex)
            {
                return 'Error while fetchiing sample data..' + ex.getMessage();
            }
                                                  
        }
        else
        {
            return 'Please Enter Values for All of Quality, Design and Shade.';
        }
    }

    @AuraEnabled
    Public Static String createSampleEnquiryRecord(String sampleEnquiryRec)
    {
        if(sampleEnquiryRec != null)
        {
            Sample_Enquiry__c sampleEnqRec = (Sample_Enquiry__c)JSON.deserialize(sampleEnquiryRec,Sample_Enquiry__c.class);
            upsert sampleEnqRec;

            if(sampleEnqRec.Id != '')
            {
                return JSON.serialize(sampleEnqRec);
            }else
            {
                return 'Sample Enquiry creation failed!';
            }

        }else
        {
            return 'Sample Enquiry entered is blank!';
        }
    }   

    Public Class DesignAndShadeWrapper
    {
        String quality;
        Set<optionWrap> designOptions;
        Set<optionWrap> shadeOptions;
        public DesignAndShadeWrapper()
        {
            designOptions = New Set<optionWrap>();
            shadeOptions = New Set<optionWrap>();
        }
    }
    

    Public class optionWrap 
    {
        String label;
        String value;
    }
}