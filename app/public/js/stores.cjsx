ProjectStore = Reflux.createStore
        listenables: [ProjectActions],
        srcUrl: '/ws/api/v1/projects',
        data: {projects:[], current:0},
        init: ->
                @fetchList()
        fetchList: ->
                request = superagent
                request
                        .get @srcUrl
                        .accept 'application/json'
                        .end ((err,res) ->
                                if res.ok
                                        @data.projects = res.body
                                        @trigger @data
                        ).bind @
