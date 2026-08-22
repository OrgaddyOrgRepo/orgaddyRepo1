import { LightningElement, track } from 'lwc';
import createFullLwc from '@salesforce/apex/LwcForgeController.createFullLwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


/** Very small built-in templates **/
const defaultTemplates = {
    hello: {
        html: `<template>
  <lightning-card title="Hello">
    <div class="slds-p-around_medium">Hello from {name}!</div>
  </lightning-card>
</template>`,
        js: `import { LightningElement } from 'lwc';
export default class __NAME__ extends LightningElement {
  name = '__NAME__';
}
`,
        css: `.slds-card { min-height: 80px; }`
    },
    blank: {
        html: `<template>
  <div class="slds-p-around_small">New component</div>
</template>`,
        js: `import { LightningElement } from 'lwc';
export default class __NAME__ extends LightningElement {}
`,
        css: `/* your styles */`
    }
};

export default class LwcForge extends LightningElement {
    @track name = 'HelloWorld';
    @track apiVersion = 62.0;
    @track description = 'Created via LWC Forge';
    @track isExposed = true;
    @track targets = ['lightning__AppPage'];

    @track htmlSource = defaultTemplates.hello.html.replaceAll('__NAME__', this.name);
    @track jsSource   = defaultTemplates.hello.js.replaceAll('__NAME__', this.name);
    @track cssSource  = defaultTemplates.hello.css;

    @track isSaving = false;
    @track lastCreatedId;
    templateName = 'hello';

    get targetOptions() {
        return [
            { label: 'App Page', value: 'lightning__AppPage' },
            { label: 'Record Page', value: 'lightning__RecordPage' },
            { label: 'Home Page', value: 'lightning__HomePage' },
            { label: 'Utility Bar', value: 'lightning__UtilityBar' },
            { label: 'Tab', value: 'lightning__Tab' },
            { label: 'Flow Screen', value: 'lightning__FlowScreen' },
            { label: 'Record Action', value: 'lightning__RecordAction' }
        ];
    }

    get templateOptions() {
        return [
            { label: 'Hello (basic card)', value: 'hello' },
            { label: 'Blank (starter)', value: 'blank' }
        ];
    }

    get disableSave() {
        return !/^[A-Za-z][A-Za-z0-9_]*$/.test(this.name) || this.isSaving || !this.htmlSource || !this.jsSource;
    }
    get saveLabel() {
        return this.isSaving ? 'Creating…' : 'Create Component';
    }

    // handlers
    handleName = (e) => {
        this.name = (e.target.value || '').trim();
        // keep JS/HTML name in sync if user hasn’t hand-edited heavily
        this.htmlSource = this.htmlSource.replaceAll(/Hello from .*?!/g, `Hello from ${this.name}!`);
        this.jsSource = this.jsSource.replaceAll(/class\s+\w+\s+extends/, `class ${this.name} extends`);
        this.jsSource = this.jsSource.replaceAll(/name\s=\s'[^']*';/g, `name = '${this.name}';`);
        this.jsSource = this.jsSource.replaceAll(/export default class \w+ extends/, `export default class ${this.name} extends`);
    };
    handleApiVersion = (e) => { this.apiVersion = Number(e.target.value); };
    handleDescription = (e) => { this.description = e.target.value; };
    handleExposed = (e) => { this.isExposed = e.target.checked; };
    handleTargets = (e) => { this.targets = e.detail.value || []; };
    handleHtml = (e) => { this.htmlSource = e.target.value; };
    handleJs = (e) => { this.jsSource = e.target.value; };
    handleCss = (e) => { this.cssSource = e.target.value; };

    handleTemplateChange = (e) => { this.templateName = e.detail.value; };
    applyTemplate = () => {
        const t = defaultTemplates[this.templateName] || defaultTemplates.hello;
        this.htmlSource = t.html.replaceAll('__NAME__', this.name);
        this.jsSource = t.js.replaceAll('__NAME__', this.name);
        this.cssSource = t.css;
    };

    async createComponent() {
        this.isSaving = true;
        this.lastCreatedId = null;
        try {
            const id = await createFullLwc({
                fullName: this.name,
                apiVersion: this.apiVersion,
                description: this.description,
                isExposed: this.isExposed,
                htmlSource: this.htmlSource,
                jsSource: this.jsSource,
                cssSource: this.cssSource,
                targets: this.targets
            });
            this.lastCreatedId = id;
            this.toast('Success', `Created ${this.name} (${id}).`, 'success');
        } catch (e) {
            const msg = (e && e.body && e.body.message) ? e.body.message : (e && e.message) ? e.message : 'Unknown error';
            this.toast('Error creating component', msg, 'error');
            // console for full payload
            // eslint-disable-next-line no-console
            console.error(JSON.stringify(e));
        } finally {
            this.isSaving = false;
        }
    }

    toast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}