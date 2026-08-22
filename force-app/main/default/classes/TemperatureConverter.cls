public class TemperatureConverter 
{	
    decimal fh;
	public static decimal FahrenheitToCelsius(decimal fh)
    {
        decimal cs = (fh-32)*5/9.0;
        return cs.setScale(2);
    }
}