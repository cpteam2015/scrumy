Ext.define('Scrumy.view.main.MainController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Project']
	,alias: 'controller.main'
	,init : function () {
		var me=this;
		var comboProject = me.lookupReference('comboProject');
		console.log(comboProject);
		comboProject.on({
			'scope':me
			,'select':me.onProjectSelected
		});
	}

	,onProjectSelected : function (combo,record) {
		var me = this;
		console.log('onProjectSelected')
		me.lookupReference('mainTabPanel').setHidden(false);
	}
});