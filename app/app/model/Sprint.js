Ext.define('Scrumy.model.Sprint',{
	extend: 'Ext.data.Model'
	,fields: ['id','start','tasks']
	,idProperty: 'id'
	,proxy:{
		type: 'rest'
		,url: '/ws/api/v1/project/sp'
		,reader: {
			type: 'json'
		}
	}
});
