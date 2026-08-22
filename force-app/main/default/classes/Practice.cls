public class Practice 
{
    public class MyIterable implements Iterable<String> {
       public Iterator<String> iterator() {
          return new Set<String>{'Hello', 'World!'}.iterator();
       }
    }
}