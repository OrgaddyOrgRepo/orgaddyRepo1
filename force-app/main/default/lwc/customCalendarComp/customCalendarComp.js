import { LightningElement,track } from 'lwc';

export default class CustomCalendarComp extends LightningElement {
    year  ;
    month ;
    @track dateList = [];
    // dateList = [];
    dayList = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
    timeWrapper = {

    };
    
    nextMonthDays ;
    previousMonthDays;
    get displayedMonth_Year()
    {
        return `${this.Months.get(this.month)} - ${this.year}`; 
    } 
    Months = new Map([
    [1,"January"], [2,"February"],[3,"March"],[4,"April"],[5,"May"],[6,"June"],
    [7,"July"],[8,"August"],[9,"September"],[10,"October"],[11,"November"],[12,"December"]
    ]);

    get firstDay()
    {
        let dateString = `${this.year}-${this.month}-01`;
        const dayNum = new Date(dateString).getDay();
        return dayNum;
         
    }

    get daysInMonth()
    {
        return new Date(this.year, this.month,0).getDate();
    }
    connectedCallback() {
       // console.log(this.getDaysInMonth(2, 2024));
        const todayDate = new Date();
        console.log('today===> '+todayDate);
        this.month = todayDate.getMonth() +1; // due zero based indexing
        this.year = todayDate.getFullYear();
        console.log('month=> '+this.month + '  year==> '+this.year);
        const noOfDaysInMonth = this.getDaysInMonth(this.month,this.year);
        console.log('noofdays in month===> '+ noOfDaysInMonth);
       // const firstDay= this.getFirstDayOfTheMonth(this.year,this.month);
        this.setCalendarMonth(this.firstDay,this.daysInMonth);
    }
    setCalendarMonth(firstDay,noOfDaysInMonth)
    {
         this.dateList = [];
        const lastMonthDays =  this.getDaysInMonth(this.month -1,this.year)
        if(firstDay != 0)
        {   
            console.log('set calendar days if block NOT ZERO')
            let backLoopCompleted = false;
            // fetching previous dates to show in current month
            for(let k = lastMonthDays-(firstDay-1) ; k <= lastMonthDays ; k++ )
            {
               
                this.dateList.push(k);
                if(k == lastMonthDays)
                {
                    console.log(`set calendar days if block --- ${lastMonthDays}`)
                    backLoopCompleted = true;
                    break;
                }
                console.log(`set calendar days if block --- ${this.dateList}`)
            }
            console.log(`set calendar days previous month dates --- ${this.dateList}`)
            if(backLoopCompleted == true)
            {
                for(let j=1 ; j <= noOfDaysInMonth ; j++)
                {
                    this.dateList.push(j);
                }
            }
             // Fetching eary days of next month to display in current month
              

            // if(this.Months.get(this.month) == "December" || this.Months.get(this.month) == "January")
            // {
            //      this.nextMonthDays = this.Months.get(this.month) == "December" ?  this.getDaysInMonth(this.month -11 ,this.year + 1) : this.getDaysInMonth(this.month+1 ,this.year);
            //      this.previousMonthDays = this.Months.get(this.month) == "January" ?  this.getDaysInMonth(this.month +11 ,this.year - 1) : this.getDaysInMonth(this.month-1 ,this.year);
            // }
            // else
            // {
            //      this.nextMonthDays =  this.getDaysInMonth(this.month +1 ,this.year);
            //      this.previousMonthDays = this.getDaysInMonth(this.month-1 ,this.year);            
            // }


            if(this.getLastDayOfTheMonth(noOfDaysInMonth,this.month,this.year) != 6)
            {
                const lastDayOfCurrentMonth = this.getLastDayOfTheMonth(noOfDaysInMonth,this.month,this.year);
                for(let k = 1 ; k <= (6 - lastDayOfCurrentMonth); k++)
                {
                    this.dateList.push(k);
                }
            }

        }
        else
        {
            console.log('set calendar days else block')
            console.log(`days in month=> ${noOfDaysInMonth} \n ${this.dateList}`);
            this.dateList = [];
            for(let i= 1 ; i<= noOfDaysInMonth ; i++)
            {
                this.dateList.push(i.toString());
            }
        }
        console.log('set calendar days')
    }   
    handleMonthChange(event)
    {
        
        if(event.target.name == 'previous' && this.Months.get(this.month) != "January")
        {
            console.log('in previous not JANUARY');
            this.month -- ; 
        }
        else if(event.target.name == 'previous')
        {

            console.log('in previous');

            this.year --;
            this.month = 12;
        }
        else if(event.target.name == 'next' && this.Months.get(this.month) != "December")
        {
            console.log('in NEXT not December');
            this.month ++ ;

        }
        else if(event.target.name == 'next')
        {
            console.log('in next');
            this.year ++ ;
            this.month = 1 ;
        }
        this.setCalendarMonth(this.firstDay,this.daysInMonth);
        // console.log('No of Days=> '+ this.getDaysInMonth(this.month,this.year));
        // console.log('month==> '+ this.month);
        // console.log('year==> '+ this.year);
        
        // console.warn('no of days in month==> '+ this.getDaysInMonth(this.month,this.year));
        // let days = this.getDaysInMonth(this.month,this.year);
        // console.warn(typeof this.getDaysInMonth(this.month,this.year));
        // this.dateList = [];
        // console.log('line 62');
        
        // // let dateString = `${this.year}-${this.month}-01`;
        // // const d = new Date(dateString);
        // // console.log('day===> '+d.getDay())
        // this.setDays(this.getDaysInMonth(this.month,this.year));
        // console.log('firstdDay of Month===> '+ this.getFirstDayOfTheMonth(this.year,this.month));
    }

    getDaysInMonth(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   // console.log('getDays in Month');
    return new Date(year, month,0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
    };

    handleYearSelection(event)
    {
        if(event.target.value.length ==4)
        this.year = event.target.value;
    }
    handleMonthSelection(event)
    {
        if(event.target.value != undefined)
        {
            this.Months.get(event.target.value);
        }
    }

    getFirstDayOfTheMonth(year,month)
    {
        let dateString = `${year}-${month}-01`;
        const dayNum = new Date(dateString).getDay();
        return dayNum;
    }

    getLastDayOfTheMonth(lastDay,month,year)
    {
        let dateString = `${year}-${month}-${lastDay}`;
        const dayNum = new Date(dateString).getDay();
        return dayNum;
    }
    // setDays(totalMonthDays)
    // {
    //     console.log(`set days...${totalMonthDays}`);
    //     this.dateList = [];
    //     for(let i=1 ; i <= totalMonthDays; i++)
    //     { console.log(`line 97`)
    //         if(i == 1 )
    //         {
    //             console.log(`line 100`);
    //             let dateString = `${this.year}-${this.month}-0${i}`;
    //             const dayNum = new Date(dateString).getDay();console.log('===> '+dayNum);
    //             if(dayNum != 0)
    //             {
    //                 console.log(`line 105`);
    //                 this.assignPreviousMonthsDates(dayNum);
    //                 this.dateList.push(i);
    //                 console.log(`line 105`);
    //             }
    //             else
    //             {
    //                 console.log(`line 112`);
    //                 this.dateList.push(i);
    //             }
    //             //break;
    //         }
    //         else
    //         {
    //                  this.dateList.push(i);
    //         }
    //     }
    //     console.log('setdays==> '+this.dateList);
    // }

    // assignPreviousMonthsDates(dayNum)
    // {
    //      console.log(`line 126`+ dayNum);
    //     if(this.Months.get(this.month) != "January" )
    //     {console.log('line 128');
    //         const lastMonthDayCount = this.getDaysInMonth(this.year,(this.month - 1));
    //         console.log('lastMonthDayCount==> '+lastMonthDayCount);
    //         for(let k = lastMonthDayCount - (dayNum + 1) ; k <= lastMonthDayCount && k !== 1 ; k++ )
    //         {
    //             this.dateList.push(k);
    //            //break;
    //         }
    //     }
    //     console.log(`this.dateline after previous dates==> `+ this.dateList);
    // }
    // pushToDayWrapper(dayNumber)
    // {
        
    //         console.log('day===> '+d.getDay(d)) ;

    // }

}