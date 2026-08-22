public class MyIterable implements Iterable<String> {
       public Iterator<String> iterator() {
          return new Set<String>{'Hello', 'there'}.iterator();
       }
    }