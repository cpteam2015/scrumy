
Ext.define('Scrumy.view.main.details.Details', {
    extend: 'Ext.panel.Panel'
    //,requires : ['Scrumy.view.main.details.DetailsModel']
    ,controller : 'details'
    ,title: 'Info'
    ,alias: 'widget.details'
    ,viewModel : {type: 'details'}
    ,items :[
    	{
    			xtype: 'form'
    			,reference : 'formInfo'
    			,padding: '10 0 0 10' 
				,defaultType : 'textfield'
				,items : [
					{				
						allowBlank: true,			
						fieldLabel: 'Name Project: ',
						reference:'name',
						emptyText:'Name Project',
						disabled: true

					},
					{				
						allowBlank: true,			
						fieldLabel: 'Description Project: ',
						reference:'desc',
						emptyText:'description',
						disabled: true

					},
					{				
						allowBlank: true,			
						fieldLabel: 'Members: ',
						reference:'members',
						emptyText:'#id_Sprint',
						disabled: true

					},
					{				
						allowBlank: true,			
						fieldLabel: 'URL GIT: ',
						reference:'git',
						emptyText:'Git repository',
						disabled: true

					}
				]
	 	}

	]
});
