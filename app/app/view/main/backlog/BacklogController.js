Ext.define('Scrumy.view.main.backlog.BacklogController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Backlog']
	,alias: 'controller.backlog'
	,init : function () {
		var me=this;
		var gridbl = me.lookupReference('gridbl');

		gridbl.on({
			'scope' : me
			,'beforerender' : me.loadBL
			,'edit' : me.onEdit
		});
	}

	,loadBL : function () {
		var me  = this;
		var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		me.getViewModel().getStore('backlog').load({params:{'_id':p_id}});
	}
	,onEdit : function (editor,context) {
		var me = this;
		console.log(editor,context);
		context.store.sync({
			success: function () {
				console.log('success');
			}
			,failure : function () {
				console.log('failure');
			}
		})
	}

});