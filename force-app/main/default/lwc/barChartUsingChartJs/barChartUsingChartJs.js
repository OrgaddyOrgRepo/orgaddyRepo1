import {LightningElement, api, track} from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import {loadScript} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class BarChartUsingChartJs extends LightningElement {

    @api loaderVariant = 'base';
 @api chartConfig;

 @track isChartJsInitialized;
 renderedCallback() {
  if (this.isChartJsInitialized) {
   return;
  }
  // load static resources.
  Promise.all([loadScript(this, chartjs)])
   .then(() => {
    this.isChartJsInitialized = true;
    const ctx = this.template.querySelector('canvas.barChart').getContext('2d');
    this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
    this.chart.canvas.parentNode.style.height = 'auto';
    this.chart.canvas.parentNode.style.width = '100%';
   })
   .catch(error => {
    this.dispatchEvent(
     new ShowToastEvent({
      title: 'Error loading ChartJS',
      message: error.message,
      variant: 'error',
     })
    );
   });
 }
/*
In the above code, I have declared two @api attributes in the chart component

loaderVariant - Used to set the loader variant from the parent component.
chartConfig - Used to pass the chart settings and data from the parent component, so that we can reuse this component for different charts.

In the renderedCallback,

I have put the Chartjs source file in the static resource, with the help of platformResourceLoader loaded it in the component.
*/
}