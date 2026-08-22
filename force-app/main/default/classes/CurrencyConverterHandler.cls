public class CurrencyConverterHandler 
{
    Public Static string convertedVal = 'Number';
    @AuraEnabled
    public Static String convert(Decimal num)
    {

        return JSON.Serialize(num/80);
    }
}