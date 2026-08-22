import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import jsPDFResource from '@salesforce/resourceUrl/jspdf';
import getContacts from '@salesforce/apex/ContactControllerForPdf.getContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'phone' },
];

export default class ContactTableWithModal extends LightningElement {

contactData;
    columns = COLUMNS;
    isModalOpen = false;

    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contactData = data;
        } else if (error) {
            console.error(error);
        }
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    async downloadPdf() {
        const jsPDF = await loadScript(this, jsPDFResource);
        const doc = new jsPDF.default('p', 'pt', 'letter');

        const rows = [];
        this.contactData.forEach((contact) => {
            const row = [
                contact.FirstName,
                contact.LastName,
                contact.MobilePhone,
            ];
            rows.push(row);
        });

        doc.autoTable({
            head: [['First Name', 'Last Name', 'Mobile Phone']],
            body: rows,
            startY: 60,
        });

        doc.save('Contacts.pdf');
        this.closeModal();

        // Show success toast after download
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'PDF downloaded successfully!',
                variant: 'success',
            })
        );
    }

    download()
    {
        const tableContent = this.template.querySelector("div[class='pdf']");
        tableContent.contentWindow.downloadPdf();
    }
}