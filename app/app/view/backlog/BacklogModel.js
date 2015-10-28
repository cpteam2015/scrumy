Ext.define('Scrumy.view.backlog.BacklogModel',{
	extend: 'Ext.app.ViewModel'
	,requires: ['Scrumy.model.Backlog']
	,alias: 'viewmodel.backlog'
	,requires : [
		'Scrumy.model.Backlog'
	]
	,stores : {
		backlog: {
			model: 'Scrumy.model.Backlog'
			,storeId: 'backlog'
			,autoLoad: false
		}
	}
});