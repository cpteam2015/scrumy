Ext.define('Scrumy.view.main.backlog.BacklogController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Backlog']
	,alias: 'controller.backlog'
	,init : function () {
		var me=this;
		var gridbl = me.lookupReference('gridbl')
			addUSbtn = me.lookupReference('addUSbtn')
			delUSbtn = me.lookupReference('delUSbtn')
		;

		gridbl.on({
			'scope' : me
			,'beforerender' : me.loadBL
			,'edit' : me.onEdit
		});
		addUSbtn.on({
			'scope' : me
			,'click' : me.onAddUS
		});
		delUSbtn.on({
			'scope' : me
			,'click' : me.onDelUS
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
	,onAddUS : function () {
		console.log('add US btn');
		var me = this;
		var grid  = me.lookupReference('gridbl');
		n = new Scrumy.model.Backlog();
		n.set('id',0);
		n.set('description','En tant que <...> je souhaite pourvoir <...>');
		grid.getStore().insert(0,n);
		rowEd = grid.getPlugin('rowediting');
		rowEd.startEdit(0,1);

	}
	,onDelUS : function () {
		console.log('del US btn');
		var me = this;
		var grid  = me.lookupReference('gridbl');
		selected = grid.getSelectionModel().getSelection()[0];
		grid.getStore().remove(selected);
		grid.getStore().sync({
			success : function () {
				grid.getStore().commitChanges();
				console.log('delete selected = OK');
			}
			,failure : function  () {
				grid.getStore().rejectChanges();
				console.log('delete selected = FAILED');
			}
		});
	}
});