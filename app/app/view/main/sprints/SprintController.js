Ext.define('Scrumy.view.main.sprints.SprintController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Sprint']
	,alias: 'controller.sprints'
	,init : function () {
		var me=this;
		var gridSprint = me.lookupReference('gridSprint');

		//~ gridSprint.on({
			//~ 'scope' : me
			//~ ,'beforerender' : me.loadSprint
			//~ ,'edit' : me.onEdit
		//~ });
	}

	//~ ,loadSprint : function () {
		//~ var me  = this;
		//~ var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		//~ me.getViewModel().getStore('sprints').load({params:{'id': p_id}});
	//~ }
	//~ ,onEdit : function (editor,context) {
		//~ var me = this;
		//~ console.log(editor,context);
		//~ context.store.sync({
			//~ success: function () {
				//~ console.log('success');
			//~ }
			//~ ,failure : function () {
				//~ console.log('failure');
			//~ }
		//~ })
	//~ }

});
