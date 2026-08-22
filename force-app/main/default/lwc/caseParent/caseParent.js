import {LightningElement,wire} from 'lwc';
    import fetchListView from '@salesforce/apex/listVIewController.fetchListView';
    import getListviewRecords from '@salesforce/apex/listVIewController.getListviewRecords';
    import { getListInfoByName } from 'lightning/uiListsApi';
     let lstLookupFilds = [];
export default class ListViewNewVersion extends LightningElement {
	objectName = 'Accounts'; 
	objectIcon = 'standard:account';
	objectApiName = 'Account';
	defaultListView;
    lstviewCol;
    storeListViewRecords;
    isLoading = true;
	hasRecords = false;
	listViewOptions = [];
	listViewName;
    developerName;

	
/* ######## list of sObjects with icon ######### */
    get sObjectOptions() {
        return [
            { label: 'Accounts', value: 'Account', icon : 'standard:account' },
            { label: 'Contacts', value: 'Contact' , icon : 'standard:contact'},
            { label: 'Opportunities', value: 'Opportunity', icon : 'standard:opportunity' },
			{ label: 'Cases', value: 'Case', icon : 'standard:case' }
			];
    }

/* ####### handle sObject records ####### */
    handleChange(event) {
		this.isLoading = true;
		let value = event.detail.value;
        let sobjectOptions = this.sObjectOptions.find(data => data.value == value);
		this.objectApiName = value;
		this.objectName = sobjectOptions.label;
		this.objectIcon = sobjectOptions.icon;

	}
	
	/* fetch ListView Records based on objectApiName */
	@wire(fetchListView, {objectApiName : '$objectApiName' }) ListView(value) {
		  const {
			data,
			error
		} = value;
		if (data) {
			this.isLoading = true;
			let plistViewOptions = JSON.parse(JSON.stringify(data));


			let lstOption = [];
			for (var i = 0; i < plistViewOptions.length; i++) {
                if( plistViewOptions[i].DeveloperName.toLowerCase().includes('recentlyviewed')){
                    this.defaultListView = plistViewOptions[i].Id;
                    this.listViewName = plistViewOptions[i].Name;
                    this.developerName = plistViewOptions[i].DeveloperName;
                }
				lstOption.push({
					label: plistViewOptions[i].Name,
					value: plistViewOptions[i].Id,
                    developerName : plistViewOptions[i].DeveloperName,
					show_option_icon: false
				});
              
				if (this.defaultListView == plistViewOptions[i].Id) {
					lstOption[i].show_option_icon = true;
				}

			}
			
			this.listViewOptions = lstOption;
			} else if (error) {
			this.isLoading = false;
			console.log('error===> ' + JSON.stringify(error))
			this.listViewOptions = [];
		}
}

  /* fetch listview Columns */
	@wire(getListInfoByName, {
        objectApiName: '$objectApiName',
        listViewApiName: '$developerName' 
    })listInfo({ error, data }) {
        if (data) {
			lstLookupFilds = [];
           var columns = [];
		   var result = data.displayColumns;
		   for(var i=0; i<result.length; i++){
				var fieldApi = result[i].fieldApiName;
				var fieldLabel = result[i].label;

			if( result[i].fieldApiName.includes('.')){
				let splitData =  result[i].fieldApiName.split('.');
				var lookupApi = '';
				for(var j=0; j<splitData.length; j++){
					lookupApi += splitData[j];
				}
				fieldApi = lookupApi;
				lstLookupFilds.push(result[i].fieldApiName);

			}
			columns.push({
				label :fieldLabel,
				fieldName : fieldApi,
				type : 'text'
			  });
			 
		}
			this.lstviewCol = columns;
			this.fetchListViewRecords();
			
        } else if (error) {
            console.log('columns error==> ' + error);
            columns = undefined;
        }
    }
	/* fetch listview Records */
fetchListViewRecords(){
	
	getListviewRecords({listviewId: this.defaultListView , 
			                 objectApiName : this.objectApiName }).then(response=> {
		var result = response;
		
   var updateResult = [];
result.forEach(function(record){
	var tempRec = JSON.parse(JSON.stringify(record));
				for(var fld in record){
					if(typeof record[fld] == 'object'){

			for(var j=0; j<lstLookupFilds.length; j++){
				if(lstLookupFilds[j].includes('.')){
					let splitFields = lstLookupFilds[j].split('.');
					let keyField = splitFields[0];
					if(fld == keyField){
						var lookupApiName= splitFields.length > 2 ? splitFields[0]+splitFields[1] + splitFields[2] : splitFields[0]+splitFields[1];
						var lookupvalue= splitFields.length > 2 ? record[fld][splitFields[1]][splitFields[2]] : record[fld][splitFields[1]];
                  		tempRec[lookupApiName] = lookupvalue;
							}
						}
						
                   }
		}
	}
	updateResult.push(tempRec);
});

this.hasRecords = updateResult.length > 0 ? true:false;
	
this.storeListViewRecords = updateResult;
this.isLoading = false;

		}).catch(error => {
			this.storeListViewRecords = [];
		console.log('listView records error:  '+JSON.stringify(error));
		});
}

   /* listView expend collapse functionility*/
	handleClickExtend(event) {
	
		let getElement = this.template.querySelector('.listViewPickerPanel');
		if (getElement.classList.contains('deActive_ListView')){
			getElement.setAttribute('aria-hidden', false);	
			getElement.classList.remove('deActive_ListView');
			getElement.classList.add('active_ListView');
			this.template.querySelector('.listViewPickerPanel').focus();
		} else {
			
			this.closeListViewHelper();
		}
	}

 
	handelFocusOut(event) {
		let that = this;
		setTimeout(function(){ that.closeListViewHelper(); }, 300);
		
	}

	getListViewValue(event) {
		let listViewValue = event.target.dataset.filter;
		if (listViewValue != this.defaultListView) {
			this.isLoading = true;
		
		this.defaultListView = listViewValue;
		let getListViewRec = this.listViewOptions.find(data => data.value == listViewValue);
    	this.listViewName = getListViewRec.label;
		this.developerName = getListViewRec.developerName;
		let self = this;
		this.listViewOptions.forEach(function(item){
			
			item.show_option_icon = item.developerName == self.developerName ? true : false;
		});
		}
		this.closeListViewHelper();
		
		   
	}
	closeListViewHelper(){
		let getElement = this.template.querySelector('.listViewPickerPanel');
		getElement.setAttribute('aria-hidden', true);
		getElement.classList.remove('active_ListView');
		getElement.classList.add('deActive_ListView');
	}


	
}