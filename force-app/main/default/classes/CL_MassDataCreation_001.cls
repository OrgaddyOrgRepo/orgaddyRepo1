public class CL_MassDataCreation_001 
{
    Public   string Contact_Data {set;get;}
    Public  String[] Characters = New String[] {'Aditya','Brijesh','Chandrika','Dhanush','Emma','Firangi','Gaurav','Hitachi','Indira','Janak','Katrina','Latika','Mrunalini','Nupur','Ojas','Prakrit','Qadar','Rahul','Shirish','Tania','Umesh','Vivaan','Wasudeo','Xamorin','Yaksha','Zaheer','Zeenat','Nakul','Vibhas','Saurabh','Hrudaya'};
    Public String[] Surnames = New String[]{'Chaudhary','Chandak','Vikrame','Sahasrabudhhe','Vaikunthe','Veerey','Pande','nakate','Simhe','Singh','Paranjape','Pandit','Tudme','Agarwal','Wade','Singatkar','Nagpurkar','Bhnadare','Shelke','Raut','Deshmukuh','Surpam','Kolhe','Shende','Mahurkar','Bhende','Raute','Rodrigue','Stark','Cruise'};
    Public  String[] Numbers = New String[]{'1','2','3','4','5','6','7','8','9','0','2','3','4','5','6','7','8','8','9','0','2','3','4','5','6','8','9','0','2','3','4','5','6','7','8','8','9','0','2','3','4','5','6','0','2','3','4','0','2','3','4','5','6','8','9','0','2','3','4','5','6','5','0','2','3','4','5','0','2','3','4','5','6','8','9','0','2','3','4','5','6','6','8','9','0','2','3','4','5','6','6','7','0','2','3','4','5','6','8','9','0','2','3','4','5','6','8','0','2','3','4','5','6','8','9','0','2','3','4','5','6'};
    Public  String[] Cities = NeW String[]{'Nagpur','Lucknow','Ahmedabad','Hyderabad','Pune','Bengaluru','Bhopal','kolkata','Chennai','Mumbai','Delhi','Nagpur','Lucknow','Ahmedabad','Hyderabad','Pune','Bengaluru','Bhopal','kolkata','Chennai','Mumbai','Delhi','kolkata','Chennai','Mumbai','Delhi'};
        Public String MaayiValue {get;set;} 
     
   Public  void CreateContacts()
    {
     MaayiValue = Contact_Data;
     String FstName;
     String LstName;
     String Descript;
     String MailCity;
     String phne;
     List<Contact> Contacts = New List<Contact>();
     for(integer i=6 ; i<=(Characters.size()-1); i++)
     { 
         
        for(integer k=1 ; k<=1000 ; k++)
        {   
             
             FstName = Characters[i]+k ; 
             
     		 LstName = Surnames[Surnames.size()-i]+k ; 
            if(i!=0)
            {
              i--;  
            } 
            
             Descript = 'Hey This has been added by useing Apex Class' + 'i'+'='+i +' k= '+ k+ 'Class Name : \'CL_MassDataCreation\'' ;
             MailCity = Cities[i];
            for(integer m=i; m<=Numbers.size()-1;m++)
           {
               if(m==0)
               {
                phne = Numbers[m]+Numbers[m+1]+Numbers[m+2]+Numbers[m+3]+Numbers[m+4]+Numbers[m+5]+Numbers[m+6]+Numbers[m+7]+Numbers[m+8]+Numbers[m+9];
                i=+1;
                break;
               }
               else if(m==1)
               {
                    phne = Numbers[0]+Numbers[1]+Numbers[2]+Numbers[3]+Numbers[4]+Numbers[5]+Numbers[6]+Numbers[7]+Numbers[8]+Numbers[1];
                    i=+1;
                    break;
               }
                else if(m==2)
               {
                    phne = Numbers[1]+Numbers[2]+Numbers[3]+Numbers[4]+Numbers[5]+Numbers[5]+Numbers[6]+Numbers[7]+Numbers[8]+Numbers[9];
                   i=+1; 
                   break;
               }
                else if(m==3)
               {
                    phne = Numbers[2]+Numbers[3]+Numbers[4]+Numbers[5]+Numbers[6]+Numbers[7]+Numbers[8]+Numbers[0]+Numbers[1]+Numbers[2];
                    i=+1;
                    break;
               } else if(m==4)
               {
                    phne = Numbers[3]+Numbers[4]+Numbers[5]+Numbers[6]+Numbers[7]+Numbers[8]+Numbers[0]+Numbers[1]+Numbers[2]+Numbers[3];
                    i=+1;
                    break;
               } else if(m==5)
               {
                    phne = Numbers[4]+Numbers[5]+Numbers[6]+Numbers[7]+Numbers[8]+Numbers[0]+Numbers[1]+Numbers[2]+Numbers[3]+Numbers[4];
                    i=+1;
                    break;
               } else if(m==6)
               {
                    phne = Numbers[5]+Numbers[6]+Numbers[7]+Numbers[8]+Numbers[9]+Numbers[0]+Numbers[1]+Numbers[2]+Numbers[3]+Numbers[4];
                    i=+1;
                    break;
               } else if(m==7)
               {
                    phne = Numbers[m]+Numbers[m+1]+Numbers[m+1]+Numbers[m-2]+Numbers[m-3]+Numbers[m+2]+Numbers[m+1]+Numbers[m+2]+Numbers[m-4]+Numbers[m-1];
                    i=+1;
                    break;
               } else if(m==8)
               {
                    phne = Numbers[m]+Numbers[m+1]+Numbers[m-1]+Numbers[m-2]+Numbers[m-3]+Numbers[m-4]+Numbers[m-5]+Numbers[m-6]+Numbers[m-7]+Numbers[m-1];
                    i=+1;
                    break;
               } else
               {
                    phne = Numbers[m-1]+Numbers[m-2]+Numbers[m-3]+Numbers[m-4]+Numbers[m-5]+Numbers[m-6]+Numbers[m-7]+Numbers[m-8]+Numbers[m-7]+Numbers[m];
                    i=+1;
                    break;
               }
              
               
           }
             // Here We  will Create the Contact Object 
               // aND tHAT JSON will be added To a List which will be inserted at last
               //Contact C = New Contact{"FirstName":"FstName","LastName":"","MobilePhone":"","Description":"","MailingCity":""}
          Contact C = New Contact();
               C.FirstName = FstName;
               C.LastName =  LstName;
               C.MobilePhone = Phne;
               C.MailingCity = MailCity;
               C.Description = Descript;
               System.debug(C);
               Contacts.add(C); 
               
            
            //break;
        }
         
       // System.debug(Contacts);
        
        break;
         
     }
        
      //System.debug(Contacts);
      database.insert(Contacts); 
        
    }
    
    
}