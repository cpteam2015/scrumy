Actions = require '../actions/project'

ModalActions = require '../actions/modal'
SprintListActions = require '../actions/sprint-list'

ProjectStore = Reflux.createStore
    listenables: [Actions]
    data: { project: {}, backlog: true }
    getInitialState: ->
        @data
    init: ->
        @trigger @data
    selectBacklog: ->
        @data.backlog = true
        @trigger @data
    selectSprints: ->
        @data.backlog = false
        @trigger @data
    setCurrentProject: (p) ->
        @data.project = p
        @trigger @data
        SprintListActions.setList @data.project.sprints
        ModalActions.setCurrentProject @data.project

module.exports = ProjectStore
