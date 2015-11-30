Ext.define('Scrumy.view.main.details.DetailsController',{
	extend: 'Ext.app.ViewController'
	,requires: ['Scrumy.model.Project']
	,alias: 'controller.details'
	,init : function () {
		var me=this;
		console.log('controller details');
		var form = me.lookupReference('formInfo');
		var comboProject = me.getViewModel().getParent().getView().getController().lookupReference('comboProject');

		comboProject.on({
			'scope':me
			,'select':me.loadInfo
		});
		// form.on({
		// 	'scope':me,
		// 	'beforeshow': me.loadInfo
		// });
	}
	,loadInfo : function () {
		var me = this;
		var form = me.lookupReference('formInfo');
		var p_id = me.getViewModel().getParent().getView().getController().lookupReference('comboProject').getValue();
		console.log('load',p_id);
		Ext.Ajax.request({
			method:'GET'
			,url : '/ws/api/v1/project/bl?_id='+p_id
			,success : function (r) {
				console.log('success');
				var x = Ext.JSON.decode(r.responseText)
				console.log(x);
				me.lookupReference('name').setValue(x.name);
				me.lookupReference('desc').setValue(x.description);
				me.lookupReference('members').setValue(x['members']);
				me.lookupReference('git').setValue(x['git_repo']);
				
			}
			,failure : function (r) {
				console.log('failed',r);
			}
		});
	}

});