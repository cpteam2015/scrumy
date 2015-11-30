Ext.define('Scrumy.model.Task',{
	extend: 'Ext.data.Model'
	,fields: ['id','description','us','time','required']
	,idProperty: 'id'
	,proxy:{
		type: 'rest'
		,url: '/ws/api/v1/project/sp/task'
		,reader: {
			type: 'json'
		}
	}
});
