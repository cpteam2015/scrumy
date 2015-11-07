Ext.define('Scrumy.view.main.sprints.SprintModel',{
	extend: 'Ext.app.ViewModel'
	,requires: ['Scrumy.model.Sprint']
	,alias: 'viewmodel.sprints'
	,requires : [
		'Scrumy.model.Sprint'
	]
	,stores : {
		backlog: {
			model: 'Scrumy.model.Sprint'
			,storeId: 'sprints'
			,autoLoad: false
		}
	}
});
