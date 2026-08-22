import { LightningElement } from 'lwc';
export default class LearnJSComp extends LightningElement {
  logs = [];
  

    handleClick(event) {

        const targetValue =
            event.target.dataset.childValue;

        const currentTargetValue =
            event.currentTarget.dataset.parentValue;

        // this.showLog(`Target value: ${targetValue}`);
        // this.showLog(
        //     `CurrentTarget value: ${currentTargetValue}`
        // );
        this.showLog(
            `parent value from target click: ${event.target.dataset.parentValue}`
        );
        this.showLog(
            `child value from target click: ${event.target.dataset.childValue}`
        );
        
        this.showLog(
            `parent value from currentTarget click: ${event.currentTarget.dataset.childValue}`
        );
        this.showLog(
            `parent value from currentTarget click: ${event.currentTarget.dataset.parentValue}`
        );
        
    }

    showLog(message) {
        this.log =[];
        this.logs = [
            ...this.logs,
            {
                id: Date.now() + Math.random(),
                message: message
            }
        ];
    }


childHandler(event)
{
    this.showLog(`child tag clicked... `)
    this.showLog(`target label=> ${event.target.dataset.label}`);
    this.showLog(`currentTarget==> ${event.currentTarget.dataset.label}`);
}

parentHandler(event)
{
     this.showLog(`target 1---> ${event.target.dataset.label}`)
    this.showLog(`currentTarget 1=> ${event.currentTarget.dataset.label}`)
    this.showLog(`1 now  parent handler has run automatically..${event.currentTarget.dataset.label}`)
}
grandParentHandler(event)
{
    this.showLog(`target 1---> ${event.target.dataset.label}`)
    this.showLog(`currentTarget 2=> ${event.currentTarget.dataset.label}`)

    this.showLog(`2 now grand parent handler has run automatically..${event.currentTarget.dataset.label}`)
}


// toggleCompHandler(event)
// {
//     const clickComponent = event.target.dataset.id;
//     this.template.querySelector(`[data-id=${clickComponent}]`)
// }
toggleCompHandler(event) {
    const clickedComponent =
        event.currentTarget.dataset.target;

    const componentToToggle =
        this.template.querySelector(
            `[data-id="${clickedComponent}"]`
        );

    if (!componentToToggle) {
        return;
    }

    const isHidden =
        componentToToggle.classList.contains(
            'slds-hide'
        );

    if (isHidden) {
        componentToToggle.classList.remove(
            'slds-hide'
        );

        componentToToggle.classList.add(
            'slds-show'
        );
    } else {
        componentToToggle.classList.remove(
            'slds-show'
        );

        componentToToggle.classList.add(
            'slds-hide'
        );
    }
}


}