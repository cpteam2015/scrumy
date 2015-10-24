Ext.define('scrumy.model.Project',{
	extend: 'Ext.data.Model'
	,fields: ['_id','name','members','description','git_repo','backlog','sprints']
	,idProperty : '_id'
	,proxy: {
		type: 'rest'
		,url: '/api/v1/project'
	}
});