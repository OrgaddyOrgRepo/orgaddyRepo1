@isTest
public class TemperatureConverterTest
{
	@isTest
    static void testWarmTemp()
    {
        decimal celsius =  TemperatureConverter.FahrenheitToCelsius(70);
        System.assertEquals(21.11,celsius);
    }
    @isTest
    static void testFreezingPoint()
    {
        decimal celsius = TemperatureConverter.FahrenheitToCelsius(32);
        System.assertEquals(0,celsius);
    }
    @isTest
    static void testBoilingPoint()
    {
        decimal celsius = TemperatureConverter.FahrenheitToCelsius(212);
        system.assertEquals(100,celsius,'Boiling point temperature is not expected.');
    }
    @isTest
    static void testNegativeTemp()
    {
        decimal celsius = TemperatureConverter.FahrenheitToCelsius(-10);
        system.assertEquals(-23.33, celsius);
    }
}