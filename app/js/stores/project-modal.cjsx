Actions = require '../actions/project-modal'

ModalStore = Reflux.createStore
        listenables: [Actions]
        type: ''
        newProject: {
                name: '',
                description: '',
                git_repo: '',
                members: [],
                backlog: [],
                sprints: []
        }
        currentProject: {}
        showedProject: {}
        getInitialState: ->
                @newProject
        setType: (e,type) ->
                if type == 'put'
                  @showedProject = @currentProject
                else
                  @showedProject = @newProject
                @type = type
                @trigger @showedProject
        setCurrentProject: (p) ->
                @currentProject = p if p?
        submit: (e) ->
                switch @type
                  when 'post' then @send e
                  when 'put' then @update e
                  else console.log 'wrong request type'
        update: (e) ->
                request = superagent
                request
                        .put '/ws/api/v1/project/' + @currentProject._id
                        .type 'json'
                        .send @currentProject
                        .end ((err,res) ->
                                console.log 'data updated' if res.ok
                        ).bind @
                $("#addModal").modal 'hide'
        send: (e) ->
                request = superagent
                request
                        .post '/ws/api/v1/project'
                        .type 'json'
                        .send @newProject
                        .end ((err,res) ->
                                console.log 'data sent' if res.ok
                        ).bind @
                $("#addModal").modal 'hide'
        handleName: (value) ->
                @showedProject.name = value
                @trigger @showedProject
        handleDescription: (value) ->
                @showedProject.description = value
                @trigger @showedProject
        handleRepo: (value) ->
                @showedProject.git_repo = value
                @trigger @showedProject
        handleMember: (index, value) ->
                @showedProject.members[index] = value
                @trigger @showedProject
        addMember: ->
                @showedProject.members.push ''
                @trigger @showedProject
        deleteMember: (index) ->
                delete @showedProject.members[index]
                @trigger @showedProject

module.exports = ModalStore