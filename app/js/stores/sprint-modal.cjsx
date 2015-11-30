Actions = require '../actions/sprint-modal'

SprintStore = Reflux.createStore
    listenables: [Actions]
    newSprint: {
        id:0,
        start: "",
        tasks: [],
        kanban: {id: 0, url: ""}
    }
    request: ''
    currentSprint: {}
    showedSprint: {}
    getInitialState: ->
        @newSprint
    add: (e) ->
        @request = 'post'
        @showedSprint = @newSprint
        @trigger @showedSprint
    edit: (e) ->
        @request = 'put'
        @showedSprint = @currentSprint
        @trigger @showedSprint
    setCurrentSprint: (s) ->
        @currentSprint = s
    submit: (e) ->
        switch @request
            when 'post' then @send e
            when 'put' then @update e
            else console.log 'wrong request type'
    update: (e) ->
        request = superagent
        request
            .put '/ws/api/v1/sprint/' + @currentSprint._id
            .type 'json'
            .send @currentSprint
            .end ((err,res) ->
                console.log 'data updated' if res.ok
            ).bind @
        $("#addModal").modal 'hide'
    send: (e) ->
        request = superagent
        request
            .post '/ws/api/v1/project'
            .type 'json'
            .send @newSprint
            .end ((err,res) ->
                console.log 'data sent' if res.ok
            ).bind @
        $("#addModal").modal 'hide'
    handleDate: (value) ->
        @showedSprint.start = value
        @trigger @showedSprint
    handleName: (value) ->
        @showedSprint.id = value
        @trigger @showedSprint
    handleKanban: (value) ->
        @showedSprint.kanban = value
        @trigger @showedSprint
    trelloLogIn: (onSuccess) ->
        onError = () -> alert 'connection to Trello failed'
        Trello.authorize
            type: "popup",
            name: "Scrumy Application",
            scope: {
              read: true,
              write: true },
            expiration: "never",
            success: onSuccess,
            error: onError
    createKanban: ->
        kanban = @showedSprint.kanban
        onSuccess = (() ->
            setBoardId = ((data) -> @board = data.id).bind @
            setListId = ((data) ->
                            kanban.id = data.id
                            kanban.url = data.url
            ).bind @
            Trello.post '/boards', { name: @showedSprint.id + " - " + @showedSprint.start }, setBoardId
            Trello.post '/lists', { name: "Todo", idBoard: @board }, setListId
            Trello.post '/lists', { name: "Ongoing", idBoard: @board }
            Trello.post '/lists', { name: "Done", idBoard: @board }
        ).bind @
        @trelloLogIn onSuccess
    createCard: (name) ->
        onSuccess = (() ->
            Trello.post '/cards' , { name: name, idList: @showedSprint.kanban.id, due: null, pos: "top" }
        ).bind @
        @trelloLogIn onSuccess

module.exports = SprintStore