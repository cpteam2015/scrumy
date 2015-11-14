Actions = require '../actions/project'
Store = require '../stores/project'

SprintList = require './sprint-list'

TabNav = React.createClass
    render: ->
        <nav role="navigation">
            <ul className="nav nav-tabs">
                <li
                 onClick={Actions.selectBacklog}
                 role="presentation"
                 className={'active' if @props.backlog}>
                        <a>Backlog</a>
                </li>
                <li
                 onClick={Actions.selectSprints}
                 role="presentation"
                 className={'active' if not @props.backlog}>
                        <a>Sprints</a>
                </li>
            </ul>
        </nav>

TabContent = React.createClass
    render: ->
        <div>
            {<SprintList/> if not @props.backlog}
        </div>

Project = React.createClass
    mixins: [Reflux.connect(Store, 'data')]
    render: ->
        backlog = @state.data.backlog
        <div>
            <TabNav backlog={backlog}/>
            <TabContent backlog={backlog}/>
        </div>

module.exports = Project
