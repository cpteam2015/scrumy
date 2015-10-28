Ext.define('Scrumy.model.Backlog',{
	extend: 'Ext.data.Model'
	,fields: ['_id','us']
	,idProperty: '_id'
	,proxy:{
		type: 'rest'
		,url: '/ws/api/v1/mockups/backlog'
		,reader: {
			type: 'json'
		}
	}
});