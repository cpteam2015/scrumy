Actions = require '../actions/sprint-list'

SprintListStore = Reflux.createStore
    listenables: [Actions]
    list: []
    init: ->
        @fetch()
    getInitialState: ->
        console.log
        @list
    setList: (l) ->
        console.log l
        @list = l
        @fetch()
    fetch: ->
        @trigger @list

module.exports = SprintListStore
