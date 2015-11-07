Ext.define('Scrumy.store.Cost', {
    extend: 'Ext.data.Store',

    alias: 'store.cost',

    fields: [
        'value'
    ],

    data: [{'value':1},{'value':2},{'value':3},{'value':5},{'value':8},{'value':13},{'value':21},{'value':34},{'value':55},{'value':89}],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
