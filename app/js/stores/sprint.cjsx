SprintStore = Reflux.createStore
    listenables: [SprintActions]
    newSprint: {
        id:0,
        start: "",
        tasks: []
    }
    type: ''
    currentSprint: {}
    showedSprint: {}
    getInitialState: ->
        @newSprint
    setType: (e,type) ->
        if type == 'put'
            @showedSprint = @currentSprint
        else
            @showedSprint = @newSprint
            @type = type
        @trigger @showedSprint
    setCurrentSprint: (s) ->
        @currentSprint = s
    submit: (e) ->
        switch @type
            when 'post' then @send e
            when 'put' then @update e
            else console.log 'wrong request type'
    update: (e) ->
        request = superagent
        request
            .put '/api/v1/sprint/' + @currentSprint._id
            .type 'json'
            .send @currentSprint
            .end ((err,res) ->
                console.log 'data updated' if res.ok
            ).bind @
        $("#addModal").modal 'hide'
    send: (e) ->
        request = superagent
        request
            .post '/api/v1/project'
            .type 'json'
            .send @newSprint
            .end ((err,res) ->
                console.log 'data sent' if res.ok
            ).bind @
        $("#addModal").modal 'hide'
    handleDate: (value) ->
        @showedSprint.date = value
        @trigger @showedSprint
    handleName: (value) ->
        @showedSprint.id = value
        @trigger @showedSprint
    handleMember: (index, value) ->
        @showedSprint.members[index] = value
        @trigger @showedSprint
    addMember: ->
        @showedSprint.members.push ''
        @trigger @Sprint
    deleteMember: (index) ->
        delete @showedSprint.members[index]
        @trigger @Sprint
