Ext.define('Scrumy.view.main.details.DetailsModel',{
	extend: 'Ext.app.ViewModel'
	,requires: ['Scrumy.model.Project']
	,alias: 'viewmodel.details'
	,stores : {
		projects: {
			model: 'Scrumy.model.Project'
			,storeId: 'projects'
		}
	}
});