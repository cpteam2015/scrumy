Ext.define('Scrumy.model.Backlog',{
	extend: 'Ext.data.Model'
	,fields: ['id','description','cost','priority','required']
	,idProperty: 'id'
	,proxy:{
		type: 'rest'
		,url: '/ws/api/v1/project/bl'
		,reader: {
			type: 'json'
			,rootProperty: 'backlog'
		}
	}
});