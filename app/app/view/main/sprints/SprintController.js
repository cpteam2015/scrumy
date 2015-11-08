Ext.define('Scrumy.view.main.sprints.SprintController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Sprint']
	,alias: 'controller.sprints'
	,init : function () {
		var me=this;
		var gridSprint = me.lookupReference('gridSprint');
		addTask = me.lookupReference('addTask');
		delTask = me.lookupReference('delTask');
		
		gridSprint.on({
			'scope' : me
			,'beforerender' : me.loadTask
			//~ ,'edit' : me.onEdit
		});
		addTask.on({
			'scope' : me
			,'click' : me.onAddTask
		});
		delTask.on({
			'scope' : me
			,'click' : me.onDelTask
		});	
	}
	,loadTask : function(){
		var me  = this;
		var us_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		me.getViewModel().getStore('backlog').load({params:{'_id':us_id}});
	}
	
	,onAddTask : function () {
		var me = this;
		var grid  = me.lookupReference('gridSprint');
		n = new Scrumy.model.Sprint();
		n.set('id',0);
		grid.getStore().insert(0,n);
		rowEd = grid.getPlugin('rowediting');
		rowEd.startEdit(0,1);

	}
	
	,onDelTask : function () {
		var me = this;
		var grid  = me.lookupReference('gridSprint');
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
