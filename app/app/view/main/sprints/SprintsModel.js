Ext.define('Scrumy.view.main.sprints.SprintsModel',{
	extend: 'Ext.app.ViewModel'
	,requires: ['Scrumy.model.Sprint']
	,alias: 'viewmodel.sprints'
	,stores : {
		sprints: {
			model: 'Scrumy.model.Sprint'
			,storeId: 'sprints'
			,autoLoad: false
		}
		,tasks : {
			model: 'Scrumy.model.Task'
			,storeId: 'tasks'
			,autoLoad: false	
		}
	}
});
