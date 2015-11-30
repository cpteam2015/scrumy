Actions = require '../actions/project-list'
ProjectActions = require '../actions/project'

ProjectList = Reflux.createStore
        getInitialState: ->
                @data
        changeCurrent: (id) ->
                @data.current = id
                @trigger @data
                ProjectActions.setCurrentProject @data.projects[@data.current]
        data: {
                projects: [],
                current: 0
        },
        listenables: [Actions],
        srcUrl: '/ws/api/v1/projects',
        init: ->
                @fetchList()
        delete: ->
            id = @data.projects[@data.current]._id
            request = superagent
            request
                    .delete @srcUrl + '/' + id
                    .end ((err,res) ->
                            if res.ok
                                delete @data.projects[@data.current]
                                @changeCurrent 0
                    ).bind @

        fetchList: ->
                request = superagent
                request
                        .get @srcUrl
                        .accept 'application/json'
                        .end ((err,res) ->
                                if res.ok
                                        @data.projects = res.body
                                        @changeCurrent 0
                        ).bind @

module.exports = ProjectList
