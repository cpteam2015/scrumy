
Ext.define('Scrumy.view.main.Main', {
    extend: 'Ext.panel.Panel'
    ,requires : ['Scrumy.view.main.MainModel','Scrumy.view.main.MainController']
    ,controller : 'main'
    ,xtype: 'app-main'
    ,title: 'Scrumy'
    ,viewModel : {type: 'main'}
    ,padding: '0 0 0 10' 
    ,items: [
    	{
    		xtype: 'panel'
    		,region: 'center'
    		,tbar : [
    			{
		    		xtype : 'combobox'
                    ,reference : 'comboProject'
		    		,editable : false
		    		,fieldLabel: 'Choose a project'
		    		,name:'project'
		    		,displayField: 'name'
		    		,valueField: '_id'
		    		,bind:{
		    			store: '{projects}'
		    		}
		    	}
		    	,{
		    		xtype : 'button'
                    // ,autoEl: {tag: 'a', href: 'http://locahost/ws/', html: 'Add Project'}
		    		,text : 'Create a fresh one'
                    ,listeners: {
                            click : function (b,e) {
                            console.log('Open',b,e);
                            window.open("ws/");
                        }
                    }
		    	}
    		]
    	}
        ,{
            xtype: 'tabpanel'
            ,reference: 'mainTabPanel'
            ,hidden: true
            ,items:[
                {xtype: 'details'}
                ,{xtype: 'backlog'}
                ,{xtype: 'sprints'}
            ]
        }
    ] 
});
