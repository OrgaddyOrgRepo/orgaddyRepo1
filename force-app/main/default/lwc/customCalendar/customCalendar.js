import { LightningElement } from 'lwc';
/*First, let’s import the static resource. So write the following code above the class declaration and below the LightningElement import.
*/
import FullCalendarJS from '@salesforce/resourceUrl/Fullcalendar';
/*After static resource import, import loadStyle and loadScript methods from platformResourceLoader
*/

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-resource-loader/documentation
export default class CustomCalendar extends LightningElement {

/*
Now under the class, write the connectedCallback method to import the main.js and main.css files from static resources. The connectedCallback method will look like this.
At first in connectedCallback we have Promise.All this is loading the main style sheet and main js file to provide a Fullcalendar instance to our component which we are later going to use in the initializeCalendar method. As Promise.All returns a promise hence we are writing then and catch after it. Currently, if everything loads fine then we are proceeding to initialize the calendar if not we go to catch block and print the error.

*/

connectedCallback() {
    Promise.all([
        loadStyle(this, FullCalendarJS + '/lib/main.css'),
        loadScript(this, FullCalendarJS + '/lib/main.js')
    ])
    .then(() => {
        this.initializeCalendar();
    })
    .catch(error => console.log(error))
}

/*
Write the initializeCalendar method and create a FullCalendar.Calendar instance. Confusing isn’t most of you will encounter errors here. First copy and paste the initializeCalendar method and if there is any error please reread this article. Maybe you have missed a step or two.
*/ 
initializeCalendar() { 
    const calendarEl = this.template.querySelector('div.fullcalendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {});
    calendar.render();
}
//The syntax to create a calendar instance in LWC is and we have used this in initialize calendar method already
 //calendar = new FullCalendar.Calendar(calendarElement, optionsObject);
/*CalendarElement is the HTML element under which you have to show the calendar(Remember the <div> tag we have created in the HTML file). optionsObject is the calendar options object. Here you can customize the calendar as much as you want. Customization involves showing/not showing calendar header actions, title formatting, and column formatting, to name a few. */
/*After successfully creating the instance of Fullcalendar.Calendar. It is now time to render the calendar in our LWC. For that Fullcalendar provide the render method. We just called the method and that’s it. We are done, just deploy the component by setting the appropriate targetConfig and adding the LWC component to the salesforce page. The custom calendar will look like this in the salesforce org. */
}