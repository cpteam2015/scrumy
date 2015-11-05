Ext.define('Scrumy.view.main.MainModel',{
	extend: 'Ext.app.ViewModel'
	,requires: ['Scrumy.model.Project']
	,alias: 'viewmodel.main'
	,stores : {
		projects: {
			model: 'Scrumy.model.Project'
			,storeId: 'projects'
		}
	}
});