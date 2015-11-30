Ext.define('Scrumy.store.Priority', {
    extend: 'Ext.data.Store',

    alias: 'store.priority',

    fields: [
        'value'
    ],

    data: [{'value':'A'},{'value':'B'},{'value':'C'},{'value':'D'},{'value':'E'},{'value':'F'}],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
