Ext.define('backlog.store.US', {
    extend: 'Ext.data.Store',

    alias: 'store.us',

    fields: [
        'id', 'desc', 'cout','prior','deps'
    ],

    data: { items: [
        {'id':1,'desc':'En tant que USER, je souhaite casser tout','cout':15,'prior':'Z','deps':'1,2,3'}
        ,{'id':2,'desc':'En tant que USER, je souhaite casser tout','cout':15,'prior':'C','deps':'1,2,3'}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
