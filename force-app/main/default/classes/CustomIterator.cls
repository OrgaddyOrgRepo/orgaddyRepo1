public class CustomIterator
   implements Iterator<Account>{ 
 
   public List<Account> accs = [Select Name From Account limit 5];
      
   public Integer currentIndex;
   
   public CustomIterator(List<Account> accs){
        system.debug(accs);   // Appla Accoutn Display hurraayla
       this.accs = accs;
       this.currentIndex = 4;  // Pahile Zero HOta 
       
   }
 
   public boolean hasNext(){ 
       
    return  currentIndex < accs.size() - 1;  // Shevat cjhya element chi index
   }    
 
   public Account next(){         // Next Method
       if(hasNext()) {             // Here the Hasnext method returns tHe value
           currentIndex++;
          system.debug('Aaala alaa waara');
           system.debug(accs[currentIndex]);
           return accs[currentIndex];  // eLEMENT WIL BE REtURNED
          
       } else {
          
           System.debug('Naai aala na ithhh');
         //  throw new NoSuchElementException();
         currentIndex--;
          return accs[currentIndex];
          
       }
      
   } 
}