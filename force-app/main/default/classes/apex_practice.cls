public class apex_practice {

    
    public string name {get{return 'aditya';}
                        set{ this.name = 'myname';}}
    
       public Integer counter {
        get{ 
        	return counter;
        }
        set{
            counter = value;
        }
    }
    
    public void myName()
    {
        system.debug(name);
    }
    
    
}