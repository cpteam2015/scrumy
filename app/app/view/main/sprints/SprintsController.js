Ext.define('Scrumy.view.main.sprints.SprintsController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Sprint']
	,alias: 'controller.sprints'
	,init : function () {
		var me=this;
		var gridSprint = me.lookupReference('gridSprint'),
		addTask = me.lookupReference('addTask'),
		delTask = me.lookupReference('delTask'),
		comboSp = me.lookupReference('comboSp');
		

		gridSprint.on({
			'scope' : me
			,'edit' : me.onEdit
		});
		comboSp.on({
			'scope':me
			,'beforerender' : me.loadSprints
			,'select': me.onSpSelected
		});
		console.log(gridSprint);
		
		addTask.on({
			'scope' : me
			,'click' : me.onAddTask
		});
		delTask.on({
			'scope' : me
			,'click' : me.onDelTask
		});	
	}
	,onEdit : function (editor,context) {
		var me = this;
		console.log(editor,context);
		var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		var sp_id = me.lookupReference('comboSp').getValue();
		context.store.getProxy().setExtraParams({
			'p_id'   : p_id
			,'sp_id' : sp_id
		});
		context.store.sync({
			success: function () {
				me.lookupReference('gridSprint').getStore().commitChanges();
				console.log('success');
			}
			,failure : function () {
				console.log('failure');
			}
		});
	}
	,onSpSelected : function (combo,record) {
		var me = this;
		console.log('onSpSelected',record);
		me.loadTask(record.id);
	}
	,loadSprints : function () {
		var me  = this;
		var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		console.log(p_id);
		me.getViewModel().getStore('sprints').load({params:{'_id':p_id}});
	}
	,loadTask : function(id){
		var me  = this;
		console.log("Loadtask");
		var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		me.getViewModel().getStore('tasks').load({params:{'_id':p_id,'id':id}});
	}
	
	,onAddTask : function () {
		var me = this;
		var grid  = me.lookupReference('gridSprint');
		n = new Scrumy.model.Sprint();
		n.set('id',0);
		n.set('description','add task');
		n.set('us','add task');
		n.set('time','add task');
		n.set('required','add task');
		grid.getStore().insert(0,n);
		rowEd = grid.getPlugin('rowediting2');
		rowEd.startEdit(0,1);

	}
	
	,onDelTask : function () {
		var me = this;
		var grid  = me.lookupReference('gridSprint');
		selected = grid.getSelectionModel().getSelection()[0];
		var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		var sp_id = me.lookupReference('comboSp').getValue();
		grid.getStore().getProxy().setExtraParams({
			'p_id'   : p_id
			,'sp_id' : sp_id
		});
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
