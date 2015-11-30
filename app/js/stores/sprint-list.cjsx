Actions = require '../actions/sprint-list'

SprintListStore = Reflux.createStore
    listenables: [Actions]
    list: []
    init: ->
        @fetch()
    getInitialState: ->
        @list
    setList: (l) ->
        @list = l
        @fetch()
    fetch: ->
        @trigger @list

module.exports = SprintListStore
