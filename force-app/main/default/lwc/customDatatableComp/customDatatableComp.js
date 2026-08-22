import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS=[   
                {label: 'Quality', fieldName: 'Quality'},
                {label: 'Design', fieldName: 'Design'},
                {label: 'Shade', fieldName:  'Shade'},
                {label: 'Color', fieldName: 'Color'},
                {label: 'Column1', fieldName: 'Color'},
                {label: 'Column2', fieldName: 'Color'},
                {label: 'Column3', fieldName: 'Color'},
                {label: 'Column4', fieldName: 'Color'},
                {label: 'Column5', fieldName: 'Color'},
                {label: 'Column6', fieldName: 'Color'}
    ];


export default class CustomDatatableComp extends LightningElement 
{
    showCustom= false;
    columns = COLUMNS;
    
    data = [
                {Quality:'q1',Design:'d1',Shade:'s1',Color:'c1'},
                {Quality:'q2',Design:'d2',Shade:'s2',Color:'c2'},
                {Quality:'q3',Design:'d3',Shade:'s3',Color:'c3'},
                {Quality:'q4',Design:'d4',Shade:'s4',Color:'c4'}

                
            ]  
    connectedCallback() {
        //code
        console.log('connectedcallBack in data table ran...');
    }

    addItemHandler()
    {
        try{ console.log('28');
            console.log('test');
           let  obj2 =  {Quality:'q6',Design:'d6',Shade:'s6',Color:'c2'};
                let index = 0;
                let datalenght = this.data.length;
                for (let i = 0; i < this.data.length; i++) 
                {
                    let myObj = this.data[i];
                    console.log('myObj=> '+ JSON.stringify(myObj))
                    console.log('obj=> '+ JSON.stringify(obj2));
                    if(myObj.Quality !==obj2.Quality ||  myObj.Shade!==obj2.Shade || myObj.Design!==obj2.Design)
                    {
                        
                        console.log('37');
                        index=index+1;
                        console.log('index=> '+ JSON.stringify(index))
                    }
                }
                 console.log('index=> '+ JSON.stringify(index))
                  console.log('datalenght=> '+ JSON.stringify(datalenght))
                
            
                if(index === datalenght)
                {
                    console.log('45');
                    let data = [...this.data,...obj2];
                    this.data=[];
                    this.data = data ;
                  //  this.data.push(obj2);
                    console.log('thisdata=> '+ JSON.stringify(this.data));
                    console.log('48');
                    this.showToast('Item Added!',`The Item ${obj2} has been added successfully`,'success');
                }
                else
                {
                    console.log('53');
                    this.showToast('Failed!',`The Item ${obj2} could not be added..`,'error');
                }
                console.log(JSON.stringify(this.data))
        }
        catch(error){

        }
              
           
                  
    }       
      
      handleClick(event)
      {
          this.showCustom = ! this.showCustom;
      }

showToast(title,message,variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}


}